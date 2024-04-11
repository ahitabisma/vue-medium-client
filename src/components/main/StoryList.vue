<script setup lang="ts">
import Follow from '../Icon/Follow.vue';
import Save from '../Icon/Save.vue';

const props = defineProps(['stories']);

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};


</script>

<template>
    <div class="space-y-3 md:space-y-4 border-b pb-6 pt-4 lg:pb-8 lg:pt-6">
        <div class="flex gap-5">
            <router-link :to="{ name: 'user-profile', params: { username: props.stories.author.username } }"
                class="flex gap-5 hover:underline">
                <img src="@/assets/img/profile.jpg" alt="" class="w-5 h-5 rounded-full">
                <p class="font-medium">{{ props.stories.author.full_name }}</p>
            </router-link>
            <!-- Gunakan fungsi formatDate untuk merubah format tanggal -->
            <router-link to="">{{ formatDate(props.stories.created_at) }}</router-link>
        </div>
        <router-link
            :to="{ name: 'user-story-detail', params: { username: props.stories.author.username, slug: props.stories.slug } }"
            class="flex">
            <div class="w-4/5 md:space-y-2 ">
                <p class="text-base font-bold">{{ props.stories.title }}</p>
                <p class="hidden md:line-clamp-2 lg:line-clamp-2">{{ props.stories.body }}</p>
            </div>
            <div class="w-1/5 md:flex md:items-center md:justify-center">
                <img src="@/assets/img/cover.jpeg" alt="" class="w-24 h-14 md:h-24 md:w-28">
            </div>
        </router-link>
        <div class="flex items-center text-xs md:w-4/5 md:text-sm">
            <router-link to="" class="flex w-4/5">
                <div v-if="props.stories.topic">
                    <p class="bg-gray-100 p-1 rounded-lg font-medium mr-3">{{ props.stories.topic }}</p>
                </div>
                <p class="p-1 text-gray-500">{{ props.stories.timetoRead }} min read</p>
            </router-link>
            <div class="flex w-1/5 justify-around ">
                <Save class="hover:text-gray-600" />
                <Follow class="hover:text-gray-600" />
            </div>
        </div>
    </div>
</template>
