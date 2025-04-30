import { AxiosError } from 'axios';

export type DefaultError<T> = AxiosError<{
  error?: T;
  message?: string;
}>;
