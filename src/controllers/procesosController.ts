
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { transporter } from '../config/mailer';
import dbManager from '../config/db_manager';
import * as dotenv from 'dotenv';
dotenv.config();

class ProcesosController extends dbManager {

  public obtenerProcesos(req: Request, res: Response): Promise<any> {
    const sql: string = "SELECT * FROM public.tbl_procesos  ORDER BY codigo desc ";
    return ProcesosController.ejecutarConsulta(sql, [], res, 'select');
  }


  public obtenerEstadosProcesos(req: Request, res: Response): Promise<any> {
    const sql = `select 'Encuestas Activas' as "estado",'chart-bar' as "icon", count(*) as value
    from tbl_encuestas encu
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    WHERE proc.estado = 1
    UNION
    select 'Encuestas Inactivas','chart-area', count(*)
    from tbl_encuestas encu
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    WHERE proc.estado = 2
    UNION
    select 'Encuestas Finalizadas','chart-pie', count(*)
    from tbl_encuestas encu
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    WHERE proc.estado = 3`;
    return ProcesosController.ejecutarConsulta(sql, [], res, 'select');
  }

  


  public crearProcesos(req: Request, res: Response): Promise<any> {
    const parametros = [];
    const { codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;
    parametros.push(codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado);
    const sql: string = "INSERT into tbl_procesos (codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING codigo";
    return ProcesosController.ejecutarConsulta(sql, parametros, res, 'insert')
  }

  public actualizarEstadoProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);
      delete req.body.codigo_proceso;
      const { estado } = req.body;
      const sql: string = 'UPDATE tbl_procesos SET estado = $1 WHERE codigo = $2;';
      const parametros = [estado, codigo];
      return ProcesosController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }

  public agregarCorreos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {      
      const codigo = Number(req.params.codigo_proceso);
      var verificationLink;
      
      delete req.body.codigo_proceso;

      const promises: Array<Promise<any>> = [];
      const correos = req.body;
      correos.forEach(async (infoCorreo: any) => {
        var uuid;
        const { correo } = infoCorreo;
        uuid = uuidv4();
        verificationLink= process.env.FRONTLINK +'/public/my-surveys/fill/'+uuid;
        //****************ENVIAR CORREOS************************************************************************************************//
        await transporter.sendMail({
          from: '"GOHI" <punishman99@gmail.com>', // sender address
          to: correo, // list of receivers
          subject: "ENCUESTA 👻", // Subject line          
          html: `
          <b> please click on the following link </>
          <a href="${verificationLink}">${verificationLink}</a>
          `, 
        });
        //******************************************************************************************************************************//                    
        const parametros: any[] = [];
        parametros.push(codigo, correo, uuid)
        const sql: string = 'INSERT into tbl_usuarios_procesos (codigo_proceso, correo, uuid) VALUES($1,$2,$3)';
        promises.push(ProcesosController.ejecutarConsulta(sql, parametros, res, 'insert-multiple'));
      });
      res.status(200).json({
        'mensaje': 'Registro creado',      
      });
      return Promise.all(promises);


    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }

  public borrarProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);
      const sql: string = 'DELETE FROM tbl_procesos WHERE codigo = $1';
      const parametros = [codigo];
      return ProcesosController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
    }
  }


}
const procesosCon = new ProcesosController;
export default procesosCon