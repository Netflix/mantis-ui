import DataGrid from '@/components/DataGrid/DataGrid';
import formatFileSize from '@/utils/file';
import { Checkbox, Statistic } from 'antd';
import { REGION_ENVS } from '@/services/BaseService';
import { Helmet } from 'react-helmet-async';
import LinkRenderer from '@/components/DataGrid/renderers/LinkRenderer/LinkRenderer';
import { AppRoutePaths } from '@/router/routes';
import { useMemo, useState } from 'react';
import { useJobSummary } from '@/hooks/useJobSummary';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

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
      { field: 'totalCpus', headerName: 'CPUs', sort: 'desc', filter: false },
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
  const frameworkComponents = useMemo(
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
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list as string[]);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options.map((option) => option.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const checkBoxGroup = (
    <div className="flex justify-center gap-4">
      <Checkbox
        className="mr-2"
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
      >
        Select all
      </Checkbox>
      <Checkbox.Group options={options} value={checkedList} onChange={onChange} />
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

  return (
    <>
      <Helmet>
        <title>Mantis - Summary</title>
      </Helmet>
      <div className="m-4 flex flex-col h-full gap-4">
        <div className="flex gap-2 justify-evenly">
          <Statistic title="Job Clusters" value={data.length} />
          <Statistic title="Workers" value={workers} />
          <Statistic title="Active Jobs" value={activeJobs} />
          <Statistic title="CPUs" value={cpus} />
          <Statistic title="RAM" value={memory} />
        </div>
        {checkBoxGroup}
        <DataGrid
          columnDefs={columnDefs}
          rowData={data}
          recordTypes="Jobs Clusters"
          frameworkComponents={frameworkComponents}
        />
      </div>
    </>
  );
}

export default Summary;
