<template>
    <div>
        <div>
            <div>
              
                <input type="email" placeholder="email" v-model="email">
                <input type="password" v-model="password">
            </div>
            <div>
                <button @click.prevent="login">Login</button> or 
                <NuxtLink to="/signup">Sign Up</NuxtLink>
            </div>
           
        </div>
    </div>
</template>

<script lang="ts" setup>


const email = ref("")
const password = ref("")

async function login() {
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        });

        // Await navigateTo for proper async flow
        navigateTo('/dashboard');
    } catch (error) {
        // Handle login error (e.g., wrong credentials)
        console.error('Login failed:', error);
        // You can show a message to the user here
    }
}


</script>

<style>

</style>