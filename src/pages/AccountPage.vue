<template>
  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="my-2">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
          </div>
          <div class="my-2">
            <label for="email" class="form-label">Email</label>
            <input v-model="editable.email" type="text" required class="form-control" id="email">
          </div>
          <div class="my-2">
            <label for="class" class="form-label">Class of</label>
            <input v-model="editable.class" type="text" required class="form-control" id="class">
          </div>
          <div class="my-2">
            <label for="github" class="form-label">GitHub</label>
            <input v-model="editable.github" type="text" required class="form-control" id="github">
          </div>
          <div class="my-2">
            <label for="linkedin" class="form-label">LinkedIn</label>
            <input v-model="editable.linkedin" type="text" required class="form-control" id="linkedin">
          </div>
          <div class="my-1">
            <label for="coverImg" class="form-label">Cover Image</label>
            <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg">
          </div>
          <div class="my-1">
            <label for="picture" class="form-label">Profile Picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture">
          </div>
          <div class="my-1">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <button class="btn btn-success mt-2"><i class="mdi mdi-floppy"></i>Save Info</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
