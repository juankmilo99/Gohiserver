"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class EncuestaDimController extends db_manager_1.default {
    obtenerEncuestaDim(req, res) {
        const sql = "SELECT encuestadimencionid ,nombredimencion FROM tblencuestadimencion";
        return EncuestaDimController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearEncuestaDim(req, res) {
        console.log(req.body);
        const parametros = [];
        const { nombredimencion } = req.body;
        parametros.push(nombredimencion);
        const sql = "INSERT into tblencuestadimencion (nombredimencion) VALUES($1) RETURNING encuestadimencionid";
        return EncuestaDimController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    borrarEncuestaDim(req, res) {
        if (!isNaN(Number(req.params.encuestadimencionid))) {
            const codigo = Number(req.params.encuestadimencionid);
            const sql = 'DELETE FROM tblencuestadimencion WHERE encuestadimencionid = $1';
            const parametros = [codigo];
            return EncuestaDimController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    actualizarEncuestaDim(req, res) {
        if (!isNaN(Number(req.params.encuestadimencionid))) {
            const codigo = Number(req.params.encuestadimencionid);
            delete req.body.encuestadimencionid;
            const { nombredimencion } = req.body;
            const sql = 'UPDATE tblencuestadimencion SET nombredimencion = $1 WHERE encuestadimencionid = $2;';
            const parametros = [nombredimencion, codigo];
            return EncuestaDimController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido  '
        }));
    }
}
const encuestaDim = new EncuestaDimController;
exports.default = encuestaDim;
