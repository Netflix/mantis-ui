import { Model, createServer } from 'miragejs';
import { API_URLS } from '@/config/development';

import artifacts from '@/mirage/fixtures/artifacts';
import clusters from '@/mirage/fixtures/clusters';
import jobs from '@/mirage/fixtures/jobs';
import { CompactJob, Job } from '@/types/job';
import { Artifact } from '@/types/artifact';
import { Cluster } from '@/types/cluster';

export function makeServer(baseUrl: string) {
  return createServer({
    models: {
      artifact: Model.extend<Partial<Artifact>>({}),
      clusters: Model.extend<Partial<Cluster>>({}),
      job: Model.extend<Partial<Job>>({}),
    },

    fixtures: {
      artifacts,
      clusters,
      jobs,
    },

    routes() {
      this.namespace = '/api';
      this.urlPrefix = baseUrl;

      this.get('/v1/jobClusters', (schema) => {
        return { list: schema.db.clusters };
      });

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

      this.delete('/v1/jobs/:jobId', (schema, request) => {
        const { jobId } = request.params; // jobId to be deleted

        schema.db.jobs.forEach((job: Job) => {
          if (job.jobMetadata.jobId === jobId) {
            schema.db.jobs.remove(job); // Remove the job from the mock db
          }
        });

        return { list: schema.db.jobs };
      });

      this.post('/v1/artifacts', (schema, request) => {
        const data: unknown = JSON.parse(request.requestBody);
        schema.db.artifacts.insert(data); // Insert the new artifact into the mock db

        return { list: schema.db.artifacts };
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
