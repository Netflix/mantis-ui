import { Button, Switch } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import AppLink from '@/components/AppLink';
import DataGrid from '@/components/DataGrid';
import JobLabelBadge from '@/components/Jobs/JobLabelBadge';
import JobVersionBadge from '@/components/Jobs/JobVersionBadge';
import { AppRoutePaths } from '@/components/Router/routes/constants';
import { useAuth } from '@/hooks/useAuth';
import { useClusters } from '@/hooks/useClusters';
import { useEntityFilter } from '@/hooks/useEntityFilter';
import { ClusterListItem, Version } from '@/types/cluster';
import { Label } from '@/types/machine';
import { getJobTagDefinitions } from '@/utils/job';

function Clusters() {
  const filterValue = [{ name: 'name', operator: 'contains', type: 'string', value: null }];
  const columns = [
    {
      name: 'name',
      header: 'Cluster Name',
      render: ({ value }: { value: string }) => <AppLink item={value} to={`${value}`} />,
    },
    {
      name: 'labels',
      header: 'Tags',
      render: ({ value }: { value: Label[] }) => (
        <JobLabelBadge labels={getJobTagDefinitions(value)} />
      ),
    },
    {
      name: 'versions',
      header: 'Versions',
      render: ({ value }: { value: Version[] }) => <JobVersionBadge versions={value} />,
      cellRenderer: 'JobVersionRenderer',
      defaultFlex: 2,
    },
  ];
  const navigate = useNavigate();
  const ALL_CLUSTERS = 'allClusters';
  const MY_CLUSTERS = 'myClusters';
  const { onToggleHandler, filter } = useEntityFilter(ALL_CLUSTERS, MY_CLUSTERS);
  const shouldShowAllClusters = filter !== MY_CLUSTERS;
  const { user } = useAuth();
  const { data = [], isLoading } = useClusters();

  const clusters = shouldShowAllClusters
    ? data
    : data.filter((cluster: ClusterListItem) =>
        cluster.owners.includes(user?.email?.replace(/@[A-za-z0-9]+.com/g, '') || ''),
      );

  return (
    <>
      <Helmet>
        <title>Mantis - Clusters</title>
      </Helmet>
      <div className="flex flex-col h-full">
        <div className="flex flex-row items-center">
          <Switch
            label={shouldShowAllClusters ? 'All Clusters' : 'My Clusters'}
            onChange={onToggleHandler}
            checked={shouldShowAllClusters}
          />
          <Button className="my-2 ml-auto" onClick={() => navigate(AppRoutePaths.CREATE)}>
            Create New Job Cluster
          </Button>
        </div>
        <DataGrid
          columns={columns}
          dataSource={clusters}
          defaultFilterValue={filterValue}
          loading={isLoading}
          recordTypes="Job Clusters"
        />
      </div>
    </>
  );
}

export default Clusters;
