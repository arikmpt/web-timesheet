import api from '.';
import { defaultApiErrorHandler, getApiData } from './utils';

export const getProfile = async () => {
  return await api
    .get<GetProfilResponse>('/auth/profile')
    .then(getApiData)
    .catch(defaultApiErrorHandler);
};

interface GetProfilResponse {
  profile: Profile;
}

export interface Profile {
  id: 1;
  firstName: string;
  lastName: string;
  countryCode: string;
  contactNumber: string;
  birthOfDate: string;
  placeOfBirth: string;
  address: string;
  user: {
    email: string;
  };
}
