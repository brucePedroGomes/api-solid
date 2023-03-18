import type { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUserService } from '@/services/register'
import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
import { userSchema } from '@/lib/zod/user-schema'
import { UserAlreadyExistsError } from '@/use-cases/errors/user.errors'

export async function registerController(
   request: FastifyRequest,
   reply: FastifyReply
) {
   const userRepository = new RegisterUserService(new PrismaUserRepository())

   const user = userSchema.parse(request.body)

   try {
      await userRepository.create(user)
   } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
         return reply.status(409).send({ message: error.message })
      }

      throw error
   }

   return reply.status(201).send()
}
