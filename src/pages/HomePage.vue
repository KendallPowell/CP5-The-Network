<template>
  <div class="container-fluid">
    <PostForm v-if="AppState.account.id" />
    <section class="row justify-content-center">
      <div v-for="p in AppState.posts" class="col-12 col-md-7 p-4">
        <PostCard :post="p" />
      </div>
    </section>
    <section class="row justify-content-center">
      <button class="col-4 btn btn-outline-danger" :disabled="(AppState.page == 1)" @click="previousPage()">
        Previous Page</button>
      <div class=" col-2 text-center">{{ AppState.page }} / {{ AppState.maxPage }}
      </div>
      <button class="col-4 btn btn-outline-primary" :disabled="(AppState.page == AppState.maxPage)"
        @click="nextPage()">Next Page</button>
    </section>
  </div>

</template>

<script setup>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js';
import { onMounted, computed } from "vue";
import PostCard from '../components/PostCard.vue';
import { AppState } from "../AppState.js";

async function nextPage() {
  try {
    AppState.page++
    await getPosts()
  } catch (error) {
    logger.log(error)
    Pop.error(error.message)
  }
}
async function previousPage() {
  try {
    AppState.page--
    await getPosts()
  } catch (error) {
    logger.log(error)
    Pop.error(error.message)
  }
}
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
  AppState.page = 1
})

</script>

<style scoped lang="scss">

</style>
