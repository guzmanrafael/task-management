import { CustomError } from '../models/CustomError';

export const USER_DOES_NOT_EXIST = () => {
  throw new CustomError('User does not exist', 409, '');
};

export const USER_ALREADY_EXISTS = () => {
  throw new CustomError('User already exists', 409, '');
};

export const INVALID_PASSWORD = () => {
  throw new CustomError('Invalid password', 403, '');
};

export const TASK_DOES_NOT_EXIST = () => {
  throw new CustomError('Task does not exist', 409, '');
};

export const BODY_ERROR = (
  message: string,
  statusCode: number,
  name: string
) => {
  throw new CustomError(message, statusCode, name);
};

export const PARAMS_NOT_NUMBER = () => {
  throw new CustomError(
    'wrong parameters',
    400,
    'The parameter is not a number'
  );
};

export const TOKEN_MUST_BE_SENT = () => {
  throw new CustomError('Token must be sent', 400, '');
};

export const INVALID_TOKEN = () => {
  throw new CustomError('Invalid token', 401, '');
};
