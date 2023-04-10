"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const handleErrors_1 = require("./middleware/handleErrors");
const notFound_1 = require("./middleware/notFound");
const mongo_1 = require("./mongo");
const initiative_1 = require("./routes/initiative");
const login_1 = require("./routes/login");
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./routes/data");
dotenv_1.default.config();
const { PORT } = process.env;
(0, mongo_1.connectionDB)();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json({ limit: '10mb' })); // middleware que transforma la requestAnimationFrame.boy a un json
exports.app.use('/', user_1.default);
exports.app.use('/login', login_1.routerLogin);
exports.app.use('/initiative', initiative_1.initiativeRouter);
exports.app.use('/data', data_1.dataRouter);
exports.app.use(notFound_1.notFound);
// manejo de errores
exports.app.use(handleErrors_1.handleError);
exports.server = exports.app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
