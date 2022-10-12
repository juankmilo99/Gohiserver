"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class UsuarioRespuestaController extends db_manager_1.default {
    obtenerUsuarioRespuesta(req, res) {
        const sql = "SELECT usuariorespuestaid ,respuestaid, usuarioid FROM tblusuariorespuesta";
        return UsuarioRespuestaController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearUsuarioRespuesta(req, res) {
        console.log(req.body);
        const parametros = [];
        const { respuestaid, usuarioid } = req.body;
        parametros.push(respuestaid, usuarioid);
        const sql = "INSERT into tblusuariorespuesta (respuestaid,usuarioid) VALUES($1,$2) RETURNING usuariorespuestaid";
        return UsuarioRespuestaController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    borrarUsuarioRespuesta(req, res) {
        if (!isNaN(Number(req.params.usuariorespuestaid))) {
            const codigo = Number(req.params.usuariorespuestaid);
            const sql = 'DELETE FROM tblusuariorespuesta WHERE usuariorespuestaid = $1';
            const parametros = [codigo];
            return UsuarioRespuestaController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido'
            }));
        }
    }
    actualizarUsuarioRespuesta(req, res) {
        if (!isNaN(Number(req.params.usuariorespuestaid))) {
            const codigo = Number(req.params.usuariorespuestaid);
            delete req.body.usuariorespuestaid;
            const { respuestaid, usuarioid } = req.body;
            const sql = 'UPDATE tblusuariorespuesta SET respuestaid = $1, usuarioid = $2 WHERE usuariorespuestaid = $3;';
            const parametros = [respuestaid, usuarioid, codigo];
            return UsuarioRespuestaController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido mi perro'
        }));
    }
}
const usuarioRespuestaController = new UsuarioRespuestaController;
exports.default = usuarioRespuestaController;
