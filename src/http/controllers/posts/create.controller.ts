import { Request, Response } from 'express';
import { CreatePostsDTO } from '../../../DTO/createPostsDTO';
import { customError } from '../../../errors/errorTypes';
import { postService } from '../../../services/posts/create.service';

/**
 * Controller to create a new post.
 * 
 * @param req.headers.usersid - Required user ID as a header (number).
 * @param req.body.content - Required post content (string).
 * 
 * @returns 201 Created - Post created successfully.
 * @returns 400 Bad Request - Missing content or usersId, or validation failure.
 * 
 * @throws Throws error with CLIENT_400 code on bad request or service failure.
 */
export async function createPostsController (
  req: Pick<Request, 'headers' | 'body'>,
  res: Response
) {
  if ( !req.body.content || !req.headers.usersid ) {
    res.status( 400 ).send( 'Bad Request' + customError( 'CLIENT_400' ) );
    throw new Error( customError( 'CLIENT_400' ) );
  }

  try {
    const data: CreatePostsDTO = {
      content: req.body.content,
      usersId: +req.headers.usersid,
    };

    await postService( data );
    res.status( 201 ).send( 'Post created successfully' );
  } catch ( e ) {
    const typedError = e as Error;
    const error = customError( 'CLIENT_400', typedError );
    res.status( 400 ).send( error );
  }
}
