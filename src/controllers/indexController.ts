import { Request, Response } from 'express';

class IndexController {

  public index(req: Request, res: Response) {

    console.log(req.headers);
    res.json({
      'respuesta1': 'hola mano',
      'respuesta2': 'la api esta /api/public/'
    });
  }
}


const indexController = new IndexController();
export default indexController;
