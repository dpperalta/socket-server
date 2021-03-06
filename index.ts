import Server from './classes/server';
import { SERVER_PORT } from './global/environment';
import router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance; //Usando en patrón Singleton

// Body Parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de Servicios
server.app.use('/', router);

server.start(() => {
    console.log(`El servidor está corriendo el el puerto ${ SERVER_PORT }`);
});