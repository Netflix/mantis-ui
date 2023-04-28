import type { TypeRowSelection } from '@inovua/reactdatagrid-community/types';
import { Button, Switch } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MdOutlineRepartition } from 'react-icons/md';

import AppLink from '@/components/AppLink';
import DataGrid from '@/components/DataGrid';
import DateTime from '@/components/DateTime';
import EnvBadge from '@/components/EnvBadge';
import JobLabelBadge from '@/components/Jobs/JobLabelBadge';
import JobStateBadge from '@/components/Jobs/JobStateBadge';
import { AppRoutePaths } from '@/components/Router/routes/constants';
import { useAuth } from '@/hooks/useAuth';
import { useEntityFilter } from '@/hooks/useEntityFilter';
import { useJobs, useKillJobMutation } from '@/hooks/useJobs';
import type { CompactJob, Job } from '@/types/job';
import type { Label } from '@/types/machine';
import { getJobClusterId, getJobTagDefinitions } from '@/utils/job';
import { pluralize } from '@/utils/string';

function Jobs() {
  const filterValue = [
    { name: 'jobId', operator: 'contains', type: 'string', value: null },
    { name: 'user', operator: 'contains', type: 'string', value: null },
    { name: 'env', operator: 'contains', type: 'string', value: null },
    { name: 'region', operator: 'contains', type: 'string', value: null },
    { name: 'state', operator: 'contains', type: 'string', value: null },
  ];
  const columns = [
    {
      name: 'jobId',
      header: 'Job Name',
      render: ({ value, data }: { data: CompactJob | Job; value: string }) => (
        <AppLink item={value} to={`${data.region}/${data.env}/${value}`} />
      ),
      defaultFlex: 2,
    },
    {
      name: 'cluster',
      header: 'Cluster',
      defaultWidth: 100,
      defaultFlex: 0,
      render: ({ value }: { value: string }) => (
        <AppLink
          className="flex h-full"
          item={<MdOutlineRepartition />}
          to={`/${AppRoutePaths.CLUSTERS}/${getJobClusterId(value)}`}
        />
      ),
    },
    {
      name: 'env',
      header: 'Env',
      render: ({ value }: { value: string }) => <EnvBadge env={value} />,
    },
    { name: 'region', header: 'Region' },
    {
      name: 'labels',
      header: 'Tags',
      render: ({ value }: { value: Label[] }) => (
        <JobLabelBadge labels={getJobTagDefinitions(value)} />
      ),
    },
    {
      name: 'numStagesAndWorkers',
      header: '# Stages / Workers',
      render: ({ data }: { data: CompactJob }) =>
        `${data.numStages} ${pluralize(data.numStages, 'stage')} / ${data.numWorkers} ${pluralize(
          data.numWorkers,
          'worker',
        )}`,
    },
    { name: 'totCPUs', header: 'CPUs' },
    { name: 'totMemory', header: 'RAM' },
    {
      name: 'submittedAt',
      header: 'Submitted At',
      render: ({ value }: { value: number }) => <DateTime date={value} />,
    },
    { name: 'user', header: 'Owner' },
    {
      name: 'state',
      header: 'State',
      render: ({ value }: { value: string }) => <JobStateBadge state={value} />,
    },
  ];
  const ALL_JOBS = 'allJobs';
  const MY_JOBS = 'myJobs';
  const { onToggleHandler, filter } = useEntityFilter(ALL_JOBS, MY_JOBS);
  const shouldShowAllJobs = filter !== MY_JOBS;
  const { user } = useAuth();

  const { data = [] } = useJobs();
  const { mutate } = useKillJobMutation();
  const [selections, setSelections] = useState<CompactJob[]>([]);
  const onSelectionChange = useCallback(
    ({ selected }: { selected: TypeRowSelection }) => {
      setSelections(Object.values(selected as { [key: string]: CompactJob }));
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
      <div className="flex h-full flex-col">
        <div className="flex flex-row items-center">
          <Switch
            label={shouldShowAllJobs ? 'All Jobs' : 'My Jobs'}
            onChange={onToggleHandler}
            checked={shouldShowAllJobs}
          />
          {user && (
            <Button
              color="red"
              className="my-2 ml-auto"
              disabled={!selections.length}
              onClick={() => mutate({ jobs: selections, userEmail: user.email })}
            >
              Kill {selections.length} {pluralize(selections.length, 'Job')}
            </Button>
          )}
        </div>
        <DataGrid
          idProperty="jobId"
          columns={columns}
          dataSource={jobs}
          recordTypes="Jobs"
          defaultFilterValue={filterValue}
          enableSelection={true}
          checkboxColumn={true}
          onSelectionChange={onSelectionChange}
        />
      </div>
    </>
  );
}

export default Jobs;
