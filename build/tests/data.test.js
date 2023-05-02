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
const data_1 = require("../src/models/data");
const helper_1 = require("./helper");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_1.DataModel.deleteMany({});
    const newDataModel = new data_1.DataModel({
        axes: { axeX: ['uno', 'dos', 'tres'], axeY: ['uno', 'dos', 'cinco', 'tres'] },
        collectionName: 'nombre',
        config: [['uno', 'dos', 'graficoBarras']]
    });
    yield newDataModel.save();
}));
describe('DataModel tests', () => {
    test('initiative response is return as json', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.api.get('/user/correo@gm/prueba')
            .expect(200)
            .expect('Content-type', /application\/json/);
    }));
    test('configFile has to be equal to 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield helper_1.api.get('/data/configFiles');
        expect(response.body.length).toEqual(1);
    }));
    test('configFile has axes', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield helper_1.api.get('/data/axes/nombre');
        expect(response.body.axes.axeX).toContain('uno');
        expect(response.body.axes.axeY).toContain('cinco');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield data_1.DataModel.deleteMany({});
    src_1.server.close();
    mongoose_1.default.connection.close()
        .then(() => console.log('connecition closed succesfuly'))
        .catch((err) => console.error(err));
}));
