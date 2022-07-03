import { Request, Response, NextFunction } from "express";

export interface IAuthController {
    signUp(req: Request, res: Response, next: NextFunction): Promise<any>;
    signIn(req: Request, res: Response, next: NextFunction): Promise<any>;
  }
  