"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, cpf, age, email) {
        this.transactions = [];
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.age = age;
        this.email = email;
        this.transactions = [];
    }
}
exports.default = User;
