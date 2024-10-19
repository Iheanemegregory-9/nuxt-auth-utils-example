import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (e) => {
     const query = getQuery(e)

     const userId = query.userId as string
     const postId = query.id as string

     const post = await prisma.posts.findUnique({
        where: {
            id: postId,
            userId: userId
        }
     })

     return {
        post
     }
})