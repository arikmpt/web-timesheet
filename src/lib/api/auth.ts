import api from '.';
import { defaultApiErrorHandler, getApiData } from './utils';

export const login = async (request: GetLoginRequest) => {
  return await api
    .post<GetLoginResponse>('/auth/login', request)
    .then(getApiData)
    .catch(defaultApiErrorHandler);
};

interface GetLoginRequest {
  email: string;
  password: string;
}

interface GetLoginResponse {
  token: string;
}
