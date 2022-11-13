import { request, response, Response } from 'express';
import pool from './conn';
import jwt from 'jsonwebtoken';


class dbManager {
  protected static async ejecutarConsulta(sql: string, parametros: any, res: Response, tipo: string): Promise<any> {

    pool.query(sql, parametros, function (error, resultado) {
      if (error) {
        if (error.stack == 'ER_BAD_DB_ERROR') {
          console.log('No existe la database');
          res.status(400).json({ 'respuesta': 'base de datos no existe' });
        }
        if (error.stack == 'ER_ACCESS_DENIED_ERROR') {
          console.log('Nombre de usuario o contraseña es incorrecta');
          res.status(400).json({ 'respuesta': 'Nombre de usuario o contraseña es incorrecta' });
        }
        if (error.stack == 'ENOTFOUND') {
          console.log('Error servidor');
          res.status(400).json({ 'respuesta': 'Error servidor' });
        }
        if (error.stack == 'ER_PARSE_ERROR') {
          console.log('Esta consumiendo el servicio de manera incorrecta');
          res.status(400).json({ 'respuesta': 'Esta consumiendo el servicio de manera incorrecta' });
        }
        console.log('Se ha encontrado un error: ', error);
        res.status(400).json({ 'respuesta': error });
      } else {
        switch (tipo.toLowerCase()) {
          case 'select':
            res.status(200).json(resultado.rows);
            break;
          case 'insert':
            res.status(200).json({
              'mensaje': 'Registro creado',
              'id': resultado.rows
            });
            break;
          case 'insert-multiple': 
          console.log('bandera');         
            break;
          case 'delete':
            res.status(200).json({
              'mensaje': 'Registro eliminado',
              'filas': resultado.rows
            });
            break;
          case 'update':
            res.status(200).json({
              'mensaje': 'Registro actualizado',
              'filas': resultado.rows
            });
            break;
          case 'jwt':
            const token = jwt.sign({
              'user': resultado.rows,
            }, 'alvaroelbarbaro');
            res.status(200).json({
              'token': token,          
            });
            break;
          default:
            res.status(400).json({
              'respuesta': 'Servicio no implementado'
            });
            break;
        }
      }
    });
  }

}

export default dbManager;
