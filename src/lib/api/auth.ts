import api from '.';
import { defaultApiErrorHandler, getApiData } from './utils';

export const login = async (request: GetLoginRequest) => {
  return await api
    .post<GetLoginResponse>('/auth/login', request)
    .then(getApiData)
    .catch(defaultApiErrorHandler);
};

export const changePassword = async (request: ChangePasswordRequest) => {
  return await api
    .put<ChangePasswordResponse>('/auth/change-password', request)
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

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordResponse {
  message: string;
}
