"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class PreguntaController extends db_manager_1.default {
    obtenerPregunta(req, res) {
        const sql = "SELECT tblpreg.preguntaid,dim.nombredimencion,tblpreg.pregunta,tblpreg.encuestadimencionid  FROM tblpregunta tblpreg INNER join tblencuestadimencion dim ON dim.encuestadimencionid = tblpreg.encuestadimencionid ORDER BY  tblpreg.preguntaid desc";
        return PreguntaController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearPregunta(req, res) {
        console.log(req.body);
        const parametros = [];
        const { encuestadimencionid, pregunta } = req.body;
        parametros.push(encuestadimencionid, pregunta);
        const sql = "INSERT into tblpregunta (encuestadimencionid,pregunta) VALUES($1,$2) RETURNING preguntaid";
        return PreguntaController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    borrarPregunta(req, res) {
        if (!isNaN(Number(req.params.preguntaid))) {
            const codigo = Number(req.params.preguntaid);
            const sql = 'DELETE FROM tblpregunta WHERE preguntaid = $1';
            const parametros = [codigo];
            return PreguntaController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido'
            }));
        }
    }
    actualizarPregunta(req, res) {
        if (!isNaN(Number(req.params.preguntaid))) {
            const codigo = Number(req.params.preguntaid);
            delete req.body.preguntaid;
            const { encuestadimencionid, pregunta } = req.body;
            const sql = 'UPDATE tblpregunta SET encuestadimencionid = $1, pregunta = $2 WHERE preguntaid = $3;';
            const parametros = [encuestadimencionid, pregunta, codigo];
            return PreguntaController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido'
        }));
    }
}
const preguntaController = new PreguntaController;
exports.default = preguntaController;
