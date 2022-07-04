import { Response, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { ITaskController } from '../interfaces/ITaskController';
import { taskValidation } from '../middlewares/validation';
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
      if (error) throw new CustomError(error.message, 400, error.name);
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
}
