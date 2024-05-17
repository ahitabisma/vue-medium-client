<script setup lang="ts">
import StoryList from '@/components/main/StoryList.vue'
import StoryLoading from '@/components/isLoading/StoryLoading.vue'
import { useFollowStore } from '@/stores/follow'
import { onMounted, ref } from 'vue'

const followStore = useFollowStore()

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await followStore.getFollowingStories()
  isLoading.value = false
})
</script>
<template>
  <div v-if="followStore.followingStories.length !== 0">
    <div class="mt-3" v-if="!isLoading">
      <StoryList v-for="story in followStore.followingStories" :key="story.id" :stories="story" />
    </div>
    <div class="mt-3" v-else>
      <StoryLoading />
      <StoryLoading />
      <StoryLoading />
      <StoryLoading />
    </div>
  </div>
  <div v-else>
    <p class="mt-5 font-semibold text-2xl">You haven't followed anyone yet</p>
  </div>
</template>
