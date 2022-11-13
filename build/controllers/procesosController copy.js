"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class ProcesosController extends db_manager_1.default {
    obtenerProcesos(req, res) {
        const sql = "SELECT * FROM public.tbl_procesos  ORDER BY codigo desc ";
        return ProcesosController.ejecutarConsulta(sql, [], res, 'select');
    }
    crearProcesos(req, res) {
        const parametros = [];
        const { codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;
        parametros.push(codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado);
        const sql = "INSERT into tbl_procesos (codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING codigo";
        return ProcesosController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    actualizarEstadoProcesos(req, res) {
        if (!isNaN(Number(req.params.codigo_proceso))) {
            const codigo = Number(req.params.codigo_proceso);
            delete req.body.codigo_proceso;
            const { estado } = req.body;
            const sql = 'UPDATE tbl_procesos SET estado = $1 WHERE codigo = $2;';
            const parametros = [estado, codigo];
            return ProcesosController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido  '
        }));
    }
    agregarCorreos(req, res) {
        if (!isNaN(Number(req.params.codigo_proceso))) {
            const codigo = Number(req.params.codigo_proceso);
            delete req.body.codigo_proceso;
            const promises = [];
            const correos = req.body;
            correos.forEach((infoCorreo) => {
                const { correo, uuid } = infoCorreo;
                const parametros = [];
                parametros.push(codigo, correo, uuid);
                const sql = 'INSERT into tbl_usuarios_procesos (codigo_proceso, correo, uuid) VALUES($1,$2,$3)';
                promises.push(ProcesosController.ejecutarConsulta(sql, parametros, res, 'insert-multiple'));
            });
            res.status(200).json({
                'mensaje': 'Registro creado'
            });
            return Promise.all(promises);
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido  '
        }));
    }
    borrarProcesos(req, res) {
        if (!isNaN(Number(req.params.codigo_proceso))) {
            const codigo = Number(req.params.codigo_proceso);
            const sql = 'DELETE FROM tbl_procesos WHERE codigo = $1';
            const parametros = [codigo];
            return ProcesosController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido'
            }));
        }
    }
}
const procesosCon = new ProcesosController;
exports.default = procesosCon;
