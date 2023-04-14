"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRouter = void 0;
const express_1 = require("express");
const data_1 = require("../controllers/data");
const adminCheck_1 = require("../middleware/adminCheck");
const userExtractor_1 = require("../middleware/userExtractor");
exports.dataRouter = (0, express_1.Router)();
exports.dataRouter.post('/:collectionName', userExtractor_1.userExtractor, adminCheck_1.adminCheck, data_1.postData);
exports.dataRouter.get('/fileNames', data_1.getFileNames);
exports.dataRouter.get('/configFiles', data_1.getConfigFileNames);
exports.dataRouter.get('/configField/:name/:idFlag?', data_1.getConfigFile);
exports.dataRouter.get('/axes/:name', data_1.getAxes);
exports.dataRouter.get('/dataFile/:name', data_1.getDataByFileName);
exports.dataRouter.delete('/dataFile/:name/:id', userExtractor_1.userExtractor, adminCheck_1.adminCheck, data_1.deleteFiles);
exports.dataRouter.put('/configFiles/:id', userExtractor_1.userExtractor, adminCheck_1.adminCheck, data_1.updateConfigFile);
