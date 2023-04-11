import { useNavigate, useParams } from 'react-router-dom';

import { useClusterDetails } from '@/hooks/useClusters';

function ClusterDetail() {
  const navigate = useNavigate();
  const { clusterId: clusterName = '' } = useParams();
  if (!clusterName) navigate('/404', { replace: true });

  const { data, isLoading } = useClusterDetails(clusterName);

  if (isLoading) return <div className="flex h-full flex-col">Loading...</div>;
  return <div className="flex h-full flex-col">{data?.name}</div>;
}

export default ClusterDetail;
