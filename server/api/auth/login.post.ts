import { PrismaClient } from "@prisma/client"; 
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async(e) => {

    try {
        const body = await readBody(e)

        const {
            email,
            password
        } = body

        
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        const passMatch = bcrypt.compare(password, user?.password as string)

        if(!user || !passMatch){
            return createError({
                statusCode: 401,
                statusMessage: 'email or password not correct'
            })
        } else{
            const userData = {
                userID: user.id,
                name: user.name,
                email: user.email,
            }
            
            await setUserSession(e, {
                user: userData,
                loggedInAt: new Date()
            })
        }


        return {
            message: 'Logged in Successfully!',
            user
        }




    } catch (error) {
        console.log(error);
        
    }

})