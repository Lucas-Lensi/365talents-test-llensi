import axios from 'axios';

import { checkParams, createUriString } from './company.service.js';

// eslint-disable-next-line no-use-before-define
export { getCompanies, getCompanyById };

async function getCompanies(params) {
  if (await !checkParams(params))
    throw new Error('Invalid params');

  let requestUri = await createUriString(params, process.env.SOCIETECOMTOKEN);
  if (!requestUri)
    throw new Error('Invalid URI');

  const response = await axios.get(requestUri);
  if (!response)
    throw new Error('An error occured with societe.com');

  return response.data;
}

async function getCompanyById(params) {

}
