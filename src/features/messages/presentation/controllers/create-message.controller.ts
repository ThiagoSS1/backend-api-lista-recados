import { Request, Response } from "express";

import { Controller } from "../../../../core/presentation/contracts/controllers";
import { ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository } from "../../infra/repositories/MessageRepository";

export class CreateMessageController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const repository = new MessageRepository();

            const message = await repository.createMessage(req.body);

            if (!message) console.error("Mensagem não encontrada");

            return ok(res, message);
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}