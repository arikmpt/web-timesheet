import { AxiosError } from 'axios';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

export type DefaultError<T> = AxiosError<{
  error?: T;
  message?: string;
  errors?: T[];
}>;

export type APIErrors = Record<string, string[]> | string[];

export type APIDefaultErrors = {
  errors?: APIErrors;
  message?: string;
};

export const isError = (errors: APIErrors | undefined, key: string) => {
  const formattedErrors = formatError(errors, key);
  if (formattedErrors && Array.isArray(formattedErrors)) {
    return formattedErrors.length > 0;
  }

  return !!formattedErrors;
};

export const formatError = (errors: APIErrors | undefined, key: string) => {
  if (errors && Array.isArray(errors)) {
    return errors.join(', ');
  }

  if (
    errors &&
    typeof errors === 'object' &&
    key in errors &&
    errors[key]?.[0]
  ) {
    return errors[key][0];
  }

  return '';
};

export const setRhfError = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  errorKeys: Array<{ errorKey: FieldPath<T>; apiErrorKey: string }>,
  errors: APIErrors
) =>
  errorKeys.map((errorKey) => {
    if (isError(errors, errorKey.apiErrorKey)) {
      setError(errorKey.errorKey, {
        type: 'manual',
        message: formatError(errors, errorKey.apiErrorKey),
      });
    }
  });

type RhfErrorKey<TFormProps extends FieldValues> = {
  errorKey: FieldPath<TFormProps>;
  apiErrorKey: string;
};

export const getRhfErrorKeys = <TFormProps extends FieldValues>(
  errorKeys: Array<FieldPath<TFormProps> | RhfErrorKey<TFormProps>>
): Array<RhfErrorKey<TFormProps>> =>
  errorKeys?.map((errorKey) => {
    if (typeof errorKey === 'object') {
      return errorKey;
    }

    return { errorKey, apiErrorKey: errorKey };
  }) ?? [];

export const getErrorMessage = (
  errorKeys: Array<{ apiErrorKey: string }>,
  errors: APIErrors = {}
): string[] | undefined => {
  if (Array.isArray(errors) && errorKeys.length === 0) {
    return errors;
  }

  if (typeof errors === 'object' && errors && !Array.isArray(errors)) {
    const expectedErrorKeys = errorKeys?.map(
      (errorKey) => errorKey.apiErrorKey
    );
    const apiErrorKeys = Object.keys(errors);
    const unexpectedErrorKeys = apiErrorKeys.filter(
      (apiErrorKey) => !expectedErrorKeys.includes(apiErrorKey)
    );
    if (unexpectedErrorKeys?.length > 0) {
      return unexpectedErrorKeys.flatMap((errorKey) => {
        if (errorKey in errors) {
          return formatError(errors, errorKey);
        }

        return [];
      });
    }
  }

  return undefined;
};
