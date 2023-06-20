import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // Se o node-env for dev vai ser query, se não vai ser vazio. Com isso em ambiente de desenvolvimento será exibido o log no terminal e na produção praticamente somente os logs de erro.
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
