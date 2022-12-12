<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import PostCard from '../components/PostCard.vue';
import { profilesService } from '../services/ProfilesService';
import ProfileSearchResult from '../components/ProfileSearchResult.vue';
let route = useRoute()
let query = route.query.query

async function searchProfiles() {
    try {
        await profilesService.searchProfiles(query)
    } catch (error) {
        logger.log(error)
        Pop.error(error.message)
    }
}
async function searchPosts() {
    try {
        await postsService.searchPosts(query)
    } catch (error) {
        logger.log(error)
        Pop.error(error.message)
    }
}

onMounted(() => {
    searchProfiles();
    searchPosts();
})

</script>
<template>
    <div class="row">
        <ProfileSearchResult v-for="p in AppState.profiles" :profile="p" />
        <PostCard v-for="p in AppState.posts" :post="p" />
    </div>
</template>



<style lang="scss" scoped>

</style>