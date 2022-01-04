"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./classes/user"));
const transaction_1 = __importDefault(require("./classes/transaction"));
const helper_1 = __importDefault(require("./classes/helper"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
const port = process.env.PORT || 5000;
const users = [];
app.listen(port, () => {
    console.log(`Servidor rodando na Porta:${port}`);
});
app.get("/", (request, response) => {
    return response.send('OK');
});
app.get("/users", (request, response) => {
    return response.json(users.map(user => {
        return {
            id: user.id,
            name: user.name,
            age: user.age,
            cpf: user.cpf,
            email: user.email
        };
    }));
});
app.get("/users/:id", (request, response) => {
    const { id } = request.params;
    const user = users.find(user => user.id === Number(id));
    if (!user) {
        return response.status(404).json({
            message: "User not found"
        });
    }
    return response.json({
        id: user.id,
        name: user.name,
        age: user.age,
        cpf: user.cpf,
        email: user.email
    });
});
app.post("/users", (request, response) => {
    const { name, cpf, email, age } = request.body;
    let isValid = true;
    // validando se os campos recebidos nao vieram em branco 
    if (!name || !cpf || !email || !age) {
        isValid = false;
    }
    // validando se o cpf ja esta cadastrado
    if (users.find(user => user.cpf === cpf)) {
        isValid = false;
    }
    if (!isValid) {
        return response.status(400).json({
            message: "Dados Invalidos"
        });
    }
    // buscando os ids e fazendo uma verificacao, se ja tiver algum dado, vai buscar o proximo id.
    const id = users.length > 0 ? helper_1.default.getNextId(users) : 1;
    const user = new user_1.default(id, name, cpf, age, email);
    users.push(user);
    return response.json(user);
});
app.delete("/users/:id", (request, response) => {
    const { id } = request.params;
    const index = users.findIndex(user => user.id === Number(id));
    if (index < 0) {
        return response.status(404).json({
            message: "User not found"
        });
    }
    users.splice(index, 1);
    return response.sendStatus(204);
});
app.put("/users/:id", (request, response) => {
    const { name, cpf, email, age } = request.body;
    const { id } = request.params;
    const user = users.find(user => user.id === Number(id));
    if (!user) {
        return response.status(404).json({
            message: "User not found"
        });
    }
    user.name = name;
    user.cpf = cpf;
    user.email = email;
    user.age = age;
    return response.json(user);
});
app.post("/users/:id/transactions", (request, response) => {
    const { id } = request.params;
    const { title, value, type } = request.body;
    const user = users.find(user => user.id === Number(id));
    if (!title || !value || !type) {
        return response.status(404).json({
            message: "Dados Invalidos"
        });
    }
    if (!user) {
        return response.status(404).json({
            message: "User not found"
        });
    }
    const transactionId = user.transactions.length > 0 ? helper_1.default.getNextId(user.transactions) : 1;
    const transactions = new transaction_1.default(transactionId, title, value, type);
    user.transactions.push(transactions);
    return response.json(transactions);
});
app.get("/user/:userId/transactions/:id", (request, response) => {
    // buscando usuário através do ID
    const { userId, id } = request.params;
    const user = users.find(user => user.id === Number(userId));
    //verificando se o usuário existe    
    if (!user) {
        return response.status(404).json({
            message: "User not found"
        });
    }
    const transaction = user.transactions.find((transactions) => transactions.id === Number(id));
    if (!transaction) {
        return response.status(404).json({
            message: "Transaction not found"
        });
    }
    return response.json(transaction);
});
app.get("/users/:id/transactions", (request, response) => {
    const { id } = request.params;
    const user = users.find(user => user.id === Number(id));
    if (!user) {
        return response.status(404).json({
            message: "User not found"
        });
    }
    let income = 0;
    let outcome = 0;
    user.transactions.forEach(((transactions) => {
        if (transactions.type === "income") {
            income += transactions.value;
        }
        else {
            outcome += transactions.value;
        }
    }));
    return response.json({
        transactions: user.transactions,
        balance: {
            income: income,
            outcome: outcome,
            total: income - outcome
        }
    });
});
