import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import { ok, serverError } from "../../../../core/presentation/helpers/helpers"; 
import { UserRepository } from "../../infra/repositories/UserRepository";

export class CreateUserController implements Controller {
    async handle(req: Request, res: Response): Promise<any> {
        try {
            const repository = new UserRepository();

            const user = await repository.createUser(req.body);
            console.log(user)
            
            if(!user) console.log("Usuário não encontrado");	

            return ok (res, user); 
        } catch (error: any) {
            return serverError(res, error);
        }
    }
}