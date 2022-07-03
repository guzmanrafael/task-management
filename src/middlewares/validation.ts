import Joi from '@hapi/joi';
import { User } from '../models/User';

export const signupValidation = (data: User) => {
    const userSchema = Joi.object({
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    });
    return userSchema.validate(data);
};

export const signinValidation = (data: User) => {
    const userSchema = Joi.object({
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    });
    return userSchema.validate(data);
};