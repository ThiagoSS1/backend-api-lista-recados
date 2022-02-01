import { Router } from 'express';
import { CreateUserController } from "../controllers/create-user.controller";
import { GetOneUserController } from '../controllers/get-one-user.controller';
import { LoginUserController } from '../controllers/login-user.controller';

export default class UserRoutes {
    public init(): Router {
      const routes = Router();
  
      routes.post("/users", new CreateUserController().handle);
      routes.get("/users/:uid", new GetOneUserController().handle);
      routes.post("/login", new LoginUserController().handle);
      console.log("UserRoutes");	
      return routes;
    }
  }