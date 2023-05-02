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
const initiative_1 = require("../src/models/initiative");
const helper_1 = require("./helper");
describe('initiative tests', () => {
    test('creating a new initiative', () => __awaiter(void 0, void 0, void 0, function* () {
        yield initiative_1.Initiative.deleteMany({});
        const newInitiative = new initiative_1.Initiative({ latitude: 12132, location: 'example Locarion', ComunidadAutonoma: 'canarias', email: 'prueba@gmail.com' });
        const result = yield newInitiative.save();
        console.log(result);
    }));
    test('initiative response is return as json', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.api.get('/user/correo@gm/prueba')
            .expect(200)
            .expect('Content-type', /application\/json/);
    }));
    test(' is return as json', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield helper_1.api.get('/user/correo@gm/1234');
        expect(response.body).toEqual({ response: 'it is not in database' });
    }));
    test('Intiatives has to be equal to 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield helper_1.api.get('/initiative');
        expect(response.body.length).toEqual(1);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initiative_1.Initiative.deleteMany({});
    src_1.server.close();
    mongoose_1.default.connection.close()
        .then(() => console.log('connecition closed succesfuly'))
        .catch((err) => console.error(err));
}));
