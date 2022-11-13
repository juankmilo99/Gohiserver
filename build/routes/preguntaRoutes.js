"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encuestasPreguntasController_1 = __importDefault(require("../controllers/encuestasPreguntasController"));
class PreguntaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', encuestasPreguntasController_1.default.obtenerPreguntas);
        this.router.post('/crear', encuestasPreguntasController_1.default.crearPreguntas);
        this.router.post('/crearv2', encuestasPreguntasController_1.default.crearPreguntas);
        this.router.delete('/:preguntaid', encuestasPreguntasController_1.default.borrarPregunta);
        this.router.put('/actualizar/:preguntaid', encuestasPreguntasController_1.default.actualizarPregunta);
    }
}
const preguntaRoutes = new PreguntaRoutes();
exports.default = preguntaRoutes.router;
