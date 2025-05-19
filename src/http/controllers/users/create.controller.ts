import { Request, Response } from 'express';
import { UsersPayload } from '../../../interfaces/usersPayload.interface';
import { createHash } from 'node:crypto';
import { customError } from '../../../errors/errorTypes';
import { userService } from '../../../services/users/create.service';


export async function createUsersController ( req: Request<object, object, UsersPayload>, res: Response ) {
  const { name, username, password } = req.body;

  try {
    if ( !name || !username || !password ) {
      res.status( 400 ).send( 'Bed Request' + customError( 'CLIENT_400' ) );
      throw new Error( customError( 'CLIENT_400' ) );
    }
    const hash = createHash( 'sha512' );
    const password_hash = hash.update( password ).digest( 'base64' );
    await userService( { name, username, password_hash } );
    res.status( 200 ).send( 'Success' );
  } catch ( e ) {
    const typedError = e as Error;
    const error = customError( 'CLIENT_400', typedError );
    res.status( 400 ).send( error );
  }
}