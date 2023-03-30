"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const adminCheck_1 = require("../middleware/adminCheck");
const userExtractor_1 = require("../middleware/userExtractor");
const userRouter = express_1.default.Router();
userRouter.get('/user/:email/:password', user_1.findUserByIdAndPassword); // mirar si hay que pasarl next aqui o estando en finduser ta bien
userRouter.post('/user', user_1.createUser); // mirar si hay que pasarl next aqui o estando en finduser ta bien
userRouter.get('/user/role', userExtractor_1.userExtractor, adminCheck_1.adminCheck, user_1.getRole);
userRouter.delete('/user', userExtractor_1.userExtractor, user_1.deleteUser);
exports.default = userRouter;
