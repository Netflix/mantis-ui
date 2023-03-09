import { Button, Switch } from '@mantine/core';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import DataGrid from '@/components/DataGrid/DataGrid';
import JobLabelRenderer from '@/components/DataGrid/renderers/JobLabelRenderer/JobLabelRenderer';
import JobVersionRenderer from '@/components/DataGrid/renderers/JobVersionRenderer/JobVersionRenderer';
import LinkRenderer from '@/components/DataGrid/renderers/LinkRenderer/LinkRenderer';
import { AppRoutePaths } from '@/components/Router/routes/constants';
import { useAuth } from '@/hooks/useAuth';
import { useClusters } from '@/hooks/useClusters';
import { useEntityFilter } from '@/hooks/useEntityFilter';
import { ClusterListItem } from '@/types/cluster';
import { getJobTagDefinitions } from '@/utils/job';

function Clusters() {
  const columnDefs = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Cluster Name',
        cellRenderer: 'LinkRenderer',
        cellRendererParams: {
          getTo(row: ClusterListItem) {
            return `${row.name}`;
          },
        },
      },
      {
        valueGetter: ({ data }: { data: ClusterListItem }) => {
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
        },
      },
      {
        headerName: 'Tags',
        cellRenderer: 'JobLabelRenderer',
        cellRendererParams: {
          getTagColor(type: string) {
            switch (type) {
              case 'danger':
                return 'error';
              case 'default':
                return 'blue';
              default:
                return type;
            }
          },
        },
        filter: false,
      },
      {
        field: 'versions',
        cellRenderer: 'JobVersionRenderer',
        flex: 2,
        filter: false,
      },
    ],
    [],
  );
  const components = useMemo(
    () => ({
      JobLabelRenderer,
      LinkRenderer,
      JobVersionRenderer,
    }),
    [],
  );
  const navigate = useNavigate();
  const ALL_CLUSTERS = 'allClusters';
  const MY_CLUSTERS = 'myClusters';
  const { onToggleHandler, filter } = useEntityFilter(ALL_CLUSTERS, MY_CLUSTERS);
  const shouldShowAllClusters = filter !== MY_CLUSTERS;
  const { user } = useAuth();
  const { data = [] } = useClusters();

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
          columnDefs={columnDefs}
          rowData={clusters}
          recordTypes="Job Clusters"
          components={components}
        />
      </div>
    </>
  );
}

export default Clusters;
