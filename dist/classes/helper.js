"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static getNextId(data) {
        const item = data.reduce((accumulator, currentValue) => {
            if (currentValue.id > accumulator.id) {
                accumulator = currentValue;
            }
            return accumulator;
        });
        return item.id++;
    }
}
exports.default = Helper;
