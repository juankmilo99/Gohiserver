"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioEncuestaController_1 = __importDefault(require("../controllers/usuarioEncuestaController"));
class usuarioEncuestaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioEncuestaController_1.default.obtenerUsuarioEncuesta);
        this.router.post('/crear', usuarioEncuestaController_1.default.crearUsuarioEncuesta);
        this.router.delete('/:usuarioencuestaid', usuarioEncuestaController_1.default.borrarUsuarioEncuesta);
        this.router.put('/actualizar/:usuarioencuestaid', usuarioEncuestaController_1.default.actualizarUsuarioEncuesta);
        this.router.get('/optenerPregunta/:usuarioid', usuarioEncuestaController_1.default.optenerPreguntaEncuesta);
    }
}
const usuarioencuestaRoutes = new usuarioEncuestaRoutes();
exports.default = usuarioencuestaRoutes.router;
