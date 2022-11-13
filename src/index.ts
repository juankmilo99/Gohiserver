import express from 'express';
import encuestasRoutes from './routes/encuestasRoutes';
import indexRoutes from './routes/indexRoutes';
import preguntaRoutes from './routes/preguntaRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import cors from "cors";
import respuestaRoutes from './routes/respuestaRoutes';
import usuarioEncuestaRoutes from './routes/usuarioEncuestaRoutes';
import procesosRoutes from './routes/procesosRoutes';
import dimensionesRoutes from './routes/dimensionesRoutes';

class Server {
    public app: express.Application;

    constructor() {
        
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        this.app.set('PORT', process.env.PORT || 8099);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    public routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/public/encuestas',encuestasRoutes);
        this.app.use('/api/public/usuarioEncuesta',usuarioEncuestaRoutes);
        this.app.use('/api/public/pregunta',preguntaRoutes);
        this.app.use('/api/public/respuesta',respuestaRoutes);       
        this.app.use('/api/public/usuarios',usuarioRoutes);
        this.app.use('/api/public/procesos',procesosRoutes);
        this.app.use('/api/public/dimensiones',dimensionesRoutes);
      }

    public start(): void {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('servidor listo:', this.app.get('PORT'));
        });
    }
}

const server = new Server();
server.start();
