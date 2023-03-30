"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExtractor = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function userExtractor(request, response, next) {
    var _a;
    const authorization = (_a = request.get('authorization')) !== null && _a !== void 0 ? _a : '';
    if (authorization.toLocaleLowerCase().startsWith('bearer')) {
        if (process.env.SECRET == null) {
            throw new Error('SECRET is not initialized');
        }
        const token = authorization.substring(7);
        const decodeToken = (0, jsonwebtoken_1.verify)(token, process.env.SECRET);
        if (typeof decodeToken === 'object') {
            request.body.email = decodeToken.email; // add email property to request object
            request.body.role = decodeToken.role;
            next();
        }
    }
}
exports.userExtractor = userExtractor;
