import { CreatePostsDTO } from '../../DTO/createPostsDTO';
import { postsRepository } from '../../repositories/posts/create.repository';

export async function postService<T extends CreatePostsDTO> ( data: T ) {
  await postsRepository( data );
}