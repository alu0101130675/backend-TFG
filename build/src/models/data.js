"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    collectionName: {
        type: String,
        unique: true,
        required: true
    },
    config: {
        type: Array,
        required: true
    }
});
exports.DataModel = mongoose_1.default.model('DataSettings', dataSchema);
