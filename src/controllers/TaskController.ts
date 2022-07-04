import { Response, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { BODY_ERROR, PARAMS_NOT_NUMBER } from '../commons/errors';
import { ITaskController } from '../interfaces/ITaskController';
import {
  taskUpdateValidation,
  taskValidation
} from '../middlewares/validation';
import { CustomError } from '../models/CustomError';
import TaskService from '../services/TaskService';

@autoInjectable()
export default class TaskController implements ITaskController {
  taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async create(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { body, user } = req;
      const { error } = taskValidation(body);
      if (error) BODY_ERROR(error.message, 400, error.name);
      const task = await this.taskService.newTask(body, user.email);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: any, res: Response, next: NextFunction): Promise<any> {
    try {
      const { user } = req;
      const task = await this.taskService.getAllTask(user.email);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const { taskId } = req.params;
      const id = parseInt(taskId);
      if (!id) PARAMS_NOT_NUMBER();
      const { user } = req;
      const task = await this.taskService.getTaskById(
        id,
        user.email
      );
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async update(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const { taskId } = req.params;
      const { user, body } = req;
      const { error } = taskUpdateValidation(body);
      const id = parseInt(taskId);
      if (!id) PARAMS_NOT_NUMBER();
      if (error) BODY_ERROR(error.message, 400, error.name);
      const task = await this.taskService.updateTask(
        id,
        body,
        user.email
      );
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const { taskId } = req.params;
      const { user } = req;
      const id = parseInt(taskId);
      if (!id) PARAMS_NOT_NUMBER();
      const task = await this.taskService.deleteTask(id, user.email);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
}
