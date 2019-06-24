import { killJobs } from '@/services/JobService';
import { Button, Switch } from 'antd';
import { Helmet } from 'react-helmet-async';
import DataGrid from '@/components/DataGrid/DataGrid';
import { pluralize } from '@/utils/string';
import DateTimeRenderer from '@/components/DataGrid/renderers/DateTimeRenderer/DateTimeRenderer';
import TagRenderer from '@/components/DataGrid/renderers/TagRenderer/TagRenderer';
import LinkRenderer from '@/components/DataGrid/renderers/LinkRenderer/LinkRenderer';
import JobLabelRenderer from '@/components/DataGrid/renderers/JobLabelRenderer/JobLabelRenderer';
import { AppRoutePaths } from '@/router/routes';
import { getJobClusterId, getJobTagDefinitions } from '@/utils/job';
import { ClusterOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useJobs } from '@/hooks/useJobs';
import { CompactJob } from '@/types/job';
import { GridApi } from '@ag-grid-community/core';
import { useEntityFilter } from '@/hooks/useEntityFilter';

function Jobs() {
  const columnDefs = useMemo(
    () => [
      {
        field: 'jobId',
        headerName: 'Job Name',
        cellRenderer: 'LinkRenderer',
        cellRendererParams: {
          getTo({ jobId }: { jobId: string }) {
            return `${jobId}`;
          },
        },
        flex: 2,
        checkboxSelection: true,
      },
      {
        headerName: 'Cluster',
        valueGetter: () => <ClusterOutlined />,
        width: 90,
        flex: 0,
        filter: false,
        cellRenderer: 'LinkRenderer',
        cellRendererParams: {
          getTo({ jobId }: { jobId: string }) {
            return `/${AppRoutePaths.CLUSTERS}/${getJobClusterId(jobId)}`;
          },
        },
      },
      {
        field: 'env',
        cellRenderer: 'TagRenderer',
        cellRendererParams: {
          getTagColor(value: string) {
            switch (value) {
              case 'prod':
                return getComputedStyle(document.documentElement).getPropertyValue('--prod-color');
              case 'test':
                return getComputedStyle(document.documentElement).getPropertyValue('--test-color');
              default:
                return 'default';
            }
          },
        },
      },
      { field: 'region' },
      {
        valueGetter: ({ data }: { data: CompactJob }) => {
          return getJobTagDefinitions(data.labels);
        },
        headerName: 'Tags',
        cellRenderer: 'JobLabelRenderer',
        cellRendererParams: {
          getTagColor(type: string) {
            switch (type) {
              case 'danger':
                return 'error';
              default:
                return type;
            }
          },
        },
        filter: false,
      },
      {
        valueGetter: ({ data }: { data: CompactJob }) =>
          `${data.numStages} ${pluralize(data.numStages, 'stage')} / ${data.numWorkers} ${pluralize(
            data.numWorkers,
            'worker',
          )}`,
        headerName: '# Stages / Workers',
        filter: false,
        flex: 0,
        width: 185,
      },
      { field: 'totCPUs', headerName: 'CPUs' },
      { field: 'totMemory', headerName: 'RAM' },
      { field: 'submittedAt', cellRenderer: 'DateTimeRenderer', filter: false },
      { field: 'user', headerName: 'Owner' },
      {
        field: 'state',
        cellRenderer: 'TagRenderer',
        cellRendererParams: {
          getTagColor(value: string) {
            switch (value) {
              case 'Launched':
                return 'success';
              case 'Accepted':
                return 'processing';
              default:
                return 'default';
            }
          },
        },
      },
    ],
    [],
  );
  const frameworkComponents = useMemo(
    () => ({
      DateTimeRenderer,
      TagRenderer,
      LinkRenderer,
      JobLabelRenderer,
    }),
    [],
  );
  const ALL_JOBS = 'allJobs';
  const MY_JOBS = 'myJobs';
  const { onToggleHandler, filter } = useEntityFilter(ALL_JOBS, MY_JOBS);
  const shouldShowAllJobs = filter === ALL_JOBS;
  const { user } = useAuth();
  const { data = [] } = useJobs();
  const [selections, setSelections] = useState<CompactJob[]>([]);
  const onSelectionChanged = useCallback(
    ({ api }: { api: GridApi }) => {
      const selections = api.getSelectedRows();
      setSelections(selections);
    },
    [setSelections],
  );

  const jobs = shouldShowAllJobs
    ? data
    : (data as CompactJob[]).filter(
        (job: CompactJob) => job.user === user?.email?.replace(/@netflix.com/g, ''),
      );

  return (
    <>
      <Helmet>
        <title>Mantis - Jobs</title>
      </Helmet>
      <div className="m-4 flex flex-col h-full">
        <div className="flex flex-row items-center">
          <Switch
            checkedChildren="All Jobs"
            unCheckedChildren="My Jobs"
            onChange={onToggleHandler}
            checked={shouldShowAllJobs}
          />
          <Button
            type="primary"
            danger
            className="my-2 ml-auto"
            disabled={!selections.length}
            onClick={() => killJobs(selections, user?.email as string)}
          >
            Kill {selections.length} {pluralize(selections.length, 'Job')}
          </Button>
        </div>
        <DataGrid
          columnDefs={columnDefs}
          rowData={jobs}
          recordTypes="Jobs"
          rowSelection={'multiple'}
          rowMultiSelectWithClick={true}
          frameworkComponents={frameworkComponents}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </>
  );
}

export default Jobs;
