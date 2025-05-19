type ErrorValuesSchema<T extends string> = Record<T, {
  statusCode: number,
  message: string,
  code: T;
  details?: object;
}>;

type ErrorTypeKeys =
  | 'SERVER_500'
  | 'SERVER_506'
  | 'CLIENT_400'
  | 'CLIENT_401'
  | 'CLIENT_404';

const Errors: ErrorValuesSchema<ErrorTypeKeys> = {
  SERVER_500: {
    statusCode: 500,
    code: 'SERVER_500',
    message: 'Ops! Ocorreu um erro inesperado no servidor. Tente novamente mais tarde.',
  },
  SERVER_506: {
    statusCode: 506,
    code: 'SERVER_506',
    message: 'Erro de negociação de conteúdo. O servidor não conseguiu concluir a solicitação corretamente.',
  },
  CLIENT_404: {
    statusCode: 404,
    code: 'CLIENT_404',
    message: 'Recurso não encontrado. Verifique se o endereço está correto ou se o recurso ainda existe.',
  },
  CLIENT_400: {
    statusCode: 400,
    code: 'CLIENT_400',
    message: 'Requisição inválida. Por favor, verifique os dados enviados e tente novamente.',
  },
  CLIENT_401: {
    statusCode: 401,
    code: 'CLIENT_401',
    message: 'Requisição não autorizada. Token de autenticação ausente ou inválido.',
  }
};

type CustomErrorTypes = ErrorValuesSchema<ErrorTypeKeys>;
export function customError<K extends ErrorTypeKeys> ( key: K, details?: Partial<CustomErrorTypes[K]> ) {
  if ( !Errors[key] )
    throw Errors.SERVER_506;

  const e = {
    ...Errors[key],
    ...details && ( details )
  };
  return `\n\n ${JSON.stringify( e )} \n\n`;
}