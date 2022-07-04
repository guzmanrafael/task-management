import { injectable } from 'tsyringe';
import { TASK_DOES_NOT_EXIST, USER_DOES_NOT_EXIST } from '../commons/errors';
import { ITaskService } from '../interfaces/ITaskService';
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
    if (!userExist) USER_DOES_NOT_EXIST();
    const createdTask = await this.taskRepository.create(task, userExist);
    delete createdTask.user;
    return createdTask;
  }

  async getAllTask(email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) USER_DOES_NOT_EXIST();
    return await this.taskRepository.getAll(userExist.id);
  }

  async getTaskById(id: number, email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) USER_DOES_NOT_EXIST();

    const task = await this.taskRepository.get(id, userExist.id);
    if (!task) TASK_DOES_NOT_EXIST();

    return task;
  }

  async updateTask(id: number, data: Task, email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) USER_DOES_NOT_EXIST();

    const updatedTask = await this.taskRepository.update(
      id,
      data,
      userExist.id
    );
    if (!updatedTask) TASK_DOES_NOT_EXIST();

    return updatedTask;
  }

  async deleteTask(id: number, email: string): Promise<any> {
    const userExist: User = await this.authRepository.get(email);
    if (!userExist) USER_DOES_NOT_EXIST();

    const isDeletedTask = await this.taskRepository.remove(id, userExist.id);
    if (!isDeletedTask) TASK_DOES_NOT_EXIST();
    return isDeletedTask;
  }
}
