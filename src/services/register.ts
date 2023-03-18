import { UserAlreadyExistsError } from '@/use-cases/errors/user.errors'
import { userSchemaType } from '@/lib/zod/user-schema'
import type { UserRepositoryInterface } from '@/repositories/user-repository-interface'
import { hash } from 'bcryptjs'

export class RegisterUserService {
   constructor(private userRepository: UserRepositoryInterface) {}

   async create(user: userSchemaType) {
      const password_hash = await hash(user.password, 6)

      const userWithSameEmail = await this.userRepository.findByEmail(user.email)

      if (userWithSameEmail) {
         throw new UserAlreadyExistsError()
      }

      return this.userRepository.create({ name: user.name, email: user.email, password_hash})
   }
}
