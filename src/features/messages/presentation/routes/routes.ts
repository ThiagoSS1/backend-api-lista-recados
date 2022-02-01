import { Router } from 'express';
import { CreateMessageController } from "../controllers/create-message.controller";
import { DeleteMessageController } from "../controllers/deleteMessageController";
import { GetAllMessageController } from '../controllers/getAllMessageController';
import { GetOneMessageController } from '../controllers/getOneMessageController';
import { UpdateMessageController } from '../controllers/updateMessageController';

export default class MessageRoutes {
    public init(): Router {
      const routes = Router();
  
      routes.post("/messages", new CreateMessageController().handle);
      routes.put("/messages/:uid", new UpdateMessageController().handle);
      routes.get("/messages/:uid", new GetOneMessageController().handle);
      routes.get("/messages", new GetAllMessageController().handle);
      routes.delete("/messages", new DeleteMessageController().handle);
  
      return routes;
    }
  }