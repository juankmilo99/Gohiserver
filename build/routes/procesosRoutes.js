"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procesosController_1 = __importDefault(require("../controllers/procesosController"));
class ProcesosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', procesosController_1.default.obtenerProcesos);
        this.router.post('/crear', procesosController_1.default.crearProcesos);
        this.router.post('/correos/:codigo_proceso', procesosController_1.default.agregarCorreos);
        this.router.put('/actualizar/:codigo_proceso', procesosController_1.default.actualizarEstadoProcesos);
        this.router.delete('/:codigo_proceso', procesosController_1.default.borrarProcesos);
    }
}
const procesosRoutes = new ProcesosRoutes();
exports.default = procesosRoutes.router;
