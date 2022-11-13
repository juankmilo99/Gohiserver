import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class DimensionesController extends dbManager {

    public obtenerDimensiones(req: Request, res: Response): Promise<any> {
        const sql: string = "SELECT * FROM public.tbl_dimensiones  ORDER BY codigo asc ";
        return DimensionesController.ejecutarConsulta(sql, [], res, 'select');
    }

    public crearDimensiones(req: Request, res: Response): Promise<any> {
        const parametros = [];
        const { nombre} = req.body;
        parametros.push(nombre);
        const sql: string = "INSERT into tbl_dimensiones (nombre) VALUES($1) RETURNING codigo";
        return DimensionesController.ejecutarConsulta(sql, parametros, res, 'insert')
    } 
      

   


}
const dimensionesCon = new DimensionesController;
export default dimensionesCon