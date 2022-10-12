import { Router } from 'express';
import encuestaDimController from '../controllers/encuestaDimController';


class EncuestaDimRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',encuestaDimController.obtenerEncuestaDim);
   this.router.post('/crear',encuestaDimController.crearEncuestaDim);
   this.router.delete('/:encuestadimencionid',encuestaDimController.borrarEncuestaDim);
   this.router.put('/actualizar/:encuestadimencionid',encuestaDimController.actualizarEncuestaDim);
  
  }

}

const encuestaDimRoutes = new EncuestaDimRoutes();
export default encuestaDimRoutes.router;
