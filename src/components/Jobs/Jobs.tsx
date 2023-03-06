import { GridApi } from '@ag-grid-community/core';
import { Button, Switch } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaServer } from 'react-icons/fa';

import DataGrid from '@/components/DataGrid/DataGrid';
import DateTimeRenderer from '@/components/DataGrid/renderers/DateTimeRenderer/DateTimeRenderer';
import JobLabelRenderer from '@/components/DataGrid/renderers/JobLabelRenderer/JobLabelRenderer';
import LinkRenderer from '@/components/DataGrid/renderers/LinkRenderer/LinkRenderer';
import TagRenderer from '@/components/DataGrid/renderers/TagRenderer/TagRenderer';
import { useAuth } from '@/hooks/useAuth';
import { useEntityFilter } from '@/hooks/useEntityFilter';
import { useJobs } from '@/hooks/useJobs';
import { AppRoutePaths } from '@/router/routes';
import { killJobs } from '@/services/JobService';
import { CompactJob } from '@/types/job';
import { getJobClusterId, getJobTagDefinitions } from '@/utils/job';
import { pluralize } from '@/utils/string';

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
        valueGetter: () => <FaServer className="my-3" />,
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
                return 'red';
              case 'test':
                return 'gray';
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
                return 'red';
              case 'warning':
                return 'yellow';
              default:
                return 'blue';
            }
          },
          filter: false,
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
                return 'lime';
              case 'Accepted':
                return 'gray';
              default:
                return 'blue';
            }
          },
        },
      },
    ],
    [],
  );
  const components = useMemo(
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
  const shouldShowAllJobs = filter !== MY_JOBS;
  const { user } = useAuth();
  const { data = [], refetch } = useJobs();
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
        (job: CompactJob) => job.user === user?.email?.replace(/@[A-za-z0-9]+.com/g, ''),
      );

  return (
    <>
      <Helmet>
        <title>Mantis - Jobs</title>
      </Helmet>
      <div className="flex flex-col h-full">
        <div className="flex flex-row items-center">
          <Switch
            label={shouldShowAllJobs ? 'All Jobs' : 'My Jobs'}
            onChange={onToggleHandler}
            checked={shouldShowAllJobs}
          />
          <Button
            color="red"
            className="my-2 ml-auto"
            disabled={!selections.length}
            onClick={() => killJobs(selections, user?.email as string, refetch, setSelections)}
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
          components={components}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </>
  );
}

export default Jobs;
