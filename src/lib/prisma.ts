import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      $allOperations({ operation, model, args, query }) {
        const start = performance.now();
        return query(args).finally(() => {
          const end = performance.now();
          console.log(`${model}.${operation} took ${end - start}ms`);
        });
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma; 
