import { getApiClientEntries } from '@/services/BaseService';
import type { EnvRegion } from '@/types/api';
import type { Cluster, ClusterListItem } from '@/types/cluster';
import type { CompactJob } from '@/types/job';

export async function fetchJobClusters(
  regionEnvs: EnvRegion[],
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

export async function fetchJobClusterByName(regionEnvs: EnvRegion[], clusterName: string) {
  if (!clusterName) return null;

  const clientEntries = getApiClientEntries().filter(({ env, region }) =>
    regionEnvs.some((item) => item.env === env && item.region === region),
  );

  const requests = clientEntries.map(({ client }) =>
    client.get(`api/v1/jobClusters/${clusterName}`).json(),
  );

  const responses = await Promise.allSettled(requests);
  const dataReponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value as Cluster;
    } else {
      return null;
    }
  });
  return dataReponses[0];
}

export async function fetchJobsOnCluster(
  regionEnvs: EnvRegion[],
  clusterName: string,
  compact = true,
) {
  const clientEntries = getApiClientEntries().filter(({ env, region }) =>
    regionEnvs.some((item) => item.env === env && item.region === region),
  );

  const queryParams = new URLSearchParams();
  queryParams.set('compact', compact.toString());

  const requests = clientEntries.map(({ client }) =>
    client.get(`api/v1/jobClusters/${clusterName}/jobs?${queryParams.toString()}`).json(),
  );

  const responses = await Promise.allSettled(requests);
  const dataResponses = responses.flatMap((response, index) => {
    if (response.status === 'fulfilled') {
      const items = response.value as CompactJob[];
      return items.map((item) => ({
        ...item,
        region: clientEntries[index].region,
        env: clientEntries[index].env,
      }));
    }
    return [];
  });

  return dataResponses;
}
