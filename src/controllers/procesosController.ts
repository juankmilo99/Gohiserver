
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';
import { transporter } from '../config/mailer';
import dbManager from '../config/db_manager';
import * as dotenv from 'dotenv';
dotenv.config();

class ProcesosController extends dbManager {

  public obtenerProcesos(req: Request, res: Response): Promise<any> {
    const sql: string = "SELECT *,TO_CHAR(fecha_fin, 'YYYY-MM-DD HH24:MI:SS') as fecha_fin, TO_CHAR(fecha_inicio, 'YYYY-MM-DD HH24:MI:SS') as fecha_inicio,(SELECT count(*) as usuarios FROM tbl_usuarios_procesos usu  WHERE usu.codigo_proceso = tbl_procesos.codigo),(SELECT count(*) as respuestas FROM tbl_respuestas res  INNER join tbl_usuarios_procesos proc ON proc.codigo = res.codigo_usuario_proceso  WHERE proc.codigo_proceso=tbl_procesos.codigo ) FROM  public.tbl_procesos  ORDER BY codigo desc ";
    return ProcesosController.ejecutarConsulta(sql, [], res, 'select');
  }
  public obtenerProcesosId(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);
    const sql: string = "SELECT proc.codigo,proc.descripcion,proc.estado,proc.nombre,proc.codigo_encuesta,proc.codigo_usuario,TO_CHAR(fecha_fin, 'YYYY-MM-DD HH24:MI:SS') as fecha_fin, TO_CHAR(fecha_inicio, 'YYYY-MM-DD HH24:MI:SS') as fecha_inicio, encu.nombre as nombre_encuesta FROM public.tbl_procesos proc inner join public.tbl_encuestas encu ON encu.codigo = proc.codigo_encuesta where proc.codigo = $1 ORDER BY proc.codigo desc  ";
    const parametros = [codigo];
    return ProcesosController.ejecutarConsulta(sql, parametros, res, 'select');
    }else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
  }}

  public obtenerUsuariosProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);
      const sql: string = `SELECT usu.codigo,usu.codigo_proceso,usu.correo,usu.estado,usu.uuid , proc.nombre as nombre_proceso, (SELECT count(*) as respuestas 
      FROM tbl_respuestas res 
      WHERE res.codigo_usuario_proceso = usu.codigo) 
      FROM public.tbl_usuarios_procesos usu 
      INNER join public.tbl_procesos proc ON proc.codigo = usu.codigo_proceso 
      where usu.codigo_proceso = $1 ORDER BY usu.codigo ASC`;
      const parametros = [codigo];
      return ProcesosController.ejecutarConsulta(sql, parametros, res, 'select');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido'
      }));
    }

  }

  public enviarCorreos(req: Request, res: Response): Promise<any> {    
      var verificationLink;
      const codigo = Number(req.params.estado);
      delete req.body.codigo_proceso;
      const promises: Array<Promise<any>> = [];
      const correos = req.body;     
      correos.forEach(async (infoCorreo: any) => {             
        const { correo } = infoCorreo;       
        verificationLink = process.env.FRONTLINK + '/public/my-surveys/fill/' + infoCorreo.uuid;
        var html = codigo == 1 ? `
        <b> El ${infoCorreo.nombre_proceso}, esta activo. </> 
        <b> Por favor entra al siguiente link para diligenciar el proceso </>
        <a href="${verificationLink}">${verificationLink}</a>
        ` : `
        <b> El ${infoCorreo.nombre_proceso}, esta inactivo. </>
        
        `; 
        //****************ENVIAR CORREOS************************************************************************************************//
        await transporter.sendMail({
          from: '"GOHISALO APP 📋" <punishman99@gmail.com>', // sender address
          to: correo, // list of receivers
          subject: "Proceso de Evaluación", // Subject line          
          html: html,
        });
        //******************************************************************************************************************************//                    
        const parametros: any[] = [];       
      });
      res.status(200).json({
        'mensaje': 'Correo enviado',
      });    
      return Promise.all(promises);
    
  }
  


  public obtenerEstadosProcesos(req: Request, res: Response): Promise<any> {
    const sql = `select 'Procesos Activos' as "estado",'chart-bar' as "icon", count(*) as value
    from tbl_encuestas encu
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    WHERE proc.estado = 1
    UNION
    select 'Procesos Inactivos','chart-area', count(*)
    from tbl_encuestas encu
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    WHERE proc.estado = 2
    UNION
    select 'Procesos Finalizados','chart-pie', count(*)
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

  

  public actualizarProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);
      delete req.body.codigo_proceso;
      const { codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;
      const sql: string = 'UPDATE tbl_procesos SET codigo_usuario = $1, codigo_encuesta = $2 , nombre =$3, descripcion = $4, fecha_inicio= $5, fecha_fin=$6, estado=$7 WHERE codigo =$8;';
      const parametros = [codigo_usuario, codigo_encuesta, nombre, descripcion, fecha_inicio, fecha_fin, estado, codigo];
      return ProcesosController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }
  public actualizarEstadoUsuarioProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);
      delete req.body.codigo_proceso;
      const { estado } = req.body;
      const sql: string = 'UPDATE tbl_usuarios_procesos SET estado = $1 WHERE codigo = $2;';
      const parametros = [estado, codigo];
      return ProcesosController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }
  public actualizarCorreoUsuarioProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_usuario_proceso))) {
      const codigo = Number(req.params.codigo_usuario_proceso);
      delete req.body.codigo_usuario_proceso;
      const { correo } = req.body;
      const sql: string = 'UPDATE tbl_usuarios_procesos SET correo = $1 WHERE codigo = $2;';
      const parametros = [correo, codigo];
      return ProcesosController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }

  public agregarCorreos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_proceso))) {
      const codigo = Number(req.params.codigo_proceso);  
      delete req.body.codigo_proceso;
      const promises: Array<Promise<any>> = [];
      const correos = req.body;
      correos.forEach(async (infoCorreo: any) => {
        var uuid;
        const { correo } = infoCorreo;
        uuid = uuidv4();                            
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

  public borrarUsuariosProcesos(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_usuario_proceso))) {
      const codigo = Number(req.params.codigo_usuario_proceso);
      const sql: string = 'DELETE FROM tbl_usuarios_procesos WHERE codigo = $1';
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