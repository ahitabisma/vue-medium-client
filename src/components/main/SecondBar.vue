<script setup lang="ts">
import Plus from '../Icon/Plus.vue';

// const props = defineProps(['userId'])

</script>

<template>
    <nav class="w-full pt-2 md:pt-4 lg:pt-6 space-x-7 flex sticky top-0 z-10 bg-white border-b">
        <router-link to="">
            <div class="bg-white rounded-full hover:brightness-90">
                <Plus class="hover:brightness-75" />
            </div>
        </router-link>
        <router-link :to="{ name: 'main' }"
            class=" hover:text-gray-600 hover:border-gray-600 hover:border-b pb-3 md:pb-5"
            active-class="text-gray-600 border-gray-600 border-b">
            Explore
        </router-link>
        <router-link :to="{ name: 'following' }"
            class="hover:text-gray-600 hover:border-gray-600 hover:border-b pb-3 md:pb-5"
            active-class="text-gray-600 border-gray-600 border-b">
            Following
            <!-- <div>{{ props.userId }}</div> -->
        </router-link>
    </nav>
</template>