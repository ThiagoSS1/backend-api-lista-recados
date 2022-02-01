import { Controller } from "../../../../core/presentation/contracts/controllers";
import { Request, Response} from "express";
import { notFound, ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository } from "../../infra/repositories/MessageRepository";

export class GetOneMessageController implements Controller {
    async handle(req: Request, res: Response) {
        try {
            const { uid } = req.params;

            const repository = new MessageRepository();

            const message = await repository.getMessage(uid);
            
            if (!message) return notFound(res);

            return ok(res, message);
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}