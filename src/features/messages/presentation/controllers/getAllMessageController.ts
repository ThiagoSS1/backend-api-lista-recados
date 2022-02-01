import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository } from "../../infra/repositories/MessageRepository";

export class GetAllMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new MessageRepository();

      const message = await repository.getMessages();

      if (message.length === 0) return notFound(res);

      return ok(res, message)
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}



