import { PrismaClient } from '../generated/prisma';

export function isPrismaExists<T extends PrismaClient> ( prisma?: T ): PrismaClient {
  return prisma ?? new PrismaClient();
}