import { Router } from 'express';
import { createPostsController } from '../controllers/posts/create.controller';
import { readPostsController } from '../controllers/posts/read.controller';

const postsRouter = Router();

postsRouter.post( '/pub/create', createPostsController );
postsRouter.get( '/pub', readPostsController );
export default postsRouter;