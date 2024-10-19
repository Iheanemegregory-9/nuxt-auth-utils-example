<template>
  <div>
    <div v-if="loggedIn">

        {{ user }}

        <!-- {{ user.id }} -->

        {{ posts.length }} posts in total

        last login was {{ lastLogIn }}

    </div>


    <div>
      <textarea v-model="post"></textarea>
      <div>
        <button @click.prevent="createPost">Post</button>
      </div>
    </div>

    <div v-for="p in posts" :key="p.id">
      {{ p.text }}

      <div>
        <NuxtLink :to="`/item/${p.id}`">Read More</NuxtLink>
      </div>
    </div>



    <div>
      <button @click.prevent="logout" v-if="loggedIn">Logout</button>
      <button v-else @click.prevent="logout">Login</button>
    </div>
  </div> 
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})
const { loggedIn, user, session, fetch, clear } = useUserSession()

const lastLogIn = ref(session.value.loggedInAt)


const router = useRouter()
const post = ref('some posts')
const posts = ref({})


fetch()
const loggedInUser = ref()




const logout = async () => {
     clear()

     return await navigateTo('/login', {
      external: true
     })
    
};

const getPosts = async () => {
  const res = await $fetch('/api/posts/all', {
    query: {
      userId: user.value.userID
    }
  })

  posts.value = res.posts

 

  return res.posts
  
}

const createPost = async () => {
   const res = await $fetch('/api/posts/create', {
    method: 'POST',
    body: {
      text: post.value,
      userId: user.value.userID
    }
  })

  console.log(res.message);
  
  console.log(res.post);

  post.value = ''
  
  getPosts()
  // return res.post
}

onMounted(async() => {
    // await fetch()
    loggedInUser.value = user.value
   getPosts()
  //  console.log(user.value);
   
})


</script>

<style lang="scss" scoped></style> 