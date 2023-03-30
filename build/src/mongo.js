"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectionDB() {
    const { MONGO_DB_URI_TEST, MONGO_DB_URI, NODE_ENV } = process.env;
    if (MONGO_DB_URI_TEST != null && MONGO_DB_URI != null) {
        const connectionString = NODE_ENV === 'test'
            ? MONGO_DB_URI_TEST
            : MONGO_DB_URI;
        mongoose_1.default.connect(connectionString).then(() => {
            console.log('connected');
        }).catch(err => console.log(err));
    }
    else {
        console.error('Environment variables MONGO_DB_URI and/or MONGO-DB-URI-TEST not defined');
    }
}
exports.connectionDB = connectionDB;
