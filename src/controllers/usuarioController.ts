import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class UsuarioController extends dbManager {

  public obtenerUsuarios(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT usuarioid ,nombreusuario, correo, clave, codrol FROM tblusuario";
    return UsuarioController.ejecutarConsulta(sql, [], res, 'select');
  }

  public logIn(req: Request, res: Response): Promise<any> {
    console.log(req.body);
    const parametros=[];
    const {correo,clave}=req.body;
    parametros.push(correo,clave);
    const sql:string = "SELECT usuarioid, nombreusuario, correo, codrol FROM tblusuario WHERE correo = $1 AND clave = $2";
    console.log(parametros);
    return UsuarioController.ejecutarConsulta(sql, parametros, res, 'jwt');
  }
  
  public crearUsuarios(req: Request, res: Response): Promise<any>{
    console.log(req.body);
    const parametros=[];
    const {nombreusuario,correo,clave,codrol}=req.body;
    parametros.push(nombreusuario,correo,clave,codrol);
    const sql: string = "INSERT into tblusuario (nombreusuario,correo,clave,codrol) VALUES($1,$2,$3,$4) RETURNING codrol , correo, nombreusuario ";
    console.log(parametros);
    return UsuarioController.ejecutarConsulta(sql,parametros,res,'jwt')
  }

  public borrarUsuarios(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.usuarioid))) {
      const codigo = Number(req.params.usuarioid);
      const sql : string = 'DELETE FROM tblusuario WHERE usuarioid = $1';
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
      const {nombreusuario,correo,clave,codrol}=req.body;
      const sql : string = 'UPDATE tblusuario SET nombreusuario = $1, correo = $2, clave = $3, codrol = $4 WHERE usuarioid = $5;';
      const parametros = [nombreusuario,correo,clave,codrol,codigo];
      return UsuarioController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido'
    }));
  }

  
}

const usuarioController = new UsuarioController;
export default usuarioController;
