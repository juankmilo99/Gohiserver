import { Router } from 'express';
import dimensionesController from '../controllers/dimensionesController'

class DimensionesRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', dimensionesController.obtenerDimensiones);
        this.router.post('/crear', dimensionesController.crearDimensiones);
       
        
    }
}
const dimensionesRoutes = new DimensionesRoutes();
export default dimensionesRoutes.router;