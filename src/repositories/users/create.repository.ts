import { CreateUsersDTO } from '../../DTO/createUsersDTO';
import { customError } from '../../errors/errorTypes';
import { isPrismaExists } from '../../validators/prisma.validator';


export async function usersRepository ( data: CreateUsersDTO ): Promise<void> {
  const database = isPrismaExists();
  try {
    await database.users.create( {
      data: {
        username: data.username,
        name: data.name,
        password_hash: data.password_hash,
        createdAt: new Date()
      }
    } );
  } catch ( e ) {
    const typedError = e as Error;
    throw new Error( customError( 'SERVER_500', typedError ) );
  }
};