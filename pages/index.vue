<script setup lang="ts">
// const route = useRoute()

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <!-- <NuxtRouteAnnouncer /> -->
  <div>
    <h1>Index</h1>
    <p @click="navigateTo('/dashboard')">Dashboard</p>
    <p @click="navigateTo('/login')">Login</p>
    <p @click="navigateTo('/signup')">Sign UP</p>
  </div>
</template>
