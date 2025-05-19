import { CreatePostsDTO } from '../../DTO/createPostsDTO';
import { customError } from '../../errors/errorTypes';
import { isPrismaExists } from '../../validators/prisma.validator';


export async function postsRepository ( data: CreatePostsDTO ): Promise<void> {
  const database = isPrismaExists();
  const { content, usersId } = data;
  try {
    await database.posts.create( {
      data: {
        content,
        usersId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    } );
  } catch ( e ) {
    const typedError = e as Error;
    throw new Error( customError( 'SERVER_500', typedError ) );
  }
};