"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
function notFound(request, response, next) {
    return response.status(404).end();
}
exports.notFound = notFound;
