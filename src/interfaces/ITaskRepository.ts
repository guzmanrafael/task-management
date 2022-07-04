import { Task } from '../models/Task';
import { User } from '../models/User';

export interface ITaskRepository {
  create(task: Task, user: User): Promise<Task>;
}
