"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encuestasController_1 = __importDefault(require("../controllers/encuestasController"));
class EncuestaDimRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', encuestasController_1.default.obtenerEncuestaDim);
        this.router.post('/crear', encuestasController_1.default.crearEncuestaDim);
        this.router.delete('/:encuestadimencionid', encuestasController_1.default.borrarEncuestaDim);
        this.router.put('/actualizar/:encuestadimencionid', encuestasController_1.default.actualizarEncuestaDim);
    }
}
const encuestaDimRoutes = new EncuestaDimRoutes();
exports.default = encuestaDimRoutes.router;
