"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerLogin = void 0;
const express_1 = require("express");
const login_1 = require("../controllers/login");
exports.routerLogin = (0, express_1.Router)();
exports.routerLogin.post('/', (request, response, next) => {
    (0, login_1.login)(request, response, next).catch(err => next(err));
});
