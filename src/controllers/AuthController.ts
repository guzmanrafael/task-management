import { Request, Response, NextFunction } from "express";
import { autoInjectable } from "tsyringe";
import { IAuthController } from "../interfaces/IAuthController";
import { signinValidation, signupValidation } from "../middlewares/validation";
import { CustomError } from "../models/CustomError";
import AuthService from "../services/AuthService";

@autoInjectable()
export default class AuthController implements IAuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { body } = req;
      const { error } = signupValidation(body);
      if (error) throw new CustomError(error.message, 400, error.name);
      const createdUser = await this.authService.signUp(body);
      res.status(200).json(createdUser);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { body } = req;
      const { error } = signinValidation(body);
      if (error) throw new CustomError(error.message, 400, error.name);
      const creds = await this.authService.signIn(body);
      res.status(200).json(creds);
    } catch (error) {
      next(error);
    }
  }
}
