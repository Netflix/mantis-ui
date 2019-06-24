import {
  getClientsForAllRegions,
  getServiceResponseErrors,
} from './BaseService';
import pSettle from 'p-settle';

export async function fetchMasterConfigs() {
  const clients = getClientsForAllRegions();

  let requests = clients.map(({ client }) =>
    client.get('/api/v1/masterConfigs'),
  );

  let responses = await pSettle(requests);
  const dataReponses = responses.map(response => {
    if (response.isFulfilled) {
      return { data: response.value.data };
    }
    return { errors: getServiceResponseErrors(response.reason.response) };
  });
  return dataReponses[0];
}
