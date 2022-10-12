import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class usuarioEncuestaController extends dbManager {

  public obtenerUsuarioEncuesta(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT tblusu.usuarioencuestaid, tblusu.encuestadimencionid,tblusu.usuarioid,usu.nombreusuario,dim.nombredimencion FROM tblusuarioencuesta tblusu INNER join tblusuario usu ON usu.usuarioid = tblusu.usuarioid INNER join tblencuestadimencion dim ON dim.encuestadimencionid = tblusu.encuestadimencionid ORDER BY  tblusu.usuarioencuestaid desc";
    return usuarioEncuestaController.ejecutarConsulta(sql, [], res, 'select');
  }
  
  public crearUsuarioEncuesta(req: Request, res: Response): Promise<any>{
    console.log(req.body);
    const parametros=[];
    const {encuestadimencionid,usuarioid}=req.body;
    parametros.push(encuestadimencionid,usuarioid);
    const sql: string = "INSERT into tblusuarioencuesta (encuestadimencionid,usuarioid) VALUES($1,$2) RETURNING usuarioencuestaid";
    return usuarioEncuestaController.ejecutarConsulta(sql,parametros,res,'insert')
  }

  public optenerPreguntaEncuesta(req: Request, res: Response): Promise<any>{
    if (!isNaN(Number(req.params.usuarioid))) {
      const codigo = Number(req.params.usuarioid);      
      const sql: string = "SELECT usu.nombreusuario, dim.nombredimencion, preg.pregunta, preg.preguntaid,usu.usuarioid FROM tblusuarioencuesta tblencu INNER join tblencuestadimencion dim ON dim.encuestadimencionid = tblencu.encuestadimencionid INNER join tblpregunta preg ON preg.encuestadimencionid = dim.encuestadimencionid INNER join tblusuario usu ON usu.usuarioid = tblencu.usuarioid WHERE usu.usuarioid = $1 ORDER BY  tblencu.usuarioencuestaid desc";
      const parametros=[codigo];
      return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'select');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }
  }

  public borrarUsuarioEncuesta(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.usuarioencuestaid))) {
      const codigo = Number(req.params.usuarioencuestaid);      
      const sql : string = 'DELETE FROM tblusuarioencuesta WHERE usuarioencuestaid = $1';
      const parametros=[codigo];
      return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }

  }
  public actualizarUsuarioEncuesta(req:Request,res:Response):Promise<any>{
    if (!isNaN(Number(req.params.usuarioencuestaid))) {
      const codigo = Number(req.params.usuarioencuestaid);      
      const {encuestadimencionid,usuarioid}=req.body;
      const sql : string = 'UPDATE tblusuarioencuesta SET encuestadimencionid = $1, usuarioid = $2 WHERE usuarioencuestaid = $3 ';
      const parametros = [encuestadimencionid, usuarioid,codigo];
      return usuarioEncuestaController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }

  
}

const encuestaRel = new usuarioEncuestaController;
export default encuestaRel;
