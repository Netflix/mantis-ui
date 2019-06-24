import {
  findClientByRegion,
  handleApiRequests,
} from './BaseService';

export async function fetchArtifactNames() {
  const { client } = findClientByRegion();

  const request = client.get(
    `/api/v1/artifacts`,
  );

  return handleApiRequests([request]);
}

export async function fetchArtifactProperties(artifactLocation) {
  const { client } = findClientByRegion();
  const artifactName = artifactLocation.split("/").pop().replace(/\.(jar|zip)$/, '.json');

  const request = client.get(
    `/api/v1/artifacts/${artifactName}`,
  );

  return handleApiRequests([request]);
}

export async function uploadArtifact(file) {
  const { client } = findClientByRegion();

  const formData = new FormData();
  formData.append('file', file);

  const request = client.post(
    `/api/v1/artifacts`,
    formData,
  )

  return handleApiRequests([request]);
}
