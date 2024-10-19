import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { navigateTo } from 'nuxt/app'

const prisma = new PrismaClient()

export default defineEventHandler(async(e) => {
    try {
        const body = await readBody(e)

        // console.log(body);
        

        const {name, email, password} = body

        const salt = await bcrypt.genSalt()

        const hP = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hP
            } 
        })

        const userData = {
            userID: user.id,
            name: user.name,
            email: user.email,
        }

        await setUserSession(e, {
            user: userData,
            loggedInAt : new Date()
        })

        

        return {
            message: 'user registered',
            user
        }


    } catch (error) {
        console.log(error);
        
    }
})