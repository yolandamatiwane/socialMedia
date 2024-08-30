<template>
  <div>
    <section v-for="post in $store.state.posts " :key="post.post_id">
      {{ post.created_at }}
      {{ post.post_id }}
      {{ post.content }}
    </section>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  methods:{
    getPosts(){
      this.$store.dispatch('fetchPosts')
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
