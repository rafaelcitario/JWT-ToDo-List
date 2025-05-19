import { NextFunction, Request, Response } from 'express';
import { ENV } from '../../env';
import { customError } from '../../errors/errorTypes';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = ENV.JWT_SECRET_KEY;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Middleware responsável por proteger rotas com autenticação JWT.
 */

/**
 * Middleware de autenticação JWT.
 * 
 * Verifica se o header Authorization está presente e contém um token válido
 * no formato "Bearer <token>", além de exigir o header `usersid`.
 * 
 * Caso o token seja válido, permite o acesso à próxima função (next).
 * Caso contrário, retorna erro 400 ou 401 conforme a falha.
 * 
 * @function
 * @name middlewareAuth
 * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 * @param {NextFunction} next - Próxima função middleware.
 * 
 * @returns {void}
 * 
 * @throws {customError} CLIENT_400 - Se o token JWT estiver ausente ou mal formatado.
 * @throws {customError} CLIENT_401 - Se o token JWT for inválido ou expirado.
 * 
 * @example
 * // Rota protegida usando o middleware
 * app.use('/posts', middlewareAuth, postsRouter);
 */
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