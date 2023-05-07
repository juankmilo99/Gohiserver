import { Router } from 'express';
import procesosController from '../controllers/procesosController'

class ProcesosRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', procesosController.obtenerProcesos);
        this.router.get('/usuarios/:codigo_proceso', procesosController.obtenerUsuariosProcesos);
        this.router.get('/estados', procesosController.obtenerEstadosProcesos);
        this.router.post('/enviarcorreos/:estado', procesosController.enviarCorreos);
        this.router.post('/crear', procesosController.crearProcesos);
        this.router.post('/correos/:codigo_proceso', procesosController.agregarCorreos);
        this.router.put('/actualizar/:codigo_proceso', procesosController.actualizarEstadoProcesos);
        this.router.put('/actualizarid/:codigo_proceso', procesosController.actualizarProcesos);
        this.router.put('/actualizarusuario/:codigo_proceso', procesosController.actualizarEstadoUsuarioProcesos);
        this.router.put('/actualizarcorreo/:codigo_usuario_proceso', procesosController.actualizarCorreoUsuarioProcesos);
        this.router.delete('/:codigo_proceso', procesosController.borrarProcesos);
        this.router.delete('/usuarios/:codigo_usuario_proceso', procesosController.borrarUsuariosProcesos);
        this.router.get('/:codigo_proceso', procesosController.obtenerProcesosId);
        
    }
}
const procesosRoutes = new ProcesosRoutes();
export default procesosRoutes.router;