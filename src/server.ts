import { ENV } from './env';
import express from 'express';
import { middlewareAuth } from './http/middlewares/auth.middleware';
import postsRouter from './http/routes/posts.routes';
import swaggerDocs from '../swagger-ui.config';
import usersRouter from './http/routes/users.routes';
import { warn } from 'node:console';

import cors from 'cors';


const app: express.Application = express();
app.use( cors( {
  origin: 'http://localhost:5173',
  credentials: true
} ) );
app.use( express.json() );
swaggerDocs( app, ENV.SERVER_PORT );
app.use( '/', usersRouter );
app.use( '/pub', middlewareAuth, postsRouter );



app.listen( ENV.SERVER_PORT, ENV.SERVER_HOST, () => {
  const { SERVER_HOST, SERVER_PORT } = ENV;
  warn( `Server is up! http://${SERVER_HOST}:${SERVER_PORT}` );
} );