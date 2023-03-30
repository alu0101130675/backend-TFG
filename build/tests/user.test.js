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
const mongoose_1 = __importDefault(require("mongoose"));
const src_1 = require("../src");
const user_1 = require("../src/models/user");
const helper_1 = require("./helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('user tests', () => {
    test('response is return as json', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.api.get('/user/correo@gm/1234')
            .expect(200)
            .expect('Content-type', /application\/json/);
    }));
    test('response is return as json', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield helper_1.api.get('/user/correo@gm/1234');
        expect(response.body).toEqual({ response: 'it is not in database' });
    }));
    test('creating a new user', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield user_1.UserModel.deleteMany({});
            const saltRounds = 10;
            const passwordHash = yield bcrypt_1.default.hash('prueba', saltRounds);
            const newUser = new user_1.UserModel({ email: 'email@gmail.com', password: passwordHash });
            yield newUser.save();
        }));
    });
});
afterAll(() => {
    src_1.server.close();
    mongoose_1.default.connection.close()
        .then(() => console.log('connecition closed succesfuly'))
        .catch((err) => console.error(err));
});
