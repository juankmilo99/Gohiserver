"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class PreguntaController extends db_manager_1.default {
    obtenerPreguntas(req, res) {
        const sql = "SELECT * FROM public.tbl_encuestas_preguntas   ORDER BY codigo desc ";
        return PreguntaController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearPreguntas(req, res) {
        let sql = '';
        const promises = [];
        const preguntas = req.body;
        preguntas.forEach((infoPregunta) => {
            const { codigo_encuesta, codigo_dimension, pregunta } = infoPregunta;
            const parametros = [];
            parametros.push(codigo_encuesta, codigo_dimension, pregunta);
            sql = `INSERT into tbl_encuestas_preguntas (codigo_encuesta, codigo_dimension, pregunta) VALUES($1,$2,$3) RETURNING codigo`;
            promises.push(PreguntaController.ejecutarConsulta(sql, parametros, res, 'insert-multiple'));
        });
        res.status(200).json({
            'mensaje': 'Registro creado'
        });
        return Promise.all(promises);
    }
    borrarPregunta(req, res) {
        if (!isNaN(Number(req.params.codigo_encuesta))) {
            const codigo = Number(req.params.codigo_encuesta);
            const sql = 'DELETE FROM tbl_encuestas_preguntas WHERE codigo = $1';
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
