import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';



const options = {
  definition: {
    openapi: '3.0.0',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    info: {
      title: 'JWT Atuh - Todo List',
      description: 'A simple to-do list using JWT authentication and good practice of clean code',
      contact: {
        name: 'Rafael Citario',
        email: 'contato.rafaelgomes@outlook.com',
        linkedin: 'https://linkedin.com/in/rafaelcitario',
        url: 'https://github.com/rafaelcitario/JWT-ToDo-List'
      },
      version: '1.0.0',
    },
    servers: [
      { url: 'http://localhost:3333/', description: 'Local server' },
    ],
  },
  apis: ['./src/http/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc( options );

function swaggerDocs ( app: express.Application, port: number ) {
  app.use( '/docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec ) );
  app.get( '/docs.json', ( req, res ) => {
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( swaggerSpec );
  } );
}

export default swaggerDocs;