"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioController_1.default.obtenerUsuarios);
        this.router.post('/crear', usuarioController_1.default.crearUsuarios);
        this.router.post('/login', usuarioController_1.default.logIn);
        this.router.delete('/:usuarioid', usuarioController_1.default.borrarUsuarios);
        this.router.put('/actualizar/:usuarioid', usuarioController_1.default.actualizarUsuario);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
