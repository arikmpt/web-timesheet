import api from '.';
import { defaultApiErrorHandler, getApiData } from './utils';

export const getCountries = async () => {
  return await api
    .get<GetCountryResponse>('/ref/countries')
    .then(getApiData)
    .catch(defaultApiErrorHandler);
};

export interface Country {
  name: string;
  dialCode: string;
  code: string;
}

interface GetCountryResponse {
  countries: Country[];
}
