import { Request, Response, NextFunction } from "express";

export interface ITaskController {
    create(req: Request, res: Response, next: NextFunction): Promise<any>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<any>;
    getById(req: Request, res: Response, next: NextFunction): Promise<any>;
    update(req: Request, res: Response, next: NextFunction): Promise<any>;
  }
  