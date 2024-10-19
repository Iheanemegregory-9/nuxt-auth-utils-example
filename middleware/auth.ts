
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserSession()

    if(!user.loggedIn.value){
     return navigateTo('login')
    }

    // you may need to add some extra login to this
    
})