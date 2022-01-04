import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid'
import User from './classes/user'
import Messages from './classes/Messages';
import cors from "cors"
import 'dotenv/config'


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000

const users: Array<any> = []

app.listen(port, () => {
    console.log(`Servidor rodando na Porta:${port}`)
})

app.get("/", (request, response) => {
    return response.send(` <body style='margin:0;padding:0'>
    <div style='display: flex;justify-content: center;align-items: center; align-content: center;width:99vw;height:99vh'>
      <h1 style='font-size:60px;font-weigth:600'> API Recados</h1>
    </div>
</body>`);
})

app.get("/users", (request: Request, response: Response) => {

    return response.json( 
        users  
    );
})

// Retornando usuario pelo id
app.get("/users/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const user = users.find(user => user.id === id)

    if (!user) {
        return response.status(404).json({
            message: "User not found"
        })
    }
    return response.json(
        user
    )
        
})

app.post("/login", (request: Request, response: Response) => {
    const {user, password} = request.body;

    const userExists = users.find(myUser => myUser.user === user && myUser.password === password)
    
    console.log(userExists)
    if(!userExists){
       return response.status(404).json({
              message: "Usuario ou senha incorreta"
       }) 
    }

    return response.status(200).send(userExists)
})

// Retornando todas as mensagem de um usuario
app.get("/message/:id", (request: Request, response: Response) => {
    const { id } = request.params;

    const userIndex = users.findIndex(user => user.id === id)
    console.log(users[userIndex])
    return response.status(200).json({
        message: "message found",
        data: users[userIndex].messages
    })

})

// adicionando um usuario 
app.post("/users", (request: Request, response: Response) => {
    const { name, password, repeatPass } = request.body;
    let isValid: boolean = true;

    // validando se os campos recebidos nao vieram em branco 
    if (!name || !password || !repeatPass) {
        isValid = false;
    }

    // validando se o nome ja esta cadastrado
    if (users.find(user => user.name === name)) {
        isValid = false;
    }

    if (!isValid) {
        return response.status(400).json({
            message: "Dados Invalidos"
        })
    }

    const user = new User(name, password, repeatPass)
    users.push(
        user
    )

    return response.status(201).send()

})

app.post("/users/:id/message", (request: Request, response: Response) => {
    const { id } = request.params;
    const { description, details } = request.body;
    const userIndex = users.findIndex(user => user.id === id)

    const message = users[userIndex].setMessages(description, details);

    return response.status(200).json({
        message: "message saved successfully",
        data: message
    });

})

app.delete("/users/:id/message/:idMessage", (request: Request, response: Response) => {

    const { id, idMessage } = request.params
    const indexUser = users.findIndex(user => user.id === id)

    if (indexUser < 0) {
        return response.status(404).json({
            message: "User not found"
        })
    }
    const messages = users[indexUser].getAllMessages()
    const messageIndex = messages.findIndex((message: Messages) => message.id === idMessage)
    messages.splice(messageIndex, 1)

    return response.sendStatus(204)
})

app.put("/users/:id/message/:idMessage", (request: Request, response: Response) => {
    const { description, details, data } = request.body;

    let newDescription = description || data.getDescription();
    let newDetails = details || data.getDetails();

    const thisMessage = data.updateMessage(newDescription, newDetails);


    return response.json({
        messagem: "updated message successfully",
        data: thisMessage
    })

})




