"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const encuestaDimRoutes_1 = __importDefault(require("./routes/encuestaDimRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const preguntaRoutes_1 = __importDefault(require("./routes/preguntaRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const cors_1 = __importDefault(require("cors"));
const respuestaRoutes_1 = __importDefault(require("./routes/respuestaRoutes"));
const usuarioEncuestaRoutes_1 = __importDefault(require("./routes/usuarioEncuestaRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('PORT', process.env.PORT || 8099);
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/public/encuestaDimencion', encuestaDimRoutes_1.default);
        this.app.use('/api/public/usuarioEncuesta', usuarioEncuestaRoutes_1.default);
        this.app.use('/api/public/pregunta', preguntaRoutes_1.default);
        this.app.use('/api/public/respuesta', respuestaRoutes_1.default);
        this.app.use('/api/public/usuario', usuarioRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('servidor listo:', this.app.get('PORT'));
        });
    }
}
const server = new Server();
server.start();
