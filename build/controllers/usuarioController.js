"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_manager_1 = __importDefault(require("../config/db_manager"));
class UsuarioController extends db_manager_1.default {
    obtenerUsuarios(req, res) {
        const sql = "SELECT * FROM public.tbl_usuarios ORDER BY codigo desc ";
        return UsuarioController.ejecutarConsulta(sql, [], res, 'select');
    }
    logIn(req, res) {
        console.log(req.body);
        const parametros = [];
        const { correo, clave } = req.body;
        parametros.push(correo, clave);
        const sql = "SELECT * FROM tbl_usuarios WHERE correo = $1 AND clave = $2";
        console.log(parametros);
        return UsuarioController.ejecutarConsulta(sql, parametros, res, 'jwt');
    }
    crearUsuarios(req, res) {
        console.log(req.body);
        const parametros = [];
        const { codigo_rol, nombre_usuario, correo, clave } = req.body;
        parametros.push(codigo_rol, nombre_usuario, correo, clave);
        const sql = "INSERT into tbl_usuarios (codigo_rol, nombre_usuario, correo, clave) VALUES($1,$2,$3,$4) RETURNING codigo";
        console.log(parametros);
        return UsuarioController.ejecutarConsulta(sql, parametros, res, 'insert');
    }
    borrarUsuarios(req, res) {
        if (!isNaN(Number(req.params.usuarioid))) {
            const codigo = Number(req.params.usuarioid);
            const sql = 'DELETE FROM tblusuario WHERE usuarioid = $1';
            const parametros = [codigo];
            return UsuarioController.ejecutarConsulta(sql, parametros, res, 'delete');
        }
        else {
            return Promise.resolve(res.status(400).json({
                'mensaje': 'Codigo invalido '
            }));
        }
    }
    actualizarUsuario(req, res) {
        if (!isNaN(Number(req.params.usuarioid))) {
            const codigo = Number(req.params.usuarioid);
            delete req.body.usuarioid;
            const { nombreusuario, correo, clave, codrol } = req.body;
            const sql = 'UPDATE tblusuario SET nombreusuario = $1, correo = $2, clave = $3, codrol = $4 WHERE usuarioid = $5;';
            const parametros = [nombreusuario, correo, clave, codrol, codigo];
            return UsuarioController.ejecutarConsulta(sql, parametros, res, 'update');
        }
        return Promise.resolve(res.status(400).json({
            'mensaje': 'Codigo invalido'
        }));
    }
}
const usuarioController = new UsuarioController;
exports.default = usuarioController;
