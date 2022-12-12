<template>
    <div class="post elevation-2 col-10 my-3 p-0 text-info ms-5">
        <div class="cover-img" :style="`background-image: url(${profile.coverImg})`">
            <div class="d-flex align-items-center">
                <div class="col-3 m-2">
                    <RouterLink :to="{ name: 'Profile', params: { id: profile } }">
                        <img class="pic-img" :src="profile.picture" alt="no picture?">
                    </RouterLink>
                </div>
                <div class="col-9">
                    <h1>{{ profile.name }}</h1>
                    <p>{{ profile.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
defineProps({
    profile: {
        type: Object,
        required: true,
    }
})
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

.pic-img {
    height: 20vh;
    width: 15vw;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 1rem;
    cursor: pointer;
}

.cover-img {
    min-height: 15vh;
    width: 100%;
    background-size: cover;
    background-position: center;
}
</style>