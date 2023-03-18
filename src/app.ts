import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { routes } from './http/routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler((error, request, reply) => {
   if (error instanceof ZodError) {
      return reply
         .status(400)
         .send({ message: 'validation error', issues: error.format() })
   }

   if (env.NODE_ENV !== 'production') {
      console.error(error)
   }

   // @ TODO: external log to production

   return reply.status(500).send({ message: 'internal server error' })
})
