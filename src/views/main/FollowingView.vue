<script setup lang="ts">
import StoryList from '@/components/main/StoryList.vue';
import StoryLoading from '@/components/isLoading/StoryLoading.vue';
import { useFollowStore } from '@/stores/follow';
import { onMounted, ref } from 'vue';

const followStore = useFollowStore()

const isLoading = ref<boolean>(false)

onMounted(async () => {
    isLoading.value = true
    await followStore.getFollowingStories()
    isLoading.value = false
})
</script>
<template>
    <div class="mt-3" v-if="!isLoading">
        <StoryList v-for="story in followStore.followingStories" :key="story.id" :stories="story" />
    </div>
    <div class="mt-3" v-else>
        <StoryLoading />
        <StoryLoading />
        <StoryLoading />
        <StoryLoading />
    </div>
</template>