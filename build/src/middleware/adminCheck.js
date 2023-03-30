"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCheck = void 0;
const user_1 = require("../models/user");
function adminCheck(request, response, next) {
    const { email, role } = request.body;
    if (role === 'admin') {
        user_1.UserModel.findOne({ email, role }).then((user) => {
            (user != null) ? next() : response.send({ message: 'can not acces' });
        }).catch((err) => next(err));
    }
    else {
        response.send({ message: 'can not acces' });
    }
}
exports.adminCheck = adminCheck;
