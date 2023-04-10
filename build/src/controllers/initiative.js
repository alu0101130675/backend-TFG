"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInitiative = exports.updateInitiative = exports.getInitiativeByFilter = exports.getInitiative = exports.postInitiative = void 0;
const initiative_1 = require("../models/initiative");
function postInitiative(request, response, next) {
    const body = request.body;
    const initiative = new initiative_1.Initiative(body);
    initiative.save()
        .then(() => response.send({ message: 'innitiative added' })).catch(err => response.send(err));
}
exports.postInitiative = postInitiative;
function getInitiative(request, response, next) {
    initiative_1.Initiative.find({})
        .then((initiatives) => response.send(initiatives)).catch(err => response.send(err));
}
exports.getInitiative = getInitiative;
function getInitiativeByFilter(request, response, next) {
    const params = request.params;
    const validParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== 'Todas'));
    initiative_1.Initiative.find(validParams)
        .then((initiatives) => response.send(initiatives)).catch(err => response.send(err));
}
exports.getInitiativeByFilter = getInitiativeByFilter;
function updateInitiative(request, response, next) {
    const body = request.body;
    const { id, validated, active, initiativeName, link, contacto } = body;
    initiative_1.Initiative.findOneAndUpdate({ _id: id }, { validated, active, initiativeName, link, contacto }, { new: true })
        .then((initiatives) => response.send(initiatives)).catch(err => response.send(err));
}
exports.updateInitiative = updateInitiative;
function deleteInitiative(request, response, next) {
    const body = request.body;
    const { id } = body;
    initiative_1.Initiative.findOneAndRemove({ _id: id })
        .then((res) => response.send({ menssage: res })).catch(err => response.send(err));
}
exports.deleteInitiative = deleteInitiative;
