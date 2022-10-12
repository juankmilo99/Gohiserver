"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        console.log(req.headers);
        res.json({
            'respuesta1': 'hola mano',
            'respuesta2': 'la api esta /api/public/'
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
