<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ad } from '../models/Ad';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { adsService } from '../services/AdsService';

async function getAds() {
    try {
        await adsService.getAds()
    } catch (error) {
        logger.log(error)
        Pop.error(error.message)
    }
}
onMounted(() => {
    getAds();
})
</script>

<template>
    <section>
        <img v-for="img in AppState.ads" :src="img.tall" alt="ad">
    </section>
</template>




<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

img {
    width: 10rem;
    height: auto;
    object-fit: cover;
}
</style>