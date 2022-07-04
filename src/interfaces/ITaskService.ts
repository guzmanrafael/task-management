import { Task } from '../models/Task';

export interface ITaskService {
  newTask(task: Task, email: string): Promise<any>;

  getAllTask(email: string): Promise<any>;
}
