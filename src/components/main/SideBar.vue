<script setup lang="ts">
import FollowList from "@/components/main/FollowList.vue"
import Save from "../Icon/Save.vue";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, ref } from "vue";
import { useFollowStore } from "@/stores/follow";

const authStore = useAuthStore()

onMounted(async () => {
    await authStore.getAllUsers()
})

const users = computed(() => {
    return authStore.allUser
})

// Handle Follow
const followStore = useFollowStore()
const errorMessage = ref('')
async function follow(value: any) {
    console.log(value)
    await followStore.follow(value)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            errorMessage.value = err
        })
}
</script>

<template>
    <div class="space-y-8">
        <div>
            <p class="text-base font-semibold">Who to follow</p>
            <FollowList v-for="user in users.slice(0, 3)" :key="user.id" :users="user" @click="follow" />
        </div>
        <div>
            <p class="text-base font-semibold mb-3">Reading List</p>
            <p class="text-justify text-gray-500">
                Click the
                <span class="inline-block">
                    <Save class="w-4 h-4" />
                </span>
                on any story to easily add it to your reading list or a custom list that you can share.
            </p>
        </div>
    </div>
</template>