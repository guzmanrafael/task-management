import { Task } from '../models/Task';

export interface ITaskService {
  newTask(task: Task, email: string): Promise<any>;

  getAllTask(email: string): Promise<any>;

  getTaskById(id: number, email: string): Promise<any>;

  updateTask(id: number, data: Task, email: string): Promise<any>;
}
