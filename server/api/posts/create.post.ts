import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (e) => {
    const body = await readBody(e)

    const {
        text,
        userId
    } = body

        const post = await prisma.posts.create({
            data: {
                text,
                userId
            },
        })
    

    return {
        message: 'post created successfully',
        post
    }
})