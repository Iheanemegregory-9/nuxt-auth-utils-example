<template>
  <div>
    {{ post.text }} 
    {{ post.id }}

    <div>
      <button @click.prevent="deletePost">
        Delete
      </button>
    </div>
  </div>
</template>

<script  setup>

const { loggedIn, user, session, fetch, clear } = useUserSession()

const route = useRoute()

const post = ref('')
const id = ref('')


await fetch() 

const getSinglePost = async () => {
  const res = await $fetch(`/api/posts/${route.params.id}`, {
    query: {
      userId: user.value.userID, 
      id: route.params.id
    }
  })

  post.value = res.post
  id.value = res.id

  console.log(user.value.userID);
  console.log(route.params.id);
  
  
  return console.log(post);
}

const deletePost = async () => {
  console.log(post.value.id);
  
 await $fetch(`/api/posts/post`, {
    method: 'DELETE',
    body: {
      id: post.value.id
    }
  })

    navigateTo('/dashboard')
}

onMounted(() => {
  getSinglePost()
})

</script>

<style>
 
</style>