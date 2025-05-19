import 'dotenv/config';
import { z } from 'zod';
const envSchema = z.object( {
  SERVER_PORT: z.string().transform( port => parseInt( port ) ).default( '3333' ),
  SERVER_HOST: z.string().default( 'localhost' ),
  JWT_SECRET_KEY: z.string()
} );

const _env = envSchema.safeParse( process.env );
if ( !_env.success )
  throw new Error( 'Invalid environment variables' );

export const ENV = _env.data;

