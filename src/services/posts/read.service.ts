import { FindPostsDTO } from '../../DTO/readPostsDTO';
import { findRepository } from '../../repositories/posts/find.repository';

export async function findService<T extends FindPostsDTO> ( data: T ): Promise<Array<object>> {
  const posts = await findRepository( data );
  return posts;
};