import { Helmet } from 'react-helmet-async';
import DataGrid from '@/components/DataGrid/DataGrid';
import JobLabelRenderer from '@/components/DataGrid/renderers/JobLabelRenderer/JobLabelRenderer';
import LinkRenderer from '@/components/DataGrid/renderers/LinkRenderer/LinkRenderer';
import JobVersionRenderer from '@/components/DataGrid/renderers/JobVersionRenderer/JobVersionRenderer';
import { getJobTagDefinitions } from '@/utils/job';
import { useClusters } from '@/hooks/useClusters';
import { ClusterListItem } from '@/types/cluster';
import { Button, Switch } from 'antd';
import { useEntityFilter } from '@/hooks/useEntityFilter';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-location';
import { AppRoutePaths } from '@/router/routes';
import { useMemo } from 'react';

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
  const frameworkComponents = useMemo(
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
  const shouldShowAllClusters = filter === ALL_CLUSTERS;
  const { user } = useAuth();
  const { data = [] } = useClusters();

  const clusters = shouldShowAllClusters
    ? data
    : data.filter((cluster: ClusterListItem) =>
        cluster.owners.includes(user?.email?.replace(/@netflix.com/g, '') || ''),
      );

  return (
    <>
      <Helmet>
        <title>Mantis - Clusters</title>
      </Helmet>
      <div className="m-4 flex flex-col h-full">
        <div className="flex flex-row items-center">
          <Switch
            checkedChildren="All Clusters"
            unCheckedChildren="My Clusters"
            onChange={onToggleHandler}
            checked={shouldShowAllClusters}
          />
          <Button
            type="primary"
            className="my-2 ml-auto"
            onClick={() => navigate({ to: AppRoutePaths.CREATE })}
          >
            Create New Job Cluster
          </Button>
        </div>
        <DataGrid
          columnDefs={columnDefs}
          rowData={clusters}
          recordTypes="Job Clusters"
          frameworkComponents={frameworkComponents}
        />
      </div>
    </>
  );
}

export default Clusters;
