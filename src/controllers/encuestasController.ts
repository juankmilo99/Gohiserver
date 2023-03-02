import { Request, Response } from 'express'
import dbManager from '../config/db_manager';

class EncuestasController extends dbManager {

  public obtenerEncuestas(req: Request, res: Response): Promise<any> {
    const sql: string = "SELECT * FROM tbl_encuestas ORDER BY codigo desc  ";
    return EncuestasController.ejecutarConsulta(sql, [], res, 'select');
  }

  public obtenerEncuestasUuid(req: Request, res: Response): Promise<any> {
    if (String(req.params.uuid)) {
      const codigo = String(req.params.uuid);
      const { codigo_dimension } = req.body;
      const sql = `SELECT usu.codigo as "codigo_usuario_proceso", encu.nombre as "encuesta",dim.nombre as "dimension",dim.codigo as "codigo_dimension" , preg.pregunta, preg.codigo as "codigo_pregunta", proc.nombre as "proceso"  FROM tbl_encuestas  encu INNER join tbl_encuestas_preguntas preg ON preg.codigo_encuesta = encu.codigo 
    INNER join tbl_dimensiones dim ON dim.codigo = preg.codigo_dimension 
    INNER join tbl_procesos proc ON proc.codigo_encuesta = encu.codigo
    INNER join tbl_usuarios_procesos usu ON usu.codigo_proceso = proc.codigo
    WHERE usu.uuid= $1 and dim.codigo= $2 `;
      const parametros = [codigo, codigo_dimension];
      return EncuestasController.ejecutarConsulta(sql, parametros, res, 'select');

    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }
  }

  public obtenerInfoUsuarioUuid(req: Request, res: Response): Promise<any> {
    if (String(req.params.uuid)) {
      const codigo = String(req.params.uuid);
      const sql = ` SELECT usup.estado,proc.estado as "estado_proceso", usu.nombre_usuario, encu.nombre as "nombre_encuesta", encu.descricpcion as "descripcion_encuesta", proc.nombre as "nombre_proceso", proc.descripcion as "descripcion_proceso", proc.fecha_inicio, proc.fecha_fin
      FROM tbl_usuarios_procesos usup
      INNER join tbl_procesos proc ON proc.codigo = usup.codigo_proceso
      INNER join tbl_encuestas encu ON encu.codigo = proc.codigo_encuesta 
      INNER join tbl_usuarios usu ON usu.codigo = proc.codigo_usuario
      WHERE usup.uuid= $1 `;
      const parametros = [codigo];
      return EncuestasController.ejecutarConsulta(sql, parametros, res, 'select');

    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }
  }

  public obtenerEncuestasInfo(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_encuesta))) {
      const codigo = Number(req.params.codigo_encuesta);
      const { codigo_dimension } = req.body;
      const sql: string = `SELECT preg.codigo as "codigo_pregunta" ,encu.nombre as "encuesta",dim.nombre as "dimencion" , preg.pregunta FROM tbl_encuestas  encu INNER join tbl_encuestas_preguntas preg ON preg.codigo_encuesta = encu.codigo INNER join tbl_dimensiones dim ON dim.codigo = preg.codigo_dimension WHERE encu.codigo = $1 and dim.codigo = $2 ORDER BY encu.codigo desc ; `;
      const parametros = [codigo, codigo_dimension];
      return EncuestasController.ejecutarConsulta(sql, parametros, res, 'select');

    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }

  }

  public obtenerDatosGrafica(req: Request, res: Response): Promise<any> {
    const sql = `select 'muy satisfecho' as "respuesta", count(*) as value
    from tbl_respuestas res
    INNER join tbl_opciones op ON op.codigo = res.codigo_opcion
    WHERE res.codigo_opcion= 5
	UNION
	select 'satisfecho',  count(*) as value
    from tbl_respuestas res
    INNER join tbl_opciones op ON op.codigo = res.codigo_opcion
    WHERE res.codigo_opcion= 4
	UNION
	select 'poco satisfecho', count(*) as value
    from tbl_respuestas res
    INNER join tbl_opciones op ON op.codigo = res.codigo_opcion
    WHERE res.codigo_opcion= 3
	UNION
	select 'insatisfecho', count(*) as value
    from tbl_respuestas res
    INNER join tbl_opciones op ON op.codigo = res.codigo_opcion
    WHERE res.codigo_opcion= 2
	UNION
	select 'nada satisfecho', count(*) as value
    from tbl_respuestas res
    INNER join tbl_opciones op ON op.codigo = res.codigo_opcion
    WHERE res.codigo_opcion= 1`;
    return EncuestasController.ejecutarConsulta(sql, [], res, 'select');
  }

  public crearEncuestas(req: Request, res: Response): Promise<any> {
    const parametros = [];
    const { codigo_usuario, nombre, descricpcion, activo } = req.body;
    parametros.push(codigo_usuario, nombre, descricpcion, activo);
    const sql: string = "INSERT into tbl_encuestas (codigo_usuario, nombre, descricpcion, activo) VALUES($1,$2,$3,$4) RETURNING codigo";
    return EncuestasController.ejecutarConsulta(sql, parametros, res, 'insert')
  }

  public borrarEncuesta(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_encuesta))) {
      const codigo = Number(req.params.codigo_encuesta);
      const sql: string = 'DELETE FROM tbl_encuestas WHERE codigo = $1';
      const parametros = [codigo];
      return EncuestasController.ejecutarConsulta(sql, parametros, res, 'delete');
    } else {
      return Promise.resolve(res.status(400).json({
        'mensaje': 'Codigo invalido '
      }));
    }

  }

  public obtenerOpciones(req: Request, res: Response): Promise<any> {
    const sql: string = "SELECT * FROM public.tbl_opciones ORDER BY codigo ASC   ";
    return EncuestasController.ejecutarConsulta(sql, [], res, 'select');
  }

  public diligenciarEncuesta(req: Request, res: Response): Promise<any> {
    let sql: string = '';
    const promises: Array<Promise<any>> = [];
    const respuestas = req.body;

    respuestas.forEach((infoRespuesta: any) => {
      const { codigo_pregunta, codigo_usuario_proceso, codigo_opcion } = infoRespuesta;
      const parametros: any[] = [];
      parametros.push(codigo_pregunta, codigo_usuario_proceso, codigo_opcion);
      sql = `INSERT into tbl_respuestas (codigo_pregunta, codigo_usuario_proceso, codigo_opcion) VALUES($1,$2,$3);`;
      promises.push(EncuestasController.ejecutarConsulta(sql, parametros, res, 'insert-multiple'));
    });
    res.status(200).json({
      'mensaje': 'Registro creado'
    });
    return Promise.all(promises);
  }

  public actualizarEstadoEncuestas(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.codigo_encuesta))) {
      const codigo = Number(req.params.codigo_encuesta);
      delete req.body.codigo_encuesta;
      const { activo } = req.body;
      const sql: string = 'UPDATE tbl_encuestas SET activo = $1 WHERE codigo = $2;';
      const parametros = [activo, codigo];
      return EncuestasController.ejecutarConsulta(sql, parametros, res, 'update');
    }
    return Promise.resolve(res.status(400).json({
      'mensaje': 'Codigo invalido  '
    }));
  }


}

const encuestas = new EncuestasController;
export default encuestas;
