import { Router } from 'express';
import { createPostsController } from '../controllers/posts/create.controller';
import { readPostsController } from '../controllers/posts/read.controller';

const postsRouter = Router();

/**
 * @openapi
 * /pub/create:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Today I learned about JWT authentication with Node.js and Express!"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "Today I learned about JWT authentication with Node.js and Express!"
 *                 usersId:
 *                   type: integer
 *                   example: 123
 *                 createdAt:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-19"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-19T15:30:00Z"
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

/**
 * @openapi
 * /pub:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "Today I learned about JWT authentication with Node.js and Express!"
 *                   usersId:
 *                     type: integer
 *                     example: 123
 *                   createdAt:
 *                     type: string
 *                     format: date
 *                     example: "2025-05-19"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-05-19T15:30:00Z"
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

postsRouter.post( '/create', createPostsController );
postsRouter.get( '/', readPostsController );

export default postsRouter;
