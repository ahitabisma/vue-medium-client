<script setup lang="ts">
import StoryList from '@/components/main/StoryList.vue';
import StoryLoading from '@/components/isLoading/StoryLoading.vue';
import { useStoriesStore } from '@/stores/stories';
import { computed, onMounted, ref } from 'vue';

const storiesStore = useStoriesStore()
const stories = computed(() => {
  return storiesStore.stories
})

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await storiesStore.getAllStories()
  isLoading.value = false
})
</script>
<template>
  <div class="ml-10 mr-5">

    <div class="mt-3" v-if="!isLoading">
      <StoryList v-for="story in stories" :key="story.id" :stories="story" />
    </div>
    <div class="mt-3" v-else>
      <StoryLoading />
      <StoryLoading />
      <StoryLoading />
    </div>
  </div>
</template>