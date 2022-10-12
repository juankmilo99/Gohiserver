import { response, Router } from 'express';
import indexController from '../controllers/indexController';

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }
  public config():void{
    this.router.get('/',indexController.index);
  }


}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
