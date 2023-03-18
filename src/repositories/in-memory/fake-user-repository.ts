import { Prisma, User } from '@prisma/client'
import { UserRepositoryInterface } from '../user-repository-interface'

// to test
export class FakeUserRepository implements UserRepositoryInterface {
   public fakeDb: User[] = []

   async create({ name, email, password_hash }: Prisma.UserCreateInput) {
      const fakeUser = {
         id: 'user-1',
         name,
         email,
         password_hash,
         created_at: new Date(),
         updated_at: new Date(),
      }

      this.fakeDb.push(fakeUser)

      return fakeUser
   }
   async findByEmail(email: string) {
      return this.fakeDb.find((user) => user.email === email) || null
   }
}
