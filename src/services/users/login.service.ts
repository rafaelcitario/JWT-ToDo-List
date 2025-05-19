import { LoginRequiredPayload } from '../../interfaces/loginPayload.interface';
import { loginRepository } from '../../repositories/users/login.repository';

export async function loginService<T extends LoginRequiredPayload> ( data: T ) {
  return await loginRepository( data );
}