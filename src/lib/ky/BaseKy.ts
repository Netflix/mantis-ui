import ky from 'ky';
import { notification } from 'antd';

const KyInstance = ky.create({
  retry: {
    limit: 2,
    statusCodes: [401],
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          notification.error({
            message: `Request ${response.url} failed with code ${response.status}`,
            description: response.statusText,
          });
          return Promise.reject(response);
        }
        return response;
      },
    ],
  },
});

export default KyInstance;
