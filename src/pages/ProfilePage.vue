<template>
    <div class="container-fluid">
        <div v-if="AppState.activeProfile" class="row cover-img"
            :style="`background-image: url(${AppState.activeProfile.coverImg})`">
            <div class="col-12 d-flex align-items-center justify-content-around">
                <img :src="AppState.activeProfile.picture" alt="" class="img-fluid profile-pic rounded-circle mt-2">
                <div class="bg-transparent rounded p-5">
                    <h1>
                        <h1>{{ AppState.activeProfile.name }}</h1>
                    </h1>
                    <h2>
                        <h1>{{ AppState.activeProfile.bio }}</h1>
                    </h2>
                </div>
                <!-- <h1>{{ AppState.activeProfile.github }}</h1> -->
                <!-- <h1>{{ AppState.activeProfile.linkedin }}</h1> -->
                <!-- <h1>{{ AppState.activeProfile.resume }}</h1> -->
                <!-- <h1>{{ AppState.activeProfile.coverImg }}</h1> -->
                <!-- <h1>{{ AppState.activeProfile.graduated }}</h1> -->
                <!-- <h1>{{ AppState.activeProfile.class }}</h1> -->

            </div>
        </div>
        <section class="row justify-content-center">
            <div v-for="p in AppState.posts" :key="p.id" class="col-12 col-md-7 p-4">
                <PostCard :post="p" />
            </div>
        </section>
    </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService';
import { postsService } from '../services/PostsService';
// let posts = computed(() => {
//     return AppState.posts
// })
// let profile = computed(() => {
//     return AppState.activeProfile
// })

const route = useRoute();
async function getProfileById() {
    try {
        await profilesService.getProfileById(route.params.id)
    } catch (error) {
        logger.error(error);
        Pop.error(error.message);
    }
}
async function getPostsByCreatorId() {
    try {
        await postsService.getPostsByCreatorId(route.params.id)
    } catch (error) {
        logger.error(error);
        Pop.error(error.message);
    }
}
onMounted(() => {
    getProfileById();
    getPostsByCreatorId();
})

</script>


<style lang="scss" scoped>
.profile-pic {
    height: 30vh;
    width: 35vh;
}

.cover-img {
    min-height: 50vh;
    background-size: cover;
    background-position: center;
}
</style>