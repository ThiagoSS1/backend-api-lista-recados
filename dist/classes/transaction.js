"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(id, title, value, type) {
        this.id = id;
        this.title = title;
        this.value = value;
        this.type = type;
    }
}
exports.default = Transaction;
