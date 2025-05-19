import { FindManyPostsReturn } from '../../interfaces/postsReturn.interface';
import { FindPostsDTO } from '../../DTO/readPostsDTO';
import { customError } from '../../errors/errorTypes';
import { isPrismaExists } from '../../validators/prisma.validator';


export async function findRepository ( data: FindPostsDTO ): Promise<FindManyPostsReturn[]> {
  const database = isPrismaExists();
  try {
    database.$connect();
    const posts = await database.posts.findMany( {
      select: { content: true, updatedAt: true },
      take: 10,
      where: {
        usersId: data.usersId
      }
    } );
    database.$disconnect();
    return posts;
  } catch ( e ) {
    const typedError = e as Error;
    const error = customError( 'SERVER_500', typedError );
    throw error;
  }
};