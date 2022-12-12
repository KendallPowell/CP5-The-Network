<template>
    <div class="container-fluid">
        <div v-if="AppState.activeProfile" class="row cover-img text-primary"
            :style="`background-image: url(${AppState.activeProfile.coverImg})`">
            <div class="col-12 d-flex align-items-center">
                <img :src="AppState.activeProfile.picture" alt="" class="img-fluid profile-pic rounded-circle">
                <div class="bg-transparent rounded p-3 ms-3">
                    <h1>{{ AppState.activeProfile.name }}</h1>
                    <h4>{{ AppState.activeProfile.bio }}</h4>
                </div>
            </div>
            <div class="col-12">
                <div class="row justify-content-around">
                    <div class="col-5 text-end">
                        <h5>{{ AppState.activeProfile.class }}</h5>
                        <h5>Graduated: {{ AppState.activeProfile.graduated }}</h5>
                        <h5>"{{ AppState.activeProfile.email }}"</h5>
                    </div>
                    <div class="col-5 text-start">
                        <h6>{{ AppState.activeProfile.resume }}</h6>
                        <h5><i class="mdi mdi-github">{{ AppState.activeProfile.github }}</i></h5>
                        <h5><i class="mdi mdi-linkedin"></i>{{ AppState.activeProfile.linkedin }}</h5>
                    </div>
                </div>
            </div>
        </div>
        <section class="row justify-content-center">
            <div v-for="p in AppState.posts" :key="p.id" class="col-12 col-md-7 p-4">
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
async function nextPage() {
    try {
        AppState.page++
        await getPostsByCreatorId()
    } catch (error) {
        logger.log(error)
        Pop.error(error.message)
    }
}
async function previousPage() {
    try {
        AppState.page--
        await getPostsByCreatorId()
    } catch (error) {
        logger.log(error)
        Pop.error(error.message)
    }
}


// function determineGraduation() {
//     if (profile.graduated == false) {
//         return `No`
//     } else {
//         return `Yes`
//     }
// }

onMounted(() => {
    getProfileById();
    getPostsByCreatorId();
    AppState.page = 1
    // determineGraduation();
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