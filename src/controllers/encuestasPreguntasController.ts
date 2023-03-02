import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class PreguntaController extends dbManager {

  public obtenerPreguntas(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT * FROM public.tbl_encuestas_preguntas   ORDER BY codigo desc ";
    return PreguntaController.ejecutarConsulta(sql, [], res, 'select');
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
