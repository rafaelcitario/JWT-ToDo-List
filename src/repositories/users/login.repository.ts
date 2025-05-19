import { LoginRequiredPayload } from '../../interfaces/loginPayload.interface';
import { customError } from '../../errors/errorTypes';
import { isPrismaExists } from '../../validators/prisma.validator';

export async function loginRepository ( data: LoginRequiredPayload ) {
  const database = isPrismaExists();
  try {
    const login = await database.users.findFirst( {
      where: {
        username: data.username,
        password_hash: data.password_hash
      },
    } );

    if ( login !== null ) {
      const { id, name, username } = login;
      return ( { id, name, username } );
    }

    return null;
  } catch ( e ) {
    const typedError = e as Error;
    throw new Error( customError( 'SERVER_500', typedError ) );
  }
}