import { Controller } from "../../../../core/presentation/contracts/controllers";
import {Request, Response} from "express";
import { notFound, serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository } from "../../infra/repositories/MessageRepository";

export class DeleteMessageController implements Controller {

    async handle(req: Request, res: Response) {
        try {
            const { uid } = req.params;

            const respository = new MessageRepository();

            const message = await respository.deleteMessage(uid);
            
            if (!message) return notFound(res)

        } catch (error: any) {
            return serverError(res,error);
        }

    }
}