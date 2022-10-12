import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class EncuestaDimController extends dbManager {

  public obtenerEncuestaDim(req: Request, res: Response): Promise<any> {
    const sql:string = "SELECT encuestadimencionid ,nombredimencion FROM tblencuestadimencion";
    return EncuestaDimController.ejecutarConsulta(sql, [], res, 'select');
  }
  
  public crearEncuestaDim(req: Request, res: Response): Promise<any>{
    console.log(req.body);
    const parametros=[];
    const {nombredimencion}=req.body;
    parametros.push(nombredimencion);
    const sql: string = "INSERT into tblencuestadimencion (nombredimencion) VALUES($1) RETURNING encuestadimencionid";
    return EncuestaDimController.ejecutarConsulta(sql,parametros,res,'insert')
  }

  public borrarEncuestaDim(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.encuestadimencionid))) {
      const codigo = Number(req.params.encuestadimencionid);
      const sql : string = 'DELETE FROM tblencuestadimencion WHERE encuestadimencionid = $1';
      const parametros=[codigo];
      return EncuestaDimController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }

  }
  public actualizarEncuestaDim(req:Request,res:Response):Promise<any>{
    if (!isNaN(Number(req.params.encuestadimencionid))) {
      const codigo = Number(req.params.encuestadimencionid);
      delete req.body.encuestadimencionid;
      const {nombredimencion}=req.body;
      const sql : string = 'UPDATE tblencuestadimencion SET nombredimencion = $1 WHERE encuestadimencionid = $2;';
      const parametros = [nombredimencion, codigo];
      return EncuestaDimController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }

  
}

const encuestaDim = new EncuestaDimController;
export default encuestaDim;
