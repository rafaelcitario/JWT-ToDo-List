import { Request, Response } from 'express';
import { ENV } from '../../env';
import { LoginPayload } from '../../interfaces/loginPayload.interface';
import { createHash } from 'node:crypto';
import { customError } from '../../errors/errorTypes';
import jwt from 'jsonwebtoken';
import { loginService } from '../../services/users/login.service';


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
    res.send( 'E-mail e senha precisam estar corretos para efetuar o login, confira os dados e tente novamente.' );
    return;
  }

  const token = jwt.sign( { usersId: isLoginSuccess.id }, ENV.JWT_SECRET_KEY, { algorithm: 'HS512', expiresIn: '15Mins' } );
  res.status( 200 ).json( {
    message: 'Login efetuado com sucesso!',
    token,
    usersId: isLoginSuccess.id
  } );
  return;
}