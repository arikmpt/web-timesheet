import { DefaultError } from './types';

export const getApiData = <T>({ data }: { data: T }) => data;

export const defaultApiErrorHandler = <T>(
  error: DefaultError<T>,
  options?: { disableRedirect?: boolean }
) => {
  const responseError =
    error?.response?.data?.error || error?.response?.data || error;

  if (error.response?.status === 403 && !options?.disableRedirect) {
    throw responseError;
  }

  throw responseError;
};
