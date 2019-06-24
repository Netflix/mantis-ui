import {
  findClientByRegion,
  getClientsForAllRegions,
  handleApiRequests,
} from './BaseService';

export async function fetchJobClusters(
  pageSize = 15,
  offset = 0,
  searchString = '',
  labelFilterString = '',
) {
  const clients = getClientsForAllRegions();
  let queryString = searchString
    ? `&matching=.*${searchString}.*`
    : '';
  queryString += labelFilterString ? `&labels=${labelFilterString}` : '';

  let requests = clients.map(({ client }) =>
    client.get(
      `/api/v1/jobClusters/?pageSize=${pageSize}&offset=${offset}&sortBy=name&compact=true${queryString}`,
    ),
  );

  return handleApiRequests(requests);
}

export async function fetchJobClusterDetails(clusterId) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.get(`/api/v1/jobClusters/${clusterId}`),
  );

  return handleApiRequests(requests);
}

export async function fetchJobsForCluster(clusterId) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.get(`/api/v1/jobClusters/${clusterId}/jobs`),
  );

  return handleApiRequests(requests);
}

export async function createJobCluster(jobCluster) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobClusters`, jobCluster),
  );

  return handleApiRequests(requests);
}

export async function updateJobClusterStandard(clusterId, clusterConfig) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.put(`/api/v1/jobClusters/${clusterId}`, clusterConfig),
  );

  return handleApiRequests(requests);
}

export async function updateJobClusterQuickArtifact(clusterId, artifactConfig, userEmail) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobClusters/${clusterId}/actions/updateArtifact`, {
      name: clusterId,
      user: userEmail,
      ...artifactConfig,
    }),
  );

  return handleApiRequests(requests);
}

export async function updateJobClusterQuickSla(clusterId, slaConfig, userEmail) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobClusters/${clusterId}/actions/updateSla`, {
      name: clusterId,
      user: userEmail,
      ...slaConfig,
    }),
  );

  return handleApiRequests(requests);
}

export async function updateJobClusterQuickMigrationStrategy(clusterId, migrationConfig, userEmail) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobClusters/${clusterId}/actions/updateMigrationStrategy`, {
      name: clusterId,
      user: userEmail,
      ...migrationConfig,
    }),
  );

  return handleApiRequests(requests);
}

export async function updateJobClusterQuickLabel(clusterId, labels, userEmail) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobClusters/${clusterId}/actions/updateLabel`, {
      name: clusterId,
      user: userEmail,
      labels,
    }),
  );

  return handleApiRequests(requests);
}

export async function submitJobForCluster(clusterId, jobConfig) {
  const clients = getClientsForAllRegions();
  let requests = clients.map(({ client }) =>
    client.post(`/api/v1/jobClusters/${clusterId}/jobs`, jobConfig),
  );

  return handleApiRequests(requests);
}

export async function enableJobCluster(clusterId, userEmail) {
  const { client } = findClientByRegion();
  let request = client.post(`/api/v1/jobClusters/${clusterId}/actions/enableCluster`, {
    user: userEmail,
    name: clusterId,
  });

  return handleApiRequests([request]);
}

export async function disableJobCluster(clusterId, userEmail) {
  const { client } = findClientByRegion();
  let request = client.post(`/api/v1/jobClusters/${clusterId}/actions/disableCluster`, {
    user: userEmail,
    name: clusterId,
  });

  return handleApiRequests([request]);
}

export async function deleteJobCluster(clusterId, userEmail) {
  const { client } = findClientByRegion();
  let request = client.delete(`/api/v1/jobClusters/${clusterId}?user=${userEmail}`);

  return handleApiRequests([request]);
}
