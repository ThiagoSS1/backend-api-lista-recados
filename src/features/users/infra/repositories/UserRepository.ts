import { User } from "../../domain/models/User";
import { UserEntity } from "../../../../core/infra/data/database/entities/UserEntity";

interface UserParams { //Duvidas quais propriedades devem ser passadas para o repositorio?
    uid?: string;
    name: string;
    password: string;
}


export class UserRepository {

    async createUser(data: UserParams): Promise<User> {

        const userEntity = UserEntity.create({
            name: data.name,
            password: data.password,
        });

        await userEntity.save();

        return this.mapperFromEntityToModel(userEntity);
    }


    async getUser(uid: string): Promise<User | undefined> {

        const userEntity = await UserEntity.findOne(uid);

        if (!userEntity) return undefined;

        return this.mapperFromEntityToModel(userEntity);
    }

    async login(data: UserParams): Promise<User | undefined> {

        const userEntity = await UserEntity.create({
            name: data.name,
            password: data.password,

        });

        const verifyName = await UserEntity.findOne({
            where: { name: data.name}
        })

        if (verifyName) throw new Error("Usuário já existe");

        if (!userEntity) return undefined;

        return this.mapperFromEntityToModel(userEntity);
    }

    private mapperFromEntityToModel(entity: UserEntity): User {
        return {
            uid: entity.uid,
            name: entity.name,
            password: entity.password,

        }
    }

}
