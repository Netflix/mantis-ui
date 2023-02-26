import { getApiClientEntries } from '@/services/BaseService';
import { Cluster, ClusterListItem } from '@/types/cluster';

export async function fetchJobClusters(
  regionEnvs: {
    env: string;
    region: string;
  }[],
  compact = true,
): Promise<ClusterListItem[]> {
  const clientEntries = getApiClientEntries().filter(({ env, region }) =>
    regionEnvs.some((item) => item.env === env && item.region === region),
  );
  const queryParams = new URLSearchParams();
  queryParams.set('compact', compact.toString());

  const requests = clientEntries.map(({ client }) =>
    client.get(`api/v1/jobClusters/?${queryParams.toString()}`).json(),
  );
  const responses = await Promise.allSettled(requests);
  const data = responses.flatMap((response, index) => {
    if (response.status === 'fulfilled') {
      const items = response.value as { list: Cluster[] };
      return items.list.map((item) => ({
        ...item,
        region: clientEntries[index].region,
        env: clientEntries[index].env,
      }));
    }
    return [];
  });
  const uniqueJobClusterNames = [...new Set(data.map((item) => item.name))];
  const jobClusters = [] as ClusterListItem[];
  uniqueJobClusterNames.forEach((uniqueJobClusterName) => {
    const filteredJobClusters = data.filter((item) => item.name === uniqueJobClusterName);

    jobClusters.push({
      name: uniqueJobClusterName,
      labels: filteredJobClusters?.[0]?.labels,
      versions: filteredJobClusters?.map(({ env, region, disabled, jars = [] }) => {
        const latestJar = jars[jars.length - 1];
        return {
          env,
          region,
          version: latestJar.version,
          disabled,
        };
      }),
      owners: filteredJobClusters?.map(({ owner }) => owner.contactEmail),
    });
  });

  return jobClusters;
}
