import axios from 'axios';
import store from '@/store';
import pSettle from 'p-settle';

export function getClientsForAllRegions() {
  const masters = store.state.metadata.mantisMasters;
  return masters.map(master => ({
    name: master.name,
    client: axios.create({
      baseURL: master.url,
    }),
  }));
}

// For now only single region is supported, we will only use first mantis master.
export function findClientByRegion() {
  const master = store.state.metadata.mantisMasters[0];
  return {
    name: master.name,
    client: axios.create({
      baseURL: master.url,
    }),
  };
}

// For now only single region is supported, we will only use first mantis master.
export function findMantisApiUrlByRegion() {
  const master = store.state.metadata.mantisMasters[0];
  return master.url;
}

export async function handleApiRequests(requests) {
  let responses = await pSettle(requests);
  const dataReponses = responses.map(response => {
    if (response.isFulfilled) {
      return { data: response.value.data };
    }
    return { errors: getServiceResponseErrors(response.reason.response) };
  });
  return dataReponses[0];
}

export function getServiceResponseErrors(response) {
  if (response && response.status === 404) {
    return [
      {
        code: 1,
        message: `The requested resource (${
          response.request.responseURL
        }) could not be found.`,
      },
    ];
  } else if (response && response.data) {
    return [response.data];
  }
  return [{ code: 2, message: 'Request failed with an unexpected error.' }];
}

export function createSseEventSource(url, onOpen, onMessage, onError) {
  const eventSource = new EventSource(url);
  eventSource.onopen = onOpen;
  eventSource.onmessage = onMessage;
  eventSource.onerror = onError;
  return eventSource;
}

export function createWebsocket(url, onOpen, onMessage, onError, onClose) {
  const connection = new WebSocket(url);
  connection.onopen = onOpen;
  connection.onmessage = onMessage;
  connection.onerror = onError;
  connection.onclose = onClose;
  return connection;
}
