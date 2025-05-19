import { Request, Response } from 'express';
import { CreatePostsDTO } from '../../../DTO/createPostsDTO';
import { customError } from '../../../errors/errorTypes';
import { postService } from '../../../services/posts/create.service';


export async function createPostsController ( req: Pick<Request, 'headers' | 'body'>, res: Response ) {
  if ( !req.body.content || !req.headers.usersid ) {
    res.status( 400 ).send( 'Bed Request' + customError( 'CLIENT_400' ) );
    throw new Error( customError( 'CLIENT_400' ) );
  }

  try {
    const data: CreatePostsDTO = {
      content: req.body.content,
      usersId: +req.headers.usersid
    };

    await postService( data );
    res.status( 200 ).send( data );
  } catch ( e ) {
    const typedError = e as Error;
    const error = customError( 'CLIENT_400', typedError );
    res.status( 400 ).send( error );
  }
}