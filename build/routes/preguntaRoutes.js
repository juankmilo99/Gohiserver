"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preguntaController_1 = __importDefault(require("../controllers/preguntaController"));
class PreguntaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', preguntaController_1.default.obtenerPregunta);
        this.router.post('/crear', preguntaController_1.default.crearPregunta);
        this.router.delete('/:preguntaid', preguntaController_1.default.borrarPregunta);
        this.router.put('/actualizar/:preguntaid', preguntaController_1.default.actualizarPregunta);
    }
}
const preguntaRoutes = new PreguntaRoutes();
exports.default = preguntaRoutes.router;
