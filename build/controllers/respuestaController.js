"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class RespuestaController extends db_manager_1.default {
    obtenerRespuesta(req, res) {
        const sql = "SELECT tblres.respuestaid ,tblres.preguntaid, tblres.respuesta, tblres.usuarioid ,usu.nombreusuario,preg.pregunta FROM tblrespuesta tblres INNER join tblusuario usu ON usu.usuarioid = tblres.usuarioid INNER join tblpregunta preg ON preg.preguntaid = tblres.preguntaid ORDER BY  tblres.respuestaid desc";
        return RespuestaController.ejecutarConsulta(sql, [], res, 'select');
    }
    obtenerGrafica(req, res) {
        const sql = "SELECT res.respuesta , count(*) cuenta FROM tblrespuesta res GROUP by res.respuesta HAVING count(*) > 1 ORDER BY res.respuesta";
        return RespuestaController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearRespuesta(req, res) {
        console.log(req.body);
        const parametros = [];
        const { preguntaid, respuesta, usuarioid } = req.body;
        parametros.push(preguntaid, respuesta, usuarioid);
        const sql = "INSERT into tblrespuesta (preguntaid,respuesta,usuarioid) VALUES($1,$2,$3) RETURNING respuestaid";
        return RespuestaController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    validarRespuesta(req, res) {
        const sql = "SELECT pus.preguntaid, pus.respuesta, usu.nombreusuario, usu.usuarioid FROM tblusuariorespuesta res INNER join tblusuario usu ON usu.usuarioid = res.usuarioid INNER join tblrespuesta pus ON pus.respuestaid = res.respuestaid ";
        return RespuestaController.ejecutarConsulta(sql, [], res, 'select');
    }
    borrarRespuesta(req, res) {
        if (!isNaN(Number(req.params.respuestaid))) {
            const codigo = Number(req.params.respuestaid);
            const sql = 'DELETE FROM tblrespuesta WHERE respuestaid = $1';
            const parametros = [codigo];
            return RespuestaController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido'
            }));
        }
    }
    actualizarRespuesta(req, res) {
        if (!isNaN(Number(req.params.respuestaid))) {
            const codigo = Number(req.params.respuestaid);
            delete req.body.respuestaid;
            const { preguntaid, respuesta, usuarioid } = req.body;
            const sql = 'UPDATE tblrespuesta SET preguntaid = $1, respuesta = $2, usuarioid = $3 WHERE respuestaid = $4;';
            const parametros = [preguntaid, respuesta, usuarioid, codigo];
            return RespuestaController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido'
        }));
    }
}
const respuestaController = new RespuestaController;
exports.default = respuestaController;
