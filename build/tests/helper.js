"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const supertest = require("supertest");
const src_1 = require("../src");
exports.api = supertest(src_1.app);
