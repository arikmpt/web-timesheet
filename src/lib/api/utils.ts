import { routes } from '@/constants/routes';
import { useAuthStore } from '../store/auth';
import { DefaultError } from './types';
import { toast } from 'sonner';

export const getApiData = <T>({ data }: { data: T }) => data;

export const defaultApiErrorHandler = <T>(
  error: DefaultError<T>,
  options?: { disableRedirect?: boolean }
) => {
  const responseError =
    error?.response?.data?.error || error?.response?.data || error;
  if (error.response?.status === 403 && !options?.disableRedirect) {
    useAuthStore.getState().logout();
    window.location.href = routes.LOGIN;
    toast.error('Error!', {
      description: error.response.data.message,
      position: 'top-right',
    });
    throw responseError;
  }

  throw responseError;
};
