import api from '.';
import { defaultApiErrorHandler, getApiData } from './utils';

export const getProfile = async () => {
  return await api
    .get<GetProfilResponse>('/auth/profile')
    .then(getApiData)
    .catch(defaultApiErrorHandler);
};

export const updateProfile = async (request: UpdateProfileRequest) => {
  return await api
    .put<GetProfilResponse>('/auth/profile', request)
    .then(getApiData)
    .catch(defaultApiErrorHandler);
};

interface GetProfilResponse {
  profile: Profile;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  countryCode: string | null;
  contactNumber: string | null;
  birthOfDate: Date | string | null;
  placeOfBirth: string | null;
  address: string | null;
  user: {
    email: string;
  };
}

type UpdateProfileRequest = Partial<Profile>;
