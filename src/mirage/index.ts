import { Model, Response, createServer } from 'miragejs';

import { API_URLS } from '@/config/development';
import artifacts from '@/mirage/fixtures/artifacts';
import clusters from '@/mirage/fixtures/clusters';
import jobs from '@/mirage/fixtures/jobs';
import { Artifact } from '@/types/artifact';
import { Cluster } from '@/types/cluster';
import { CompactJob, Job } from '@/types/job';

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

      //Get single Job item
      this.get('/v1/jobs/:jobId', (schema, request) => {
        const { jobId } = request.params;
        let job: Job | null = null;
        schema.db.jobs.map((mappedJob: Job) => {
          if (mappedJob.jobMetadata.jobId === jobId) {
            job = mappedJob;
          }
        });
        if (job !== null) {
          return { job: job };
        } else return new Response(500, { Error: 'No job found with this id.' });
      });

      this.delete('/v1/jobs/:jobId', (schema, request) => {
        //Local type as mirage returns "any"
        type MirageJobEntity<T> = T & {
          id: number;
        };
        const { jobId } = request.params;
        schema.db.jobs.map((job: Job) => {
          if (job.jobMetadata.jobId === jobId) {
            const dbJob = schema.db.jobs.findBy(job) as MirageJobEntity<Job>;
            job.jobMetadata.state = 'Killed';
            schema.db.jobs.update(dbJob.id, job);
            //Moving job to archive
            schema.db.createCollection('archived', [job]);
          }
        });
        return new Response(200);
      });

      this.get('https://mantis.us-east-1.test.netflix.net/library/list', (schema) => {
        return schema.db.artifacts;
      });

      this.post('/v1/artifacts', (schema, request) => {
        try {
          const data = JSON.parse(request.requestBody) as Artifact;
          schema.db.artifacts.insert(data);
        } catch (err) {
          console.error(err);
        }

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
