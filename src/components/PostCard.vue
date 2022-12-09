<template>
  <div class="post elevation-2 p-3 row">
    <div class="d-flex align-items-center gap-2">
      <div class="col-7 d-flex align-items-center">
        <!-- <RouterLink> -->
        <img :src="post.creator.picture" alt="account-picture" class="creatorImg">
        <!-- </RouterLink> -->
        <div class="row">
          <p class="m-0" title="Poster">{{ post.creator.name }}</p>
          <p>{{ post.createdAt }}</p>
        </div>
      </div>
      <div class="col-5 text-end">
        <i class="align-self-end">❤ = {{ post.likeIds.length }}</i>
      </div>
    </div>
    <div class="d-flex flex-column ">
      <div class="d-flex align-items-center justify-content-between">
        {{ post.body }}
        <img class="img-fluid img-url" :src="post.imgUrl" alt="">
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";

export default {
  props: {
    post: {
      type: Post,
      required: true
    },
  },
  setup() {
    return {
      get ComputeFullDate() {
        date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.post {
  display: flex;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  justify-content: space-between;
}

.img-url {
  height: 20vh;
  width: 20vw;
  border-radius: 10px;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.creatorImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  cursor: pointer;
}
</style>