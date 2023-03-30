"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
// A lo mejor hay que aplicar un try catch aqui en el bcryp compares, mirar como que otra vez con promises
function login(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = request.body;
        const { email, password } = body;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            // A LO MEJOR AQUI HAY QUE COMPROBAR SI VIENE UN STRING O NO PORQUE CON NUBER U OTROS HAY QUE MIRAR QUE HACE EL SERVER
            if (user == null) {
                response.send({ message: 'incorrect password or user ' });
                return;
            }
            else {
                const correctPassword = yield bcrypt_1.default.compare(password, user.password);
                if (correctPassword) {
                    const tokenForUser = { email: user.email, role: user.role };
                    if (process.env.SECRET != null) {
                        const token = (0, jsonwebtoken_1.sign)(tokenForUser, process.env.SECRET);
                        const logedUser = { token, role: user.role };
                        response.send(logedUser);
                        return;
                    }
                    else
                        throw new Error('SECRET is not initialized');
                }
                response.send({ message: 'incorrect password or user ' });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
