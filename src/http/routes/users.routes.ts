import { Router } from 'express';
import { createUsersController } from '../controllers/users/create.controller';
import { login } from '../login/users.login';

const usersRouter = Router();

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rafael Citario
 *               username:
 *                 type: string
 *                 format: email
 *                 example: contato.rafaelgomes@outlook.com
 *               password:
 *                 type: string
 *                 example: minhaSenhaSecreta123
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Rafael Citario
 *                 username:
 *                   type: string
 *                   format: email
 *                   example: contato.rafaelgomes@outlook.com
 *                 createdAt:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-19"
 *       400:
 *         description: Invalid request body or user already exists
 */

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate user and return JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *                 example: contato.rafaelgomes@outlook.com
 *               password:
 *                 type: string
 *                 example: minhaSenhaSecreta123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       401:
 *         description: Invalid credentials
 */

usersRouter.post( '/register', createUsersController );
usersRouter.post( '/login', login );

export default usersRouter;
