<template>
  <div class="container-fluid">
    <PostForm v-if="AppState.account.id" />
    <section class="row justify-content-center">
      <div v-for="p in AppState.posts" class="col-12 col-md-7 p-4">
        <PostCard :post="p" />
      </div>
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
import { adsService } from "../services/AdsService";

async function getPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    logger.log(error)
    Pop.error(error.message)
  }
}
async function getAds() {
  try {
    await adsService.getAds()
  } catch (error) {
    logger.log(error)
    Pop.error(error.message)
  }
}
onMounted(() => {
  getPosts();
  getAds();
})

</script>

<style scoped lang="scss">

</style>
