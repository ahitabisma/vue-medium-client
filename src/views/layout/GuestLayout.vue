<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
    <div>
        <div v-if="$route.meta.hideNavbar">
            <RouterView />
        </div>
        <div v-else>
            <Navbar />
            <RouterView />
        </div>
    </div>
</template>
