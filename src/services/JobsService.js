import {
  createSseEventSource,
  findClientByRegion,
  findMantisApiUrlByRegion,
  getClientsForAllRegions,
  handleApiRequests,
} from './BaseService';

const reason = 'Mantis UI user action';

export async function fetchJobs(pageSize = 15, offset = 0, searchString = '', labelFilterString = '') {
  const clients = getClientsForAllRegions();
  let queryString = searchString
    ? `&matching=.*${searchString}.*`
    : '';
  queryString += labelFilterString ? `&labels=${labelFilterString}` : '';

  const requests = clients.map(({ client }) =>
    client.get(
      `/api/v1/jobs/?pageSize=${pageSize}&offset=${offset}&compact=true${queryString}`,
    ),
  );

  return handleApiRequests(requests);
}

export async function fetchJobDetails(jobId) {
  const clients = getClientsForAllRegions();
  const requests = clients.map(({ client }) =>
    client.get(`/api/v1/jobs/${jobId}`),
  );

  return handleApiRequests(requests);
}

export async function fetchJobArchivedWorkers(jobId) {
  const clients = getClientsForAllRegions();
  const requests = clients.map(({ client }) =>
    client.get(`/api/v1/jobs/${jobId}/archivedWorkers`),
  );

  return handleApiRequests(requests);
}

export async function resubmitWorker(jobId, workerNumber, userEmail) {
  const { client } = findClientByRegion();
  const request = client.post(`/api/v1/jobs/${jobId}/actions/resubmitWorker`, {
    user: userEmail,
    workerNumber,
    reason,
  });

  return handleApiRequests([request]);
}

export async function scaleJobStage(jobId, stageNumber, numWorkers, userEmail) {
  const { client } = findClientByRegion();
  const request = client.post(`/api/v1/jobs/${jobId}/actions/scaleStage`, {
    JobId: jobId,
    StageNumber: stageNumber,
    NumWorkers: numWorkers,
    user: userEmail,
  });

  return handleApiRequests([request]);
}

export async function killJobs(jobIds, userEmail) {
  const { client } = findClientByRegion();
  const requests = jobIds.map(jobId =>
    client.delete(`/api/v1/jobs/${jobId}?user=${userEmail}&reason=${reason}`),
  );

  return handleApiRequests(requests);
}

export async function streamJobStatus(jobId, onOpen, onMessage, onError) {
  const mantisBaseUrl = findMantisApiUrlByRegion();
  const url = `${mantisBaseUrl}/api/v1/jobstatus/${jobId}`;
  return createSseEventSource(url, onOpen, onMessage, onError);
}

export async function quickSubmitJob(jobConfig) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobs/actions/quickSubmit`, jobConfig),
  );

  return handleApiRequests(requests);
}

export function streamingOutputUrl(jobId, samplingRate) {
  const mantisBaseUrl = findMantisApiUrlByRegion();
  const queryParamString = samplingRate ? `?sampleMSec=${samplingRate}` : '';
  return `${mantisBaseUrl}/api/v1/jobconnectbyid/${jobId}${queryParamString}`;
}

export function streamJobOutput(
  jobOutputUrl,
  onOpen,
  onMessage,
  onError,
) {
  return createSseEventSource(jobOutputUrl, onOpen, onMessage, onError);
}
