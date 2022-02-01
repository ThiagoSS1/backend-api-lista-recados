import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { MessageEntity } from "./MessageEntity";



@Entity({ name: 'users' })

export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    uid!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @Column({ name: 'created_at' })
    createdAt?: Date;

    @Column({ name: 'updated_at' })
    updatedAt?: Date;

     @OneToMany((_) => MessageEntity, (entity) => entity.user)
     messages?: Array<MessageEntity>;


    @BeforeInsert()
    private beforeInsert() {
        this.uid = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date();
    }

}
