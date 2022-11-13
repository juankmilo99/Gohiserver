"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encuestasController_1 = __importDefault(require("../controllers/encuestasController"));
class EncuestasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', encuestasController_1.default.obtenerEncuestas);
        this.router.post('/info/:codigo_encuesta', encuestasController_1.default.obtenerEncuestasInfo);
        this.router.post('/uuid/:uuid', encuestasController_1.default.obtenerEncuestasUuid);
        this.router.get('/opciones', encuestasController_1.default.obtenerOpciones);
        this.router.post('/diligenciar', encuestasController_1.default.diligenciarEncuesta);
        this.router.post('/crear', encuestasController_1.default.crearEncuestas);
        this.router.delete('/:codigo_encuesta', encuestasController_1.default.borrarEncuesta);
        this.router.put('/actualizar/:codigo_encuesta', encuestasController_1.default.actualizarEstadoEncuestas);
    }
}
const encuestasRoutes = new EncuestasRoutes();
exports.default = encuestasRoutes.router;
