export interface IAuthService {
    signUp(body: any): Promise<any>;

    signIn(body: any): Promise<any>;
  }
  