<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore()
const route = useRoute()

const username = route.params.username

onMounted(async () => {
    await authStore.getUserByUsername(username)
})
</script>
<template>
    <div>
        {{ authStore.userByUsername }}
    </div>
</template>