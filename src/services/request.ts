import https from 'node:https';
import { PackageSource } from '../@types/packages.js';

export const request = (
  packageName: string,
  hostname: string
): Promise<{ statusCode?: number; body: PackageSource }> => {
  const options = {
    hostname,
    path: `/${packageName}`,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};
