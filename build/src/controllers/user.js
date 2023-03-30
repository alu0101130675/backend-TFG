"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getRole = exports.createUser = exports.findUserByIdAndPassword = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const findUserByIdAndPassword = (req, res, next) => {
    const user = req.params;
    user_1.UserModel.findOne(user)
        .then(user => {
        user != null
            ? res.send(user)
            : res.send({ response: 'it is not in database' });
    })
        .catch(err => next(err));
};
exports.findUserByIdAndPassword = findUserByIdAndPassword;
const createUser = (req, res, next) => {
    const body = req.body;
    const { email, password } = body;
    const saltrounds = 10;
    bcrypt_1.default.hash(password, saltrounds)
        .then(passwordHash => {
        const newUser = new user_1.UserModel({ email, password: passwordHash });
        newUser.save().then(() => res.send('succes')).catch(err => next(err));
    }).catch(err => next(err));
};
exports.createUser = createUser;
const getRole = (req, res, next) => {
    res.send({ message: 'admin' });
};
exports.getRole = getRole;
function deleteUser(request, response, next) {
    const body = request.body;
    const { id } = body;
    user_1.UserModel.findOneAndRemove({ _id: id })
        .then((res) => response.send({ menssage: res })).catch(err => response.send(err));
}
exports.deleteUser = deleteUser;
