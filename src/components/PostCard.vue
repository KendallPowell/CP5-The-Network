<template>
  <div class="post elevation-2 p-3 row">
    <div class="d-flex align-items-center gap-2">
      <div class="col-7 d-flex align-items-center">
        <RouterLink :to="{ name: 'Profile', params: { id: post.creatorId } }">
          <img :src="post.creator.picture" alt="account-picture" class="creatorImg"
            :title="`Go to ${post.creator.name}'s Profile Page'`">
        </RouterLink>
        <div class="row">
          <p class="m-0" title="Poster">{{ post.creator.name }}</p>
          <p>{{ ComputeFullDate(post.createdAt) }}</p>
        </div>
      </div>
      <div class="col-5 text-end">
        <button v-if="(post.creatorId == account.id)" @click="removePost(post.id)"
          class="btn btn-danger delete-btn rounded-pill me-3"><i class="mdi mdi-delete"></i></button>
        <i class="align-self-end">❤ = {{ post.likeIds.length }}</i>
      </div>
    </div>
    <div class="d-flex flex-column ">
      <div class="d-flex align-items-center justify-content-between">
        {{ post.body }}
        <img class="img-fluid img-url" :src="post.imgUrl" v-if="post.imgUrl"
          alt="hmmm uploading base-64 image? kind of cringe bro..">
      </div>
    </div>
  </div>
</template>




<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { Account } from '../models/Account';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';

export default {
  props: {
    post: {
      type: Post,
      required: true
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removePost() {
        try {
          await postsService.removePost(props.post.id)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      ComputeFullDate(date) {
        return new Date(date).toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
      },

    };
  },
  components: { RouterLink }
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