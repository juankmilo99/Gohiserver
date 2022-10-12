import { Router } from 'express';
import respuestaController from '../controllers/respuestaController';



class RespuestaRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',respuestaController.obtenerRespuesta);
   this.router.post('/crear',respuestaController.crearRespuesta);
   this.router.get('/validar',respuestaController.validarRespuesta);
   this.router.get('/grafica',respuestaController.obtenerGrafica);
   this.router.delete('/:respuestaid',respuestaController.borrarRespuesta);
   this.router.put('/actualizar/:respuestaid',respuestaController.actualizarRespuesta);

  
  }

}

const respuestaRoutes = new RespuestaRoutes();
export default respuestaRoutes.router;
