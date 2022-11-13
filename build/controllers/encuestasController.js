"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class EncuestasController extends db_manager_1.default {
    obtenerEncuestas(req, res) {
        const sql = "SELECT * FROM tbl_encuestas ORDER BY codigo desc  ";
        return EncuestasController.ejecutarConsulta(sql, [], res, 'select');
    }
    obtenerEncuestasUuid(req, res) {
        if (String(req.params.uuid)) {
            const codigo = String(req.params.uuid);
            const { codigo_dimension } = req.body;
            const sql = `SELECT usu.codigo as "codigo_usuario_proceso", encu.nombre as "encuesta",dim.nombre as "dimension",dim.codigo as "codigo_dimension" , preg.pregunta, preg.codigo as "codigo_pregunta", proc.nombre as "proceso"  FROM tbl_encuestas  encu INNER join tbl_encuestas_preguntas preg ON preg.codigo_encuesta = encu.codigo 
    INNER join tbl_dimensiones dim ON dim.codigo = preg.codigo_dimension 
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    INNER join tbl_usuarios_procesos usu ON usu.codigo_proceso = proc.codigo
    WHERE usu.uuid= $1 and dim.codigo= $2 `;
            const parametros = [codigo, codigo_dimension];
            return EncuestasController.ejecutarConsulta(sql, parametros, res, 'select');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    obtenerEncuestasInfo(req, res) {
        if (!isNaN(Number(req.params.codigo_encuesta))) {
            const codigo = Number(req.params.codigo_encuesta);
            const { codigo_dimension } = req.body;
            const sql = `SELECT encu.nombre as "encuesta",dim.nombre as "dimencion" , preg.pregunta FROM tbl_encuestas  encu INNER join tbl_encuestas_preguntas preg ON preg.codigo_encuesta = encu.codigo INNER join tbl_dimensiones dim ON dim.codigo = preg.codigo_dimension WHERE encu.codigo = $1 and dim.codigo = $2 ORDER BY encu.codigo desc ; `;
            const parametros = [codigo, codigo_dimension];
            return EncuestasController.ejecutarConsulta(sql, parametros, res, 'select');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    crearEncuestas(req, res) {
        const parametros = [];
        const { codigo_usuario, nombre, descricpcion, activo } = req.body;
        parametros.push(codigo_usuario, nombre, descricpcion, activo);
        const sql = "INSERT into tbl_encuestas (codigo_usuario, nombre, descricpcion, activo) VALUES($1,$2,$3,$4) RETURNING codigo";
        return EncuestasController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    borrarEncuesta(req, res) {
        if (!isNaN(Number(req.params.codigo_encuesta))) {
            const codigo = Number(req.params.codigo_encuesta);
            const sql = 'DELETE FROM tbl_encuestas WHERE codigo = $1';
            const parametros = [codigo];
            return EncuestasController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    obtenerOpciones(req, res) {
        const sql = "SELECT * FROM public.tbl_opciones ORDER BY codigo ASC   ";
        return EncuestasController.ejecutarConsulta(sql, [], res, 'select');
    }
    diligenciarEncuesta(req, res) {
        let sql = '';
        const promises = [];
        const respuestas = req.body;
        respuestas.forEach((infoRespuesta) => {
            const { codigo_pregunta, codigo_usuario_proceso, codigo_opcion } = infoRespuesta;
            const parametros = [];
            parametros.push(codigo_pregunta, codigo_usuario_proceso, codigo_opcion);
            sql = `INSERT into tbl_respuestas (codigo_pregunta, codigo_usuario_proceso, codigo_opcion) VALUES($1,$2,$3);`;
            promises.push(EncuestasController.ejecutarConsulta(sql, parametros, res, 'insert-multiple'));
        });
        res.status(200).json({
            'mensaje': 'Registro creado'
        });
        return Promise.all(promises);
    }
    actualizarEstadoEncuestas(req, res) {
        if (!isNaN(Number(req.params.codigo_encuesta))) {
            const codigo = Number(req.params.codigo_encuesta);
            delete req.body.codigo_encuesta;
            const { activo } = req.body;
            const sql = 'UPDATE tbl_encuestas SET activo = $1 WHERE codigo = $2;';
            const parametros = [activo, codigo];
            return EncuestasController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido  '
        }));
    }
}
const encuestas = new EncuestasController;
exports.default = encuestas;
