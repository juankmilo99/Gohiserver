"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = __importDefault(require("./conn"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class dbManager {
    static ejecutarConsulta(sql, parametros, res, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            conn_1.default.query(sql, parametros, function (error, resultado) {
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
                }
                else {
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
                            const token = jsonwebtoken_1.default.sign({
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
        });
    }
}
exports.default = dbManager;
