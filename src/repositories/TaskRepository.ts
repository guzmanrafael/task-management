import database from "../config/database";
import { ITaskRepository } from "../interfaces/ITaskRepository";
import { CustomError } from "../models/CustomError";
import { Task } from "../models/Task";
import { User } from "../models/User";

export default class TaskRepository implements ITaskRepository {
  async create(task: Task, user: User): Promise<Task> {
    try {
      const repository = database.getRepository(Task);
      const taskCreated = repository.create(task);
      taskCreated.user = user;
      return await repository.save(taskCreated);
    } catch (error) {
      throw new CustomError('Problems with in the Task repository layer, review the create method', 500, error);
    }
  }
}