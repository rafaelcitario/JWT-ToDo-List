import express, { Express } from 'express';
import { ENV } from './env';
import { middlewareAuth } from './http/middlewares/auth.middleware';
import postsRouter from './http/routes/posts.routes';
import usersRouter from './http/routes/users.routes';
import { warn } from 'node:console';

const app: Express = express();
app.use( express.json() );

app.use( '/', usersRouter );
app.use( '/', middlewareAuth, postsRouter );



app.listen( ENV.SERVER_PORT, ENV.SERVER_HOST, () => {
  const { SERVER_HOST, SERVER_PORT } = ENV;
  warn( `Server is up! http://${SERVER_HOST}:${SERVER_PORT}` );
} );