import { FakeUserRepository } from '@/repositories/in-memory/fake-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user.errors'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUserService } from './register'

describe('register service', () => {
   it('should hash user password on register', async () => {
      const registerUserService = new RegisterUserService(
         new FakeUserRepository()
      )

      const password = '123456'

      const user = await registerUserService.create({
         email: 'pedroleinar@gmail.com',
         name: 'pedro',
         password,
      })

      const isCorrectlyHash = await compare(password, user.password_hash)

      expect(isCorrectlyHash).toBe(true)
   })

   it('should not be able to register with same e-mail', async () => {
      const registerUserService = new RegisterUserService(
         new FakeUserRepository()
      )

      const create = () =>
         registerUserService.create({
            email: 'pedroleinar@gmail.com',
            name: 'pedro',
            password: '123456',
         })

      await create()

      expect(create).rejects.toBeInstanceOf(UserAlreadyExistsError)
   })

   it('should be able to register', async () => {
      const registerUserService = new RegisterUserService(
         new FakeUserRepository()
      )

      const user = await registerUserService.create({
         email: 'pedroleinar@gmail.com',
         name: 'pedro',
         password: '123456',
      })

      expect(user.name).toBe('pedro')
   })
})
