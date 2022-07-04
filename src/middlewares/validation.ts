import Joi from '@hapi/joi';
import { User } from '../models/User';

export const signupValidation = (data: User) => {
  const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
  });
  return userSchema.validate(data);
};

export const signinValidation = (data: User) => {
  const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
  });
  return userSchema.validate(data);
};

export const taskValidation = (data: User) => {
  const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.boolean().required(),
    deadline: Joi.string().required(),
    comments: Joi.array().items(Joi.string()),
    responsible: Joi.string().empty(),
    tags: Joi.array().items(Joi.string())
  });
  return taskSchema.validate(data);
};

export const taskUpdateValidation = (data: User) => {
  const taskSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.boolean(),
    deadline: Joi.string(),
    comments: Joi.array().items(Joi.string()),
    responsible: Joi.string().empty(),
    tags: Joi.array().items(Joi.string())
  });
  return taskSchema.validate(data);
};
