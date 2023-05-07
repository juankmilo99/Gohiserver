import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class UsuarioController extends dbManager {

  public obtenerUsuarios(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT *,(SELECT count(*) as procesos FROM tbl_procesos proc  WHERE proc.codigo_usuario = tbl_usuarios.codigo) FROM public.tbl_usuarios ORDER BY codigo desc ";
    return UsuarioController.ejecutarConsulta(sql, [], res, 'select');
  }

  public obtenerUsuariosId(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_usuario))) {
      const codigo = Number(req.params.codigo_usuario);
    const sql: string = "SELECT * FROM public.tbl_usuarios where codigo = $1 ORDER BY codigo desc ";
    const parametros = [codigo];
    return UsuarioController.ejecutarConsulta(sql, parametros, res, 'select');
    }else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
  }}

  public logIn(req: Request, res: Response): Promise<any> {
    console.log(req.body);
    const parametros=[];
    const {correo,clave}=req.body;
    parametros.push(correo,clave);
    const sql:string = "SELECT * FROM tbl_usuarios WHERE correo = $1 AND clave = $2";
    console.log(parametros);
    return UsuarioController.ejecutarConsulta(sql, parametros, res, 'jwt');
  }
  
  public crearUsuarios(req: Request, res: Response): Promise<any>{
    console.log(req.body);
    const parametros=[];
    const {codigo_rol, nombre_usuario, correo, clave}=req.body;
    parametros.push(codigo_rol, nombre_usuario, correo, clave);
    const sql: string = "INSERT into tbl_usuarios (codigo_rol, nombre_usuario, correo, clave) VALUES($1,$2,$3,$4) RETURNING codigo";
    console.log(parametros);
    return UsuarioController.ejecutarConsulta(sql,parametros,res,'insert')
  }

  public obtenerEncuestasAsig(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.usuarioid))) {
      const codigo = Number(req.params.usuarioid);   
      const sql: string = `SELECT usu.nombre_usuario, encu.nombre FROM tbl_usuarios usu INNER join tbl_encuestas encu ON encu.codigo_usuario = usu.codigo WHERE usu.codigo= $1`;
      const parametros = [codigo];
      return UsuarioController.ejecutarConsulta(sql, parametros, res, 'select');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }

  }

  public borrarUsuarios(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.usuarioid))) {
      const codigo = Number(req.params.usuarioid);
      const sql : string = 'DELETE FROM tbl_usuarios WHERE codigo = $1';
      const parametros=[codigo];
      return UsuarioController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }

  }
  public actualizarUsuario(req:Request,res:Response):Promise<any>{
    if (!isNaN(Number(req.params.usuarioid))) {
      const codigo = Number(req.params.usuarioid);
      delete req.body.usuarioid;
      const {nombre_usuario,correo,clave,codigo_rol}=req.body;
      const sql : string = 'UPDATE tbl_usuarios SET nombre_usuario = $1, correo = $2, clave = $3, codigo_rol = $4 WHERE codigo = $5;';
      const parametros = [nombre_usuario,correo,clave,codigo_rol,codigo];
      return UsuarioController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido'
    }));
  }

  
}

const usuarioController = new UsuarioController;
export default usuarioController;
