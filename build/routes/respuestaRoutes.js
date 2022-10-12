"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const respuestaController_1 = __importDefault(require("../controllers/respuestaController"));
class RespuestaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', respuestaController_1.default.obtenerRespuesta);
        this.router.post('/crear', respuestaController_1.default.crearRespuesta);
        this.router.get('/validar', respuestaController_1.default.validarRespuesta);
        this.router.get('/grafica', respuestaController_1.default.obtenerGrafica);
        this.router.delete('/:respuestaid', respuestaController_1.default.borrarRespuesta);
        this.router.put('/actualizar/:respuestaid', respuestaController_1.default.actualizarRespuesta);
    }
}
const respuestaRoutes = new RespuestaRoutes();
exports.default = respuestaRoutes.router;
