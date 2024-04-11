<script setup lang="ts">
import { useStoriesStore } from '@/stores/stories';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const storyStore = useStoriesStore()
const route = useRoute()

onMounted(async () => {
    await storyStore.getStoryByUsernameSlug(route.params.username, route.params.slug)
})
</script>

<template>
    <!-- <div>{{ storyStore.story }}</div> -->
    <div class="mx-6 md:mx-10 lg:mx-56">
        <p class="font-bold text-2xl">{{ storyStore.story.title }}</p>
        <div>
            <div v-html="storyStore.story.body"></div>
        </div>
    </div>
</template>