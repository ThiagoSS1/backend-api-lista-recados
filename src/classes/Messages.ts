import { v4 as uuidv4 } from 'uuid';

class Messages {
    public id: string;;
    public description: string;
    public details: string;

    constructor(description: string, details: string) {
        this.id = uuidv4();
        this.description = description;
        this.details = details;
    }

    getId() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

    getDetalis() {
        return this.details;
    }

    updateMessage(description: string, details: string): Messages{
        this.description = description;
        this.details = details;
        console.log(this.updateMessage("eu", "vc"))
        return this;
    }


}

export default Messages;


