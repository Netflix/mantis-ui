import { getApiClientEntries, getApiClientEntryForRegion } from '@/services/BaseService';
import { EnvRegion } from '@/types/api';
import { CompactJob, Job, JobSummary } from '@/types/job';

const reason = 'Mantis UI user action';

export async function fetchJobsListForRegion(env: string, region: string, compact = true) {
  const { client } = getApiClientEntryForRegion(env, region);
  const queryParams = new URLSearchParams();
  queryParams.set('compact', compact.toString());
  const data = await client.get(`api/v1/jobs/?${queryParams.toString()}`);
  return data.json<{ list: Job[] | CompactJob[] }>();
}

export async function fetchJobs(
  regionEnvs: EnvRegion[],
  compact = true,
): Promise<Job[] | CompactJob[]> {
  const clientEntries = getApiClientEntries().filter(({ env, region }) =>
    regionEnvs.some((item) => item.env === env && item.region === region),
  );
  const requests = clientEntries.map(({ env, region }) =>
    fetchJobsListForRegion(env, region, compact),
  );

  const responses = await Promise.allSettled(requests);
  const data = responses.flatMap((response, index) => {
    if (response.status === 'fulfilled') {
      const items = response.value.list as Job[];
      return items.map((item) => ({
        ...item,
        region: clientEntries[index].region,
        env: clientEntries[index].env,
      }));
    }
    return [];
  });

  return data;
}

export async function fetchJobsSummary(regionEnvs: EnvRegion[]) {
  const data = (await fetchJobs(regionEnvs, false)) as Job[];
  const uniqueJobs = [...new Set(data.map((item) => item.jobMetadata.name))];
  const jobSummaries: JobSummary[] = [];

  uniqueJobs.forEach((jobId: string) => {
    let jobCount = 0;
    let totalCpus = 0;
    let totalMemory = 0;
    let totalWorkers = 0;

    const filteredJobList = data.filter((job) => job.jobMetadata.name === jobId);
    const regions = new Set<string>();
    const envs = new Set<string>();
    jobCount += filteredJobList.length;
    filteredJobList.forEach((job) => {
      job.stageMetadataList.forEach((stageMetadata) => {
        totalCpus += stageMetadata.machineDefinition.cpuCores * stageMetadata.numWorkers;
        totalMemory += stageMetadata.machineDefinition.memoryMB * stageMetadata.numWorkers;
        totalWorkers += stageMetadata.numWorkers;
      });
    });

    // take it from MB to bytes
    totalMemory *= 1024 * 1024;

    jobSummaries.push({
      name: jobId,
      jobCount,
      totalCpus,
      totalMemory,
      totalWorkers,
      regions: [...regions],
      envs: [...envs],
    });
  });
  return jobSummaries;
}

export async function killJobs(
  jobs: CompactJob[],
  userEmail: string,
  refetch: () => void,
  setSelections: (value: React.SetStateAction<CompactJob[]>) => void,
) {
  const requests = jobs.map(({ env, region, jobId }) => {
    const { client } = getApiClientEntryForRegion(env, region);
    return client.delete(`api/v1/jobs/${jobId}?user=${userEmail}&reason=${reason}`);
  });

  const responses = await Promise.allSettled(requests);
  const error = responses.find((response) => response.status === 'rejected') as
    | PromiseRejectedResult
    | undefined;
  if (error) {
    const message = error.reason as string;
    throw new Error(`Failed to kill job due to ${message}`);
  } else {
    refetch();
    setSelections([]);
  }
}
