import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import TaskController from '../controllers/TaskController';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

const taskController = container.resolve(TaskController);

router.post('/tasks', [verifyToken], (req, res, next) =>
  taskController.create(req, res, next)
);
router.get('/tasks', [verifyToken], (req, res, next) =>
  taskController.getAll(req, res, next)
);

export = router;
