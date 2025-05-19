type ErrorValuesSchema<T extends string> = Record<T, {
  statusCode: number,
  message: string,
  code: T;
  details?: object;
}>;

type ErrorTypeKeys =
  | 'SERVER_500'
  | 'CLIENT_400'
  | 'CLIENT_401'
  | 'CLIENT_403'
  | 'CLIENT_404'
  | 'CLIENT_409'
  | 'CLIENT_422';

const Errors: ErrorValuesSchema<ErrorTypeKeys> = {
  SERVER_500: {
    statusCode: 500,
    code: 'SERVER_500',
    message: 'Oops! An unexpected server error occurred. Please try again later.',
  },
  CLIENT_400: {
    statusCode: 400,
    code: 'CLIENT_400',
    message: 'Invalid request. Please check the data sent and try again.',
  },
  CLIENT_401: {
    statusCode: 401,
    code: 'CLIENT_401',
    message: 'Unauthorized request. Authentication token is missing or invalid.',
  },
  CLIENT_403: {
    statusCode: 403,
    code: 'CLIENT_403',
    message: 'Forbidden. You do not have permission to access this resource.',
  },
  CLIENT_404: {
    statusCode: 404,
    code: 'CLIENT_404',
    message: 'Resource not found. Please check if the URL is correct or if the resource still exists.',
  },
  CLIENT_409: {
    statusCode: 409,
    code: 'CLIENT_409',
    message: 'Conflict. The resource already exists or the request conflicts with the current state.',
  },
  CLIENT_422: {
    statusCode: 422,
    code: 'CLIENT_422',
    message: 'Unprocessable Entity. The request was well-formed but contains semantic errors.',
  }
};

type CustomErrorTypes = ErrorValuesSchema<ErrorTypeKeys>;
export function customError<K extends ErrorTypeKeys> ( key: K, details?: Partial<CustomErrorTypes[K]> ) {
  if ( !Errors[key] )
    throw Errors.SERVER_500;

  const e = {
    ...Errors[key],
    ...details && ( details )
  };
  return `\n\n ${JSON.stringify( e )} \n\n`;
}