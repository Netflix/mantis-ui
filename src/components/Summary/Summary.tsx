import { Checkbox, Text, Title } from '@mantine/core';
import { ChangeEvent, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import DataGrid from '@/components/DataGrid/DataGrid';
import LinkRenderer from '@/components/DataGrid/renderers/LinkRenderer/LinkRenderer';
import { useJobSummary } from '@/hooks/useJobSummary';
import { AppRoutePaths } from '@/router/routes';
import { REGION_ENVS } from '@/services/BaseService';
import formatFileSize from '@/utils/file';

function Summary() {
  const columnDefs = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Job Cluster Name',
        cellRenderer: 'LinkRenderer',
        cellRendererParams: {
          getTo({ name }: { name: string }) {
            return `/${AppRoutePaths.CLUSTERS}/${name}`;
          },
        },
        flex: 2,
      },
      { field: 'jobCount', filter: false },
      // { field: 'totalCpus', headerName: 'CPUs', sort: 'desc', filter: false },
      {
        field: 'totalMemory',
        valueFormatter: ({ value }: { value: number }) => {
          return formatFileSize(value);
        },
        headerName: 'Memory',
        filter: false,
      },
      { field: 'totalWorkers', headerName: 'Workers', filter: false },
    ],
    [],
  );

  const components = useMemo(
    () => ({
      LinkRenderer,
    }),
    [],
  );

  const options = REGION_ENVS.map((item) => ({
    label: `${item.env.toUpperCase()} (${item.region})`,
    value: `${item.env}:${item.region}`,
  }));
  const [checkedList, setCheckedList] = useState(options.map((option) => option.value));
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);
  const onChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    const checked = e.target.checked;

    if (checked) {
      setCheckedList([...new Set([...checkedList, value])]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
    setIndeterminate(!!checkedList.length && checkedList.length < options.length);
    setCheckAll(checkedList.length === options.length);
  };
  const onCheckAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedList(e.target.checked ? options.map((option) => option.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const checkBoxGroup = (
    <div className="flex justify-center gap-4">
      <Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
        label="Select all"
      />
      {options.map((option) => {
        return (
          <Checkbox
            key={option.value}
            value={option.value}
            checked={checkedList.includes(option.value)}
            label={option.label}
            onChange={(e) => onChange(e, option.value)}
          />
        );
      })}
    </div>
  );

  const { data = [] } = useJobSummary(checkedList);
  const activeJobs = useMemo(() => data.reduce((acc, item) => acc + item.jobCount, 0), [data]);
  const workers = useMemo(() => data.reduce((acc, item) => acc + item.totalWorkers, 0), [data]);
  const cpus = useMemo(() => data.reduce((acc, item) => acc + item.totalCpus, 0), [data]);
  const memory = useMemo(
    () => formatFileSize(data.reduce((acc, item) => acc + item.totalMemory, 0)),
    [data],
  );
  const titleSize = 2;
  const statisticWeight = 400;

  return (
    <>
      <Helmet>
        <title>Mantis - Summary</title>
      </Helmet>
      <div className="flex flex-col h-full gap-4">
        <div className="flex gap-2 justify-evenly">
          <div className="flex flex-col items-center">
            <Text color="gray" weight={300}>
              Job Clusters
            </Text>
            <Title order={titleSize} style={{ fontWeight: statisticWeight }}>
              {data.length}
            </Title>
          </div>
          <div className="flex flex-col items-center">
            <Text color="gray" weight={300}>
              Workers
            </Text>
            <Title order={titleSize} style={{ fontWeight: statisticWeight }}>
              {workers}
            </Title>
          </div>
          <div className="flex flex-col items-center">
            <Text color="gray" weight={300}>
              Active Jobs
            </Text>
            <Title order={titleSize} style={{ fontWeight: statisticWeight }}>
              {activeJobs}
            </Title>
          </div>
          <div className="flex flex-col items-center">
            <Text color="gray" weight={300}>
              CPUs
            </Text>
            <Title order={titleSize} style={{ fontWeight: statisticWeight }}>
              {cpus}
            </Title>
          </div>
          <div className="flex flex-col items-center">
            <Text color="gray" weight={300}>
              RAM
            </Text>
            <Title order={titleSize} style={{ fontWeight: statisticWeight }}>
              {memory}
            </Title>
          </div>
        </div>
        {checkBoxGroup}
        <DataGrid
          columnDefs={columnDefs}
          rowData={data}
          recordTypes="Jobs Clusters"
          components={components}
        />
      </div>
    </>
  );
}

export default Summary;
