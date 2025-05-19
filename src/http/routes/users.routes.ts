import { Router } from 'express';
import { createUsersController } from '../controllers/users/create.controller';
import { login } from '../login/users.login';

const usersRouter = Router();

usersRouter.post( '/register', createUsersController );
usersRouter.post( '/login', login );

export default usersRouter;