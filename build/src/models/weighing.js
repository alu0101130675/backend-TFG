"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeighingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const weighingSchema = new mongoose_1.default.Schema({
    weighing: {
        type: Object,
        required: true
    }
});
exports.WeighingModel = mongoose_1.default.model('Ponderacion', weighingSchema);
