import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class PreguntaController extends dbManager {

  public obtenerPregunta(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT tblpreg.preguntaid,dim.nombredimencion,tblpreg.pregunta,tblpreg.encuestadimencionid  FROM tblpregunta tblpreg INNER join tblencuestadimencion dim ON dim.encuestadimencionid = tblpreg.encuestadimencionid ORDER BY  tblpreg.preguntaid desc";
    return PreguntaController.ejecutarConsulta(sql, [], res, 'select');
  }
  
  public crearPregunta(req: Request, res: Response): Promise<any>{
    console.log(req.body);
    const parametros=[];
    const {encuestadimencionid,pregunta}=req.body;
    parametros.push(encuestadimencionid,pregunta);
    const sql: string = "INSERT into tblpregunta (encuestadimencionid,pregunta) VALUES($1,$2) RETURNING preguntaid";
    return PreguntaController.ejecutarConsulta(sql,parametros,res,'insert')
  }

  public borrarPregunta(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.preguntaid))) {
      const codigo = Number(req.params.preguntaid);
      const sql : string = 'DELETE FROM tblpregunta WHERE preguntaid = $1';
      const parametros=[codigo];
      return PreguntaController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
    }

  }
  public actualizarPregunta(req:Request,res:Response):Promise<any>{
    if (!isNaN(Number(req.params.preguntaid))) {
      const codigo = Number(req.params.preguntaid);
      delete req.body.preguntaid;
      const {encuestadimencionid,pregunta}=req.body;
      const sql : string = 'UPDATE tblpregunta SET encuestadimencionid = $1, pregunta = $2 WHERE preguntaid = $3;';
      const parametros = [encuestadimencionid,pregunta, codigo];
      return PreguntaController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido'
    }));
  }

  
}

const preguntaController = new PreguntaController;
export default preguntaController;
