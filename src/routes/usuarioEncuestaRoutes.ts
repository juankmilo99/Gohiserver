import { Router } from 'express';
import usuarioEncuestaController from '../controllers/usuarioEncuestaController';


class usuarioEncuestaRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',usuarioEncuestaController.obtenerUsuarioEncuesta);
   this.router.post('/crear',usuarioEncuestaController.crearUsuarioEncuesta);
   this.router.delete('/:usuarioencuestaid',usuarioEncuestaController.borrarUsuarioEncuesta);
   this.router.put('/actualizar/:usuarioencuestaid',usuarioEncuestaController.actualizarUsuarioEncuesta);
   this.router.get('/optenerPregunta/:usuarioid',usuarioEncuestaController.optenerPreguntaEncuesta);

  
  }

}

const usuarioencuestaRoutes = new usuarioEncuestaRoutes();
export default usuarioencuestaRoutes.router;
