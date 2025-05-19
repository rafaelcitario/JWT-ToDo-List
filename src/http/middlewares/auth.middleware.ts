import { NextFunction, Request, Response } from 'express';
import { ENV } from '../../env';
import { customError } from '../../errors/errorTypes';
import jwt from 'jsonwebtoken';
import { warn } from 'node:console';


const JWT_SECRET_KEY = ENV.JWT_SECRET_KEY;
export function middlewareAuth ( req: Request, res: Response, next: NextFunction ) {
  const { authorization, usersid } = req.headers;
  if ( !authorization || !authorization.startsWith( 'Bearer ' ) || !usersid ) {
    res.send( customError( 'CLIENT_400' ) );
    throw customError( 'CLIENT_400' );
  }

  try {
    const token = authorization.split( ' ' )[1];
    jwt.verify( token, JWT_SECRET_KEY ) as { usersId: number; };
    next();
  } catch ( e ) {
    const typedError = e as Error;
    const error = customError( 'CLIENT_401', typedError );
    res.status( 401 ).send( error );
  }
}