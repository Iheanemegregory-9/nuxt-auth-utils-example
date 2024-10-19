import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (e) => {
    const query =  getQuery(e) 

    const userID = query.userId as string

   const posts = await prisma.posts.findMany({
    where: {
        userId: userID
    }
   })

    return {
        length: posts.length,
        posts
    }
})