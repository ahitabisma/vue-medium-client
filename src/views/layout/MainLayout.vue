<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import SecondBar from '@/components/main/SecondBar.vue';
import SideBar from '@/components/main/SideBar.vue';
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore()

const userId = computed(() => {
    return authStore.userDetail.id
})

onMounted(async () => {
    await authStore.getUser()
})
</script>

<template>
    <div>
        <Navbar />
        <div class="flex px-5 text-sm md:px-8 lg:px-10">
            <section id="explore" class="w-full lg:w-3/4 lg:border-r">
                <SecondBar :userId="userId" />
                <RouterView />
            </section>
            <section id="sideBar" class="hidden lg:block h-full w-1/4 px-5 pt-5 overflow-y-auto sticky top-0">
                <SideBar />
            </section>
        </div>
    </div>
</template>
