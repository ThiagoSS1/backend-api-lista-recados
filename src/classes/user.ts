import {v4 as uuidv4} from 'uuid';
import Messages from "./Messages"

export default class User {
    public id: string = uuidv4();
    public user: string;
    public password: string;
    public repeatPass: string;
    public messages: Array<Messages> = []

    constructor( user: string, password: string, repeatPass: string) {
        this.user = user;
        this.password = password;
        this.repeatPass = repeatPass;
    }

    getUser(): string {
        return this.user;
    }

    getId(): string {
        return this.id;
    }

    getAllMessages(): Messages[] {
        return this.messages
    }

    setMessages(description:string, details: string){
        const msgs = new Messages(description, details);
         this.messages.push(msgs)
     }

    updateMessage(messages: any):void{
        this.messages = messages || [];
    }

}

