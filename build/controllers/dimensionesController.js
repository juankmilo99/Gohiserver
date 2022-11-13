"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class DimensionesController extends db_manager_1.default {
    obtenerDimensiones(req, res) {
        const sql = "SELECT * FROM public.tbl_dimensiones  ORDER BY codigo asc ";
        return DimensionesController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearDimensiones(req, res) {
        const parametros = [];
        const { nombre } = req.body;
        parametros.push(nombre);
        const sql = "INSERT into tbl_dimensiones (nombre) VALUES($1) RETURNING codigo";
        return DimensionesController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
}
const dimensionesCon = new DimensionesController;
exports.default = dimensionesCon;
