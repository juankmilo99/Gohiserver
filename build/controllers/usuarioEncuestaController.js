"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class usuarioEncuestaController extends db_manager_1.default {
    obtenerUsuarioEncuesta(req, res) {
        const sql = "SELECT tblusu.usuarioencuestaid, tblusu.encuestadimencionid,tblusu.usuarioid,usu.nombreusuario,dim.nombredimencion FROM tblusuarioencuesta tblusu INNER join tblusuario usu ON usu.usuarioid = tblusu.usuarioid INNER join tblencuestadimencion dim ON dim.encuestadimencionid = tblusu.encuestadimencionid ORDER BY  tblusu.usuarioencuestaid desc";
        return usuarioEncuestaController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearUsuarioEncuesta(req, res) {
        console.log(req.body);
        const parametros = [];
        const { encuestadimencionid, usuarioid } = req.body;
        parametros.push(encuestadimencionid, usuarioid);
        const sql = "INSERT into tblusuarioencuesta (encuestadimencionid,usuarioid) VALUES($1,$2) RETURNING usuarioencuestaid";
        return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    optenerPreguntaEncuesta(req, res) {
        if (!isNaN(Number(req.params.usuarioid))) {
            const codigo = Number(req.params.usuarioid);
            const sql = "SELECT usu.nombreusuario, dim.nombredimencion, preg.pregunta, preg.preguntaid,usu.usuarioid FROM tblusuarioencuesta tblencu INNER join tblencuestadimencion dim ON dim.encuestadimencionid = tblencu.encuestadimencionid INNER join tblpregunta preg ON preg.encuestadimencionid = dim.encuestadimencionid INNER join tblusuario usu ON usu.usuarioid = tblencu.usuarioid WHERE usu.usuarioid = $1 ORDER BY  tblencu.usuarioencuestaid desc";
            const parametros = [codigo];
            return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'select');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    borrarUsuarioEncuesta(req, res) {
        if (!isNaN(Number(req.params.usuarioencuestaid))) {
            const codigo = Number(req.params.usuarioencuestaid);
            const sql = 'DELETE FROM tblusuarioencuesta WHERE usuarioencuestaid = $1';
            const parametros = [codigo];
            return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    actualizarUsuarioEncuesta(req, res) {
        if (!isNaN(Number(req.params.usuarioencuestaid))) {
            const codigo = Number(req.params.usuarioencuestaid);
            const { encuestadimencionid, usuarioid } = req.body;
            const sql = 'UPDATE tblusuarioencuesta SET encuestadimencionid = $1, usuarioid = $2 WHERE usuarioencuestaid = $3 ';
            const parametros = [encuestadimencionid, usuarioid, codigo];
            return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido  '
        }));
    }
}
const encuestaRel = new usuarioEncuestaController;
exports.default = encuestaRel;
