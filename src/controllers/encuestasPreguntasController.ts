import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class PreguntaController extends dbManager {

  public obtenerPreguntas(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT * FROM public.tbl_encuestas_preguntas   ORDER BY codigo desc ";
    return PreguntaController.ejecutarConsulta(sql, [], res, 'select');
  }
  public obtenerPreguntaRespuestas(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_pregunta))) {
      const codigo = Number(req.params.codigo_pregunta);
      const sql : string = `SELECT count(*) as respuestas 
      FROM tbl_encuestas_preguntas preg INNER join tbl_respuestas res ON res.codigo_pregunta = preg.codigo 
      WHERE preg.codigo = $1 `;
      const parametros=[codigo];
      return PreguntaController.ejecutarConsulta(sql, parametros, res, 'select');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
    }
  }    

  //crear varios insert con una funcion promise
  public crearPreguntas(req: Request, res: Response): Promise<any>{
    let sql: string = '';
    const promises: Array<Promise<any>> = [];
    const preguntas = req.body;

    preguntas.forEach((infoPregunta:any) => {
      const {codigo_encuesta, codigo_dimension, pregunta}=infoPregunta;
      const parametros : any[] = [];
      parametros.push(codigo_encuesta, codigo_dimension, pregunta);
      sql = `INSERT into tbl_encuestas_preguntas (codigo_encuesta, codigo_dimension, pregunta) VALUES($1,$2,$3) RETURNING codigo`;
      promises.push(PreguntaController.ejecutarConsulta(sql,parametros,res,'insert-multiple'));
    });                                
    res.status(200).json({                      
      'mensaje': 'Registros creados',     
    
    });                                   
    return Promise.all(promises);
  }
  

  public borrarPregunta(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_pregunta))) {
      const codigo = Number(req.params.codigo_pregunta);
      const sql : string = 'DELETE FROM tbl_encuestas_preguntas WHERE codigo = $1';
      const parametros=[codigo];
      return PreguntaController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
    }

  }
  public actualizarPregunta(req:Request,res:Response):Promise<any>{
    if (!isNaN(Number(req.params.codigo_pregunta))) {
      const codigo_pregunta = Number(req.params.codigo_pregunta);
      delete req.body.codigo_pregunta;
      const {pregunta}=req.body;
      const sql : string = 'UPDATE tbl_encuestas_preguntas SET  pregunta = $1 WHERE codigo= $2;';
      const parametros = [pregunta, codigo_pregunta];
      return PreguntaController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido'
    }));
  }

  
}

const preguntaController = new PreguntaController;
export default preguntaController;
