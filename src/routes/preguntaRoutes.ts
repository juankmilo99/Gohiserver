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
   this.router.delete('/:codigo_pregunta',preguntaController.borrarPregunta);
   this.router.get('/respuestas/:codigo_pregunta',preguntaController.obtenerPreguntaRespuestas);
   this.router.put('/actualizar/:codigo_pregunta',preguntaController.actualizarPregunta);

  
  }

}

const preguntaRoutes = new PreguntaRoutes();
export default preguntaRoutes.router;
