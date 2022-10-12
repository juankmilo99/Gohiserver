import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class RespuestaController extends dbManager {

  public obtenerRespuesta(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT tblres.respuestaid ,tblres.preguntaid, tblres.respuesta, tblres.usuarioid ,usu.nombreusuario,preg.pregunta FROM tblrespuesta tblres INNER join tblusuario usu ON usu.usuarioid = tblres.usuarioid INNER join tblpregunta preg ON preg.preguntaid = tblres.preguntaid ORDER BY  tblres.respuestaid desc";
    return RespuestaController.ejecutarConsulta(sql, [], res, 'select');
  }

  public obtenerGrafica(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT res.respuesta , count(*) cuenta FROM tblrespuesta res GROUP by res.respuesta HAVING count(*) > 1 ORDER BY res.respuesta";
    return RespuestaController.ejecutarConsulta(sql, [], res, 'select');
  }
  
  public crearRespuesta(req: Request, res: Response): Promise<any>{
    console.log(req.body);
    const parametros=[];
    const {preguntaid,respuesta,usuarioid}=req.body;
    parametros.push(preguntaid,respuesta,usuarioid);
    const sql: string = "INSERT into tblrespuesta (preguntaid,respuesta,usuarioid) VALUES($1,$2,$3) RETURNING respuestaid";
    return RespuestaController.ejecutarConsulta(sql,parametros,res,'insert')
  }
  public validarRespuesta(req: Request, res: Response): Promise<any>{
    const sql: string = "SELECT pus.preguntaid, pus.respuesta, usu.nombreusuario, usu.usuarioid FROM tblusuariorespuesta res INNER join tblusuario usu ON usu.usuarioid = res.usuarioid INNER join tblrespuesta pus ON pus.respuestaid = res.respuestaid ";
    return RespuestaController.ejecutarConsulta(sql,[],res,'select')
  }

  public borrarRespuesta(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.respuestaid))) {
      const codigo = Number(req.params.respuestaid);
      const sql : string = 'DELETE FROM tblrespuesta WHERE respuestaid = $1';
      const parametros=[codigo];
      return RespuestaController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
    }

  }
  public actualizarRespuesta(req:Request,res:Response):Promise<any>{
    if (!isNaN(Number(req.params.respuestaid))) {
      const codigo = Number(req.params.respuestaid);
      delete req.body.respuestaid;
      const {preguntaid,respuesta,usuarioid}=req.body;
      const sql : string = 'UPDATE tblrespuesta SET preguntaid = $1, respuesta = $2, usuarioid = $3 WHERE respuestaid = $4;';
      const parametros = [preguntaid,respuesta,usuarioid, codigo];
      return RespuestaController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido'
    }));
  }

  
}

const respuestaController = new RespuestaController;
export default respuestaController;
