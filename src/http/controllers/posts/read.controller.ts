import { Request, Response } from 'express';
import { customError } from '../../../errors/errorTypes';
import { findService } from '../../../services/posts/read.service';

/**
 * Controller to retrieve all posts for a given user.
 * 
 * @param req.headers.usersid - Required user ID as a header (number).
 * 
 * @returns 200 OK - Returns an array of posts.
 * @returns 400 Bad Request - If usersid is missing, invalid, or <= 0.
 * 
 * @throws Throws CLIENT_400 error on invalid input or service failure.
 */
export async function readPostsController ( req: Pick<Request, 'headers'>, res: Response ) {
  const { usersid } = req.headers;

  if ( !usersid || +usersid <= 0 || isNaN( +usersid ) ) {
    const error = customError( 'CLIENT_400' );
    res.status( 400 ).send( error );
    throw error;
  }

  try {
    const data = { usersId: +usersid };
    const posts = await findService( data );
    res.status( 200 ).json( posts );
  } catch ( e ) {
    const typedError = e as Error;
    const error = customError( 'CLIENT_400', typedError );
    res.status( 400 ).send( error );
    throw error;
  }
}
