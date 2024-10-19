<template>
  <div>
    <div>
      <input type="text" placeholder="name" v-model="name">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" v-model="password">
    </div>
    <div>
      <button @click.prevent="onSubmit">Create</button> or <NuxtLink to="/login">Sign In</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

const name = ref('')
const email = ref('')
const password = ref('')

async function onSubmit() {

  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    });

    // Redirect on success
   navigateTo('/dashboard');
  } catch (error) {
    // Handle error (e.g., show a message to the user)
    console.error('Signup failed:', error);
  }

  
}


</script>

<style>

</style>