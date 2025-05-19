import { Request, Response } from 'express';
import { ENV } from '../../env';
import { LoginPayload } from '../../interfaces/loginPayload.interface';
import { createHash } from 'node:crypto';
import { customError } from '../../errors/errorTypes';
import jwt from 'jsonwebtoken';
import { loginService } from '../../services/users/login.service';

/**
 * Controller to authenticate a user and generate a JWT token.
 * 
 * Expects JSON body with:
 * - username: string (required)
 * - password: string (required)
 * 
 * Password is hashed using SHA-512 and compared with stored hash.
 * On success, returns a signed JWT token valid for 15 minutes.
 * 
 * @param req.body { username, password }
 * 
 * @returns 200 OK - Returns JWT token and user ID on successful login.
 * @returns 400 Bad Request - Missing username or password.
 * @returns 401 Unauthorized - Invalid username or password.
 */
export async function login ( req: Request<object, object, LoginPayload>, res: Response ): Promise<void> {
  const { username, password } = req.body;

  if ( !username || !password ) {
    res.status( 400 ).send( customError( 'CLIENT_400' ) );
    throw new Error( customError( 'CLIENT_400' ) );
  }

  const hash = createHash( 'sha512' );
  const password_hash = hash.update( password ).digest( 'base64' );

  const isLoginSuccess = await loginService( { username, password_hash } );

  if ( !isLoginSuccess ) {
    res.status( 401 ).send( 'Email and password must be correct to log in. Please verify your credentials and try again.' );
    return;
  }

  const token = jwt.sign(
    { usersId: isLoginSuccess.id },
    ENV.JWT_SECRET_KEY,
    { algorithm: 'HS512', expiresIn: '15min' }
  );

  res.status( 200 ).json( {
    message: 'Login successful!',
    token,
    usersId: isLoginSuccess.id
  } );
}
