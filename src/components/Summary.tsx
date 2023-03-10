import { Checkbox, Text, Title } from '@mantine/core';
import { ChangeEvent, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import AppLink from '@/components/AppLink';
import DataGrid from '@/components/DataGrid';
import { AppRoutePaths } from '@/components/Router/routes/constants';
import { useJobSummary } from '@/hooks/useJobSummary';
import { REGION_ENVS } from '@/services/BaseService';
import formatFileSize from '@/utils/file';

function Summary() {
  const filterValue = [{ name: 'name', operator: 'contains', type: 'string', value: null }];
  const columns = [
    {
      name: 'name',
      header: 'Job Cluster Name',
      render: ({ value }: { value: string }) => (
        <AppLink item={value} to={`/${AppRoutePaths.CLUSTERS}/${value}`} />
      ),
    },
    { name: 'jobCount', header: 'Job Count' },
    {
      name: 'totalCpus',
      header: 'CPUs',
    },
    {
      name: 'totalMemory',
      render: ({ value }: { value: number }) => formatFileSize(value),
      header: 'Memory',
    },
    { name: 'totalWorkers', header: 'Workers' },
  ];

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

  const { data = [], isLoading } = useJobSummary(checkedList);
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
          columns={columns}
          dataSource={data}
          defaultFilterValue={filterValue}
          loading={isLoading}
          defaultSortInfo={{ name: 'totalCpus', dir: -1 }}
          recordTypes="Jobs Clusters"
        />
      </div>
    </>
  );
}

export default Summary;
