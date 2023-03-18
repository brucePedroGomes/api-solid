import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register'

export async function routes(app: FastifyInstance) {
   app.post('/users', registerController)
}