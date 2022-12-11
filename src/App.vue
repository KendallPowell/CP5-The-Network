<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <AdCard />
  </main>
  <footer class="bg-info text-light">
    Welcome to.. The Network!
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import AdCard from './components/AdCard.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, AdCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
