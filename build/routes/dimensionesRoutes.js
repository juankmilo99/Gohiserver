"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dimensionesController_1 = __importDefault(require("../controllers/dimensionesController"));
class DimensionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', dimensionesController_1.default.obtenerDimensiones);
        this.router.post('/crear', dimensionesController_1.default.crearDimensiones);
    }
}
const dimensionesRoutes = new DimensionesRoutes();
exports.default = dimensionesRoutes.router;
