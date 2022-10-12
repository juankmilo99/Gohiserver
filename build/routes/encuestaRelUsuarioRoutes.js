"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ecuestaRelUsuarioController_1 = __importDefault(require("../controllers/ecuestaRelUsuarioController"));
class EncuestaDimRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ecuestaRelUsuarioController_1.default.obtenerEncuestaRel);
        this.router.post('/crear', ecuestaRelUsuarioController_1.default.crearEncuestaRel);
        this.router.delete('/:encuestadimencionid,:usuarioid', ecuestaRelUsuarioController_1.default.borrarEncuestaRel);
        this.router.put('/actualizar/:encuestadimencionid,:usuarioid', ecuestaRelUsuarioController_1.default.actualizarEncuestaRel);
    }
}
const encuestaDimRoutes = new EncuestaDimRoutes();
exports.default = encuestaDimRoutes.router;
