import { Task } from '../models/Task';
import { User } from '../models/User';

export interface ITaskRepository {
  create(task: Task, user: User): Promise<Task>;

  getAll(userId: number): Promise<Task[]>;

  get(id: number, userId: number): Promise<Task>;
}
