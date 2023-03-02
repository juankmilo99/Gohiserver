import { Router } from 'express';
import encuestasController from '../controllers/encuestasController';


class EncuestasRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',encuestasController.obtenerEncuestas);
   this.router.post('/info/:codigo_encuesta',encuestasController.obtenerEncuestasInfo);
   this.router.post('/uuid/:uuid',encuestasController.obtenerEncuestasUuid);
   this.router.get('/usuariouuid/:uuid',encuestasController.obtenerInfoUsuarioUuid);  
   this.router.get('/opciones',encuestasController.obtenerOpciones);
   this.router.get('/grafica',encuestasController.obtenerDatosGrafica);
   this.router.post('/diligenciar',encuestasController.diligenciarEncuesta);          
   this.router.post('/crear',encuestasController.crearEncuestas);
   this.router.delete('/:codigo_encuesta',encuestasController.borrarEncuesta);
   this.router.put('/actualizar/:codigo_encuesta',encuestasController.actualizarEstadoEncuestas);
  
  }

}

const encuestasRoutes = new EncuestasRoutes();
export default encuestasRoutes.router;
