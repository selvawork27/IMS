import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

// 1. Define a function to create the client + adapter
const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })

  return new PrismaClient({ adapter })
}

// 2. Extend the global object to prevent multiple instances
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

// 3. Export a single instance
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// 4. Save the instance to the global object in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma