import { Router } from 'express';
import usuarioController from '../controllers/usuarioController';



class UsuarioRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config(): void {
   this.router.get('/',usuarioController.obtenerUsuarios);
   this.router.post('/crear',usuarioController.crearUsuarios);
   this.router.post('/login',usuarioController.logIn);
   this.router.get('/encuestas/:usuarioid',usuarioController.obtenerEncuestasAsig);
   this.router.delete('/:usuarioid',usuarioController.borrarUsuarios);
   this.router.get('/:codigo_usuario',usuarioController.obtenerUsuariosId);
   this.router.put('/actualizar/:usuarioid',usuarioController.actualizarUsuario);

  
  }

}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
