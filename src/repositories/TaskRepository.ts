import database from '../config/database';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { CustomError } from '../models/CustomError';
import { Task } from '../models/Task';
import { User } from '../models/User';

export default class TaskRepository implements ITaskRepository {
  async create(task: Task, user: User): Promise<Task> {
    try {
      const repository = database.getRepository(Task);
      const taskCreated = repository.create(task);
      taskCreated.user = user;
      return await repository.save(taskCreated);
    } catch (error) {
      throw new CustomError(
        'Problems with in the Task repository layer, review the create method',
        500,
        error
      );
    }
  }

  async getAll(userId: number): Promise<Task[]> {
    try {
      const repository = database.getRepository(Task);

      const tasks = await repository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('user.id = :userId', { userId: userId })
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.status',
          'task.deadline'
        ])
        .getMany();

      return tasks;
    } catch (error) {
      throw new CustomError(
        'Problems with in the Task repository layer, review the getAll method',
        500,
        error
      );
    }
  }

  async get(id: number, userId: number): Promise<Task> {
    try {
      const repository = database.getRepository(Task);
      const task = await repository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('user.id = :userId', { userId: userId })
        .andWhere({ id: id })
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.status',
          'task.deadline',
          'task.comments',
          'task.responsible',
          'task.tags'
        ])
        .getOne();
      return task;
    } catch (error) {
      throw new CustomError(
        'Problems with in the Task repository layer, review the get method',
        500,
        error
      );
    }
  }

  async update(id: number, data: Task, userId: number): Promise<Task> {
    try {
      const repository = database.getRepository(Task);
      await repository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .update(Task)
      .set(data)
      .where('user.id = :userId', { userId: userId })
      .andWhere({ id: id })
      .execute();

      return this.get(id, userId);
    } catch (error) {
      throw new CustomError(
        'Problems with in the Task repository layer, review the update method',
        500,
        error
      );
    }
  }

  async remove(id: number, userId: number): Promise<boolean> {
    try {
      const repository = database.getRepository(Task);
      const task = await this.get(id, userId);
      if (!task) return false;
      await repository.delete(id);
      return true;
    } catch (error) {
      throw new CustomError('Problems with in the repository layer, review the remove method', 500, error);
    }
  }
}
