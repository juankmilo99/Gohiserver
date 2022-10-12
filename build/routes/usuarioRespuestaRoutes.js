"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRespuestaController_1 = __importDefault(require("../controllers/usuarioRespuestaController"));
class UsuarioRespuestaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioRespuestaController_1.default.obtenerUsuarioRespuesta);
        this.router.post('/crear', usuarioRespuestaController_1.default.crearUsuarioRespuesta);
        this.router.delete('/:usuariorespuestaid', usuarioRespuestaController_1.default.borrarUsuarioRespuesta);
        this.router.put('/actualizar/:usuariorespuestaid', usuarioRespuestaController_1.default.actualizarUsuarioRespuesta);
    }
}
const usuarioRespuestaRoutes = new UsuarioRespuestaRoutes;
exports.default = usuarioRespuestaRoutes.router;
