import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { ok, serverError } from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/UserRepository";
export class LoginUserController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            
            const repository = new UserRepository();

            const users = await repository.login(req.body);
            console.log(users);

            if (!users) return res.status(401).json({ error: 'Usuário não encontrado' });

            if (users.password !== req.body.password) return res.status(401).json({ error: 'Senha incorreta' });

            return ok(res, users)
        } catch (err: any) {
            return serverError(res, err)
        }
    }
}