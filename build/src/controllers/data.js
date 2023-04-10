"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfigFile = exports.deleteFiles = exports.getConfigFileNames = exports.getDataByFileName = exports.getConfigFile = exports.getFileNames = exports.postData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const data_1 = require("../models/data");
function postData(request, response, next) {
    const body = request.body;
    const { collectionName } = request.params;
    const { documentData, config } = body;
    const dataSettings = new data_1.DataModel({ collectionName, config });
    dataSettings.save()
        .then(() => {
        const thingSchema = new mongoose_1.Schema({}, { strict: false, autoIndex: false, _id: false });
        const Data = mongoose_1.default.model(collectionName, thingSchema, collectionName);
        const documentsToInsert = documentData.map((row) => {
            const document = new Data(row);
            return document;
        });
        Data.bulkSave(documentsToInsert).then((d) => response.send(d)).catch(err => next(err));
    }).catch(err => next(err));
}
exports.postData = postData;
function getFileNames(request, response, next) {
    data_1.DataModel.find().select('collectionName -_id')
        .then((d) => response.send(d))
        .catch(err => next(err));
}
exports.getFileNames = getFileNames;
function getConfigFile(request, response, next) {
    const name = request.params.name;
    const idFlag = request.params.idFlag;
    if (idFlag === 'true') {
        data_1.DataModel.findOne({ collectionName: name })
            .then((d) => response.send(d))
            .catch(err => next(err));
    }
    else {
        data_1.DataModel.findOne({ collectionName: name }).select('config -_id')
            .then((d) => response.send(d))
            .catch(err => next(err));
    }
}
exports.getConfigFile = getConfigFile;
function getDataByFileName(request, response, next) {
    const name = request.params.name;
    mongoose_1.default.connection.collection(name, { strict: true })
        .find({}, { projection: { _id: 0 } })
        .toArray()
        .then(documents => response.send(documents))
        .catch(err => next(err));
}
exports.getDataByFileName = getDataByFileName;
function getConfigFileNames(request, response, next) {
    data_1.DataModel.find({}).then(d => response.send(d)).catch((e) => next(e));
}
exports.getConfigFileNames = getConfigFileNames;
function deleteFiles(request, response, next) {
    const name = request.params.name;
    const id = request.params.id;
    data_1.DataModel.findByIdAndDelete(id)
        .then(() => {
        mongoose_1.default.connection.dropCollection(name)
            .then((res) => {
            mongoose_1.default.connection.deleteModel(name);
            response.send({ message: 'deleted successfuly' });
        })
            .catch(e => next(e));
    }).catch(e => next(e));
}
exports.deleteFiles = deleteFiles;
function updateConfigFile(request, response, next) {
    const id = request.params.id;
    const body = request.body;
    data_1.DataModel.findByIdAndUpdate(id, { config: body })
        .then((d) => response.send(d))
        .catch(e => next(e));
}
exports.updateConfigFile = updateConfigFile;
