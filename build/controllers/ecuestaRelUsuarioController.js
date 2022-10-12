"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class EncuestaRelUsuarioController extends db_manager_1.default {
    obtenerEncuestaRel(req, res) {
        const sql = "SELECT encuestadimencionid ,usuarioid FROM rel_encuesta_usuario";
        return EncuestaRelUsuarioController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearEncuestaRel(req, res) {
        console.log(req.body);
        const parametros = [];
        const { encuestadimencionid, usuarioid } = req.body;
        parametros.push(encuestadimencionid, usuarioid);
        const sql = "INSERT into rel_encuesta_usuario (encuestadimencionid,usuarioid) VALUES($1,$2) RETURNING encuestadimencionid";
        return EncuestaRelUsuarioController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    borrarEncuestaRel(req, res) {
        if (!isNaN(Number(req.params.encuestadimencionid && req.params.usuarioid))) {
            const codigo = Number(req.params.encuestadimencionid);
            const usuarioid = Number(req.params.usuarioid);
            const sql = 'DELETE FROM rel_encuesta_usuario WHERE encuestadimencionid = $1 AND usuarioid = $2 ';
            const parametros = [codigo, usuarioid];
            return EncuestaRelUsuarioController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    actualizarEncuestaRel(req, res) {
        if (!isNaN(Number(req.params.encuestadimencionid && req.params.usuarioid))) {
            const codigo = Number(req.params.encuestadimencionid);
            const codigo2 = Number(req.params.usuarioid);
            const { encuestadimencionid, usuarioid } = req.body;
            const sql = 'UPDATE rel_encuesta_usuario SET encuestadimencionid = $1, usuarioid = $2 WHERE encuestadimencionid = $3 AND usuarioid = $4 ';
            const parametros = [encuestadimencionid, usuarioid, codigo, codigo2];
            return EncuestaRelUsuarioController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido  '
        }));
    }
}
const encuestaRel = new EncuestaRelUsuarioController;
exports.default = encuestaRel;
