import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from '../controllers/AuthController';

const router = Router();

const authController = container.resolve(AuthController);

router.post(
  '/signup',
  (req, res, next) => authController.signUp(req, res, next)
);
router.post(
  '/signin',
  (req, res, next) => authController.signIn(req, res, next)
);

export = router;
