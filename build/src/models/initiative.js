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
        required: true,
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
            message: 'Invalid email address'
        }
    },
    location: {
        type: String,
        required: true
    },
    validated: {
        type: Boolean,
        required: true,
        default: false
    },
    link: String,
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    ComunidadAutonoma: String,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    city: String,
    postCode: Number,
    contact: String,
    road: String,
    initiativeName: {
        type: String,
        required: true
    },
    contacto: String
});
exports.Initiative = mongoose_1.default.model('Iniciativa', userSchema);
