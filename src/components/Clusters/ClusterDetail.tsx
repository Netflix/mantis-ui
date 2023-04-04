import { useParams } from 'react-router-dom';

import { useClusterDetails } from '@/hooks/useClusters';

function ClusterDetail() {
  const { clusterId } = useParams();
  const clusterName = clusterId ? clusterId : 'cluster name not provided';
  const { data, isLoading } = useClusterDetails(clusterName);

  console.log('isLoading', isLoading, ' - data', data);
  if (isLoading) return <div className="flex h-full flex-col">Loading...</div>;
  return <div className="flex h-full flex-col">{data?.name}</div>;
}

export default ClusterDetail;
