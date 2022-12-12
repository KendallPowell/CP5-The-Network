<template>
    <section class="row justify-content-center mt-3">
        <div class="col-5 card p-3">
            <div></div>
            <form @submit.prevent="createPost()" class="row justify-content-center">
                <div class="form-group">
                    <label for="body"></label>
                    <input type="text" class="form-control" required name="body" placeholder="Share what's happening!">
                </div>
                <div class="form-group">
                    <label for="imgUrl"></label>
                    <input type="url" class="form-control" id="imgUrl" name="imgUrl" placeholder="Got an Image?">
                </div>
                <button class="btn btn-info w-25 rounded mt-2 p-1">Create Post</button>
            </form>
        </div>
    </section>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { Post } from '../models/Post';
async function createPost() {
    try {
        let form = event.target
        let rawPost = {
            body: form.body.value,
            imgUrl: form.imgUrl.value
        }
        await postsService.createPost(rawPost)
        Pop.toast('Post Created!', 'success')
        form.reset()
    } catch (error) {
        logger.error(error)
        Pop.error(error)
    }
}



</script>


<style lang="scss" scoped>

</style>