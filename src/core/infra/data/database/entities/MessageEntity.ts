import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
  } from "typeorm";
import { v4 as uuid } from "uuid";
import { UserEntity } from "./UserEntity";

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity {

    @PrimaryColumn()
    uid!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;


    @Column({ name: "uid_user" })
    uidUser!: string;

    @Column({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne((_) => UserEntity, user => user.messages)
    @JoinColumn({ name: "uid_user", referencedColumnName: "uid" })
    user?: UserEntity

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


