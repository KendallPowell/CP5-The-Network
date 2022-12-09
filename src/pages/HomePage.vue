<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div v-for="p in posts" class="col-12 col-md-8 p-4">
        <PostCard :post="p" />
      </div>
    </section>
  </div>

</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js';
import { onMounted, computed } from "vue";
import PostCard from '../components/PostCard.vue';
import { AppState } from "../AppState.js";


export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getPosts();
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
