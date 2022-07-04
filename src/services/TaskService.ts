import { injectable } from 'tsyringe';
import { ITaskService } from '../interfaces/ITaskService';
import { CustomError } from '../models/CustomError';
import { Task } from '../models/Task';
import { User } from '../models/User';
import AuthRepository from '../repositories/AuthRepository';
import TaskRepository from '../repositories/TaskRepository';

@injectable()
export default class TaskService implements ITaskService {
  taskRepository: TaskRepository;
  authRepository: AuthRepository;

  constructor(taskRepository: TaskRepository, authRepository: AuthRepository) {
    this.taskRepository = taskRepository;
    this.authRepository = authRepository;
  }

  async newTask(task: Task, email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) {
      throw new CustomError('User does not exist', 409, '');
    }
    const createdTask = await this.taskRepository.create(task, userExist);
    delete createdTask.user;
    return createdTask;
  }

  async getAllTask(email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) {
      throw new CustomError('User does not exist', 409, '');
    }
    return await this.taskRepository.getAll(userExist.id);
  }

  async getTaskById(id: number, email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) {
      throw new CustomError('User does not exist', 409, '');
    }
    const task = await this.taskRepository.get(id, userExist.id);
    if (!task) {
      throw new CustomError('Task does not exist', 409, '');
    }
    return task;
  }

  async updateTask(id: number, data: Task, email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) {
      throw new CustomError('User does not exist', 409, '');
    }
    const updatedTask = await this.taskRepository.update(id, data, userExist.id);
    if (!updatedTask) {
      throw new CustomError('Task does not exist', 409, '');
    }
    return updatedTask;
}
}
