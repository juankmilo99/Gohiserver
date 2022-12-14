import { Router } from 'express';
import preguntaController from '../controllers/encuestasPreguntasController';



class PreguntaRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',preguntaController.obtenerPreguntas);
   this.router.post('/crear',preguntaController.crearPreguntas);
   this.router.post('/crearv2',preguntaController.crearPreguntas);
   this.router.delete('/:preguntaid',preguntaController.borrarPregunta);
   this.router.put('/actualizar/:preguntaid',preguntaController.actualizarPregunta);

  
  }

}

const preguntaRoutes = new PreguntaRoutes();
export default preguntaRoutes.router;
