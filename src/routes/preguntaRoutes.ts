import { Router } from 'express';
import preguntaController from '../controllers/preguntaController';



class PreguntaRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',preguntaController.obtenerPregunta);
   this.router.post('/crear',preguntaController.crearPregunta);
   this.router.delete('/:preguntaid',preguntaController.borrarPregunta);
   this.router.put('/actualizar/:preguntaid',preguntaController.actualizarPregunta);

  
  }

}

const preguntaRoutes = new PreguntaRoutes();
export default preguntaRoutes.router;
