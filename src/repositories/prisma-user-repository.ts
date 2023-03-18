import { Prisma } from '@prisma/client'
import { db } from '../lib/prisma'
import type { UserRepositoryInterface } from './user-repository-interface'

export class PrismaUserRepository implements UserRepositoryInterface {
   async findByEmail(email: string) {
      return db.user.findUnique({
         where: {
            email,
         },
      })
   }

   async create(user: Prisma.UserCreateInput) {
      return db.user.create({ data: user })
   }
}
