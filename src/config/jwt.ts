import { sign } from 'jsonwebtoken';
import { CustomError } from '../models/CustomError';

export const generateToken = (user: any) => {
  try {
    return sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
  } catch (
    error
  ) {
    throw new CustomError('Error in JWT', 500, error);
  }
};
