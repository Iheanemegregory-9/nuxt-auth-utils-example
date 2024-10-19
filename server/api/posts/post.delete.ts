import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (e) => {
    const body = await  readBody(e)

    await prisma.posts.delete({
        where: {
            id: body.id
        }
    })

    return {
        message: 'Post deleted successfully, redirecting you to the home page...'
    }
})