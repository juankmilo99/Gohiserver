"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encuestaDimController_1 = __importDefault(require("../controllers/encuestaDimController"));
class EncuestaDimRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', encuestaDimController_1.default.obtenerEncuestaDim);
        this.router.post('/crear', encuestaDimController_1.default.crearEncuestaDim);
        this.router.delete('/:encuestadimencionid', encuestaDimController_1.default.borrarEncuestaDim);
        this.router.put('/actualizar/:encuestadimencionid', encuestaDimController_1.default.actualizarEncuestaDim);
    }
}
const encuestaDimRoutes = new EncuestaDimRoutes();
exports.default = encuestaDimRoutes.router;
