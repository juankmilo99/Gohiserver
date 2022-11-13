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
        this.router.post('/crear', procesosController.crearProcesos);
        this.router.post('/correos/:codigo_proceso', procesosController.agregarCorreos);
        this.router.put('/actualizar/:codigo_proceso', procesosController.actualizarEstadoProcesos);
        this.router.delete('/:codigo_proceso', procesosController.borrarProcesos);
        
    }
}
const procesosRoutes = new ProcesosRoutes();
export default procesosRoutes.router;