import { Model, createServer } from 'miragejs';
import { API_URLS } from '@/config/development';

import artifacts from './fixtures/artifacts';
import jobs from './fixtures/jobs';
import { CompactJob, Job } from '@/types/job';
import { Artifact } from '@/types/artifact';

export function makeServer(baseUrl: string) {
  return createServer({
    models: {
      job: Model.extend<Partial<Job>>({}),
      artifact: Model.extend<Partial<Artifact>>({}),
    },

    fixtures: {
      artifacts,
      jobs,
    },

    routes() {
      this.namespace = '/api';
      this.urlPrefix = baseUrl;

      this.get('/v1/jobs', (schema, request) => {
        const { compact } = request.queryParams;
        const isCompact = `${compact}`.toLowerCase() === 'true';
        if (isCompact) {
          return {
            list: schema.db.jobs.map((job: Job) => {
              return {
                jarUrl: job.jobMetadata.jarUrl,
                submittedAt: job.jobMetadata.submittedAt,
                user: job.jobMetadata.user,
                state: job.jobMetadata.state,
                type:
                  job.jobMetadata.labels.find((label) => label.name === '_mantis.jobType')?.name ??
                  'unknown',
                numStages: job.stageMetadataList.reduce((acc, stage) => acc + stage.numStages, 0),
                numWorkers: job.stageMetadataList.reduce((acc, stage) => acc + stage.numWorkers, 0),
                totCPUs: job.stageMetadataList.reduce(
                  (acc, stage) => acc + stage.machineDefinition.cpuCores,
                  0,
                ),
                totMemory: job.stageMetadataList.reduce(
                  (acc, stage) => acc + stage.machineDefinition.memoryMB,
                  0,
                ),
                statesSummary: {
                  Started: 1,
                },
                labels: job.jobMetadata.labels,
                jobId: job.jobMetadata.jobId,
              } as Omit<CompactJob, 'env' | 'region'>;
            }),
          };
        }
        return { list: schema.db.jobs };
      });

      this.get('https://mantis.us-east-1.test.netflix.net/library/list', (schema) => {
        return schema.db.artifacts;
      });
    },

    seeds(server) {
      server.loadFixtures();
    },
  });
}

export function setupMirage() {
  const mode = import.meta.env.MODE;
  if (mode === 'development') {
    Object.values(API_URLS).forEach((regions) => {
      Object.values(regions).forEach((url) => {
        makeServer(url);
      });
    });
  }
}
