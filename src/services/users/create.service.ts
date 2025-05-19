import { UsersRequiredPayload } from '../../interfaces/usersPayload.interface';
import { usersRepository } from '../../repositories/users/create.repository';

export async function userService<T extends UsersRequiredPayload> ( data: T ) {
  await usersRepository( data );
}