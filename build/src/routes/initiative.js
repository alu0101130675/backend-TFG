"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiativeRouter = void 0;
const express_1 = __importDefault(require("express"));
const initiative_1 = require("../controllers/initiative");
const adminCheck_1 = require("../middleware/adminCheck");
const userExtractor_1 = require("../middleware/userExtractor");
exports.initiativeRouter = express_1.default.Router();
exports.initiativeRouter.post('/', userExtractor_1.userExtractor, initiative_1.postInitiative);
exports.initiativeRouter.get('/', initiative_1.getInitiative);
exports.initiativeRouter.get('/:ComunidadAutonoma/:active?', initiative_1.getInitiativeByFilter); // mirar si hay que pasarl next aqui o estando en finduser ta bien
exports.initiativeRouter.delete('/', userExtractor_1.userExtractor, adminCheck_1.adminCheck, initiative_1.deleteInitiative);
exports.initiativeRouter.patch('/', userExtractor_1.userExtractor, adminCheck_1.adminCheck, initiative_1.updateInitiative);
