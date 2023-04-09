"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initiative = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        require: true,
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
            message: 'Invalid email address'
        }
    },
    location: {
        type: String,
        require: true
    },
    validated: {
        type: Boolean,
        require: true,
        default: false
    },
    link: String,
    active: {
        type: Boolean,
        require: true,
        default: false
    },
    ComunidadAutonoma: String,
    latitude: Number,
    longitude: Number,
    city: String,
    postCode: Number,
    contact: String,
    road: String,
    initiativeName: {
        type: String,
        require: true
    },
    contacto: String
});
exports.Initiative = mongoose_1.default.model('Iniciativa', userSchema);
