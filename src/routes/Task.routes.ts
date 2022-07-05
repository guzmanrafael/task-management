import 'reflect-metadata';
import { Router } from 'express';
import { container } from 'tsyringe';
import TaskController from '../controllers/TaskController';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

const taskController = container.resolve(TaskController);

/**
 * Create Task
 * @openapi
 * /api/tasks:
 *    post:
 *      tags:
 *        - task
 *      summary: "Create Task"
 *      description: This endpoint is for create tasks.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/task"
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '400':
 *          description: Invalid Request. Missing or Invalid Body.
 *        '409':
 *          description: User does not exist.
 *        '500':
 *          description: Problems with in the Auth or Task repository layer, review the get or create method.
 *      security:
 *        - bearerAuth: []
 */
router.post('/tasks', [verifyToken], (req, res, next) =>
  taskController.create(req, res, next)
);

/**
 * Get All Task
 * @openapi
 * /api/tasks:
 *    get:
 *      tags:
 *        - task
 *      summary: "Get All Task"
 *      description: This endpoint is for get All tasks.
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '409':
 *          description: User does not exist.
 *        '500':
 *          description: Problems with in the Auth or Task repository layer, review the get or create method.
 *      security:
 *        - bearerAuth: []
 */
router.get('/tasks', [verifyToken], (req, res, next) =>
  taskController.getAll(req, res, next)
);

/**
 * Get Task
 * @openapi
 * /api/tasks/{taskId}:
 *    get:
 *      tags:
 *        - task
 *      summary: "Get Task"
 *      description: This endpoint is for get task.
 *      parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: Numeric ID of the task to retrieve.
 *         schema:
 *           type: integer
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '400':
 *          description: Invalid Request. Missing or Invalid Body.
 *        '409':
 *          description: User or Task does not exist.
 *        '500':
 *          description: Problems with in the Auth or Task repository layer, review the get or create method.
 *      security:
 *        - bearerAuth: []
 */
router.get('/tasks/:taskId', [verifyToken], (req, res, next) =>
  taskController.getById(req, res, next)
);

/**
 * Update Task
 * @openapi
 * /api/tasks/{taskId}:
 *    put:
 *      tags:
 *        - task
 *      summary: "Update Task"
 *      description: This endpoint is for update tasks.
 *      parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: Numeric ID of the task to retrieve.
 *         schema:
 *           type: integer
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/task"
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '400':
 *          description: Invalid Request. Missing or Invalid Body.
 *        '409':
 *          description: User or Task does not exist.
 *        '500':
 *          description: Problems with in the Auth or Task repository layer, review the get or create method.
 *      security:
 *        - bearerAuth: []
 */
router.put('/tasks/:taskId', [verifyToken], (req, res, next) =>
  taskController.update(req, res, next)
);

/**
 * Delete Task
 * @openapi
 * /api/tasks/{taskId}:
 *    delete:
 *      tags:
 *        - task
 *      summary: "Delete Task"
 *      description: This endpoint is for delete tasks.
 *      parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: Numeric ID of the task to retrieve.
 *         schema:
 *           type: integer
 *      responses:
 *        '200':
 *          description: Successful response.
 *        '400':
 *          description: Invalid Request. Missing or Invalid Body.
 *        '409':
 *          description: User or Task does not exist.
 *        '500':
 *          description: Problems with in the Auth or Task repository layer, review the get or create method.
 *      security:
 *        - bearerAuth: []
 */
router.delete('/tasks/:taskId', [verifyToken], (req, res, next) =>
  taskController.remove(req, res, next)
);

export = router;
