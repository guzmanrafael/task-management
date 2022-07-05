import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from '../controllers/AuthController';

const router = Router();

const authController = container.resolve(AuthController);

/**
 * SignUp User
 * @openapi
 * /api/auth/signup:
 *    post:
 *      tags:
 *        - user
 *      summary: "SignUp User"
 *      description: This endpoint is for registering users.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '400':
 *          description: Invalid Request. Missing or Invalid Body.
 *        '409':
 *          description: User already exists.
 *        '500':
 *          description: Problems with in the Auth repository layer, review the create method.
 * 
 */
router.post(
  '/signup',
  (req, res, next) => authController.signUp(req, res, next)
);

/**
 * SignIn User
 * @openapi
 * /api/auth/signin:
 *    post:
 *      tags:
 *        - user
 *      summary: "SignIp User"
 *      description: This endpoint is for login.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '400':
 *          description: Invalid Request. Missing or Invalid Body.
 *        '409':
 *          description: User does not exist.
 *        '403':
 *          description: Invalid password.
 *        '500':
 *          description: Problems with in the Auth repository layer, review the get method.
 * 
 */
router.post(
  '/signin',
  (req, res, next) => authController.signIn(req, res, next)
);

export = router;
