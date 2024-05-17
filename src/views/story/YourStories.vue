<script setup lang="ts">
import StoryList from '@/components/main/StoryList.vue'
import Navbar from '@/components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'
import { useStoriesStore } from '@/stores/stories'
import { onMounted, reactive } from 'vue'

const authStore = useAuthStore()
const myStoryData = reactive({
  author: authStore.userDetail.id
})

const storyStore = useStoriesStore()

onMounted(async () => {
  await storyStore
    .getMyStories(myStoryData)
    .then(() => {
      console.log(storyStore.stories)
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div>
    <Navbar />
    <div class="mx-5 mt-5 md:mx-10 lg:mx-40">
      <div class="flex items-center justify-between mb-5">
        <p class="text-2xl font-semibold">Your Stories</p>
        <router-link
          :to="{ name: 'new-story' }"
          class="py-1 px-3 lg:mr-14 text-white bg-green-700 rounded-full hover:bg-green-800"
        >
          Write a story
        </router-link>
      </div>
      <div>
        <div
          v-for="story in storyStore.stories"
          :key="story.id"
          class="space-y-3 md:space-y-4 border-b pb-6 pt-4 lg:pb-8 lg:pt-6"
        >
          <router-link to="" class="flex">
            <div class="w-4/5 md:space-y-2">
              <p class="text-base font-bold">{{ story.title }}</p>
              <p class="hidden md:line-clamp-2 lg:line-clamp-2">{{ story.body }}</p>
            </div>
            <div class="w-1/5 md:flex md:items-center md:justify-center">
              <img src="@/assets/img/cover.jpeg" alt="" class="w-24 h-14 md:h-24 md:w-28" />
            </div>
          </router-link>
          <div class="flex items-center text-xs md:w-4/5 md:text-sm">
            <router-link to="" class="flex w-4/5">
              <div v-if="story.topic">
                <p class="bg-gray-100 p-1 rounded-lg font-medium mr-3">{{ story.topic }}</p>
              </div>
              <p class="p-1 text-gray-500">{{ story.timetoRead }} min read</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
