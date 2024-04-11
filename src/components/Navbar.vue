<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useStoriesStore } from '@/stores/stories';
import { onMounted, ref } from 'vue';
import Bel from './Icon/Bel.vue';
import Write from './Icon/Write.vue';
import User from './Icon/User.vue';
import Stories from './Icon/Stories.vue';
import Library from './Icon/Library.vue';
import { useRouter } from 'vue-router';

// Dropdown
const open = ref<boolean>(false)
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.getElementById('dropdown');

  if (dropdown && !dropdown.contains(event.target as Node)) {
    open.value = false;
  }
};

// Close Dropdown when scrolling
const handleScroll = () => {
  open.value = false;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll);

  return () => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('scroll', handleScroll);
  };
});

// Auth Store
const authStore = useAuthStore()
const router = useRouter()

if (authStore.isAuth) {
  onMounted(async () => {
    await authStore.getUser()
  })
}

// Logout
async function logout() {
  await authStore.logout()
    .then(() => {
      router.replace({ name: 'guest' })
    })
    .catch((err) => {
      console.log(err)
    })
}

// Create Story Button
const storyStore = useStoriesStore()
const props = defineProps(['data'])
const errorMessage = ref('')
async function publishStory() {
  await storyStore.createStory(props.data).then(() => {
    router.replace({ name: 'main' })
  }).catch((err) => {
    errorMessage.value = err
  })
  console.log('Publish')
}
</script>

<template>
  <!-- Navbar -->
  <!-- Jika user tidak login -->
  <div v-if="!authStore.isAuth">
    <!-- Jika meta guestDetail bernilai false -->
    <div v-if="!$route.meta.guestDetail"
      class="flex justify-between px-6 md:px-9 lg:px-13 pt-3 pb-3 border-b-[1px] border-black">
      <router-link :to="{ name: 'guest' }">
        <h1 class="font-bold text-3xl md:w-1/3">Medium</h1>
      </router-link>
      <div class="flex md:w-2/3 justify-end">
        <div class="hidden md:flex gap-6 items-center mr-5 lg:mr-6">
          <p class="">Our Story</p>
          <p class="">Membership</p>
          <p class="">Write</p>
          <router-link :to="{ name: 'login' }">Sign In</router-link>
        </div>
        <router-link :to="{ name: 'register' }"
          class="bg-black flex items-center text-white py-1 px-3 text-sm rounded-full hover:cursor-pointer hover:bg-gray-800">
          Get Started
        </router-link>
      </div>
    </div>

    <!-- Jika meta guestDetail bernilai true -->
    <div v-else class="flex justify-between px-6 md:px-9 lg:px-13 pt-3 pb-3 border-b-[1px] border-black">
      <router-link :to="{ name: 'guest' }">
        <h1 class="font-bold text-3xl md:w-1/3">Medium</h1>
      </router-link>
      <div class="flex md:w-2/3 justify-end items-center">
        <div class="hidden md:flex gap-6 items-center mr-5 lg:mr-6">
          <router-link :to="{ name: 'login' }" class="flex gap-1 hover:text-gray-600">
            <Write />
            <p>Write</p>
          </router-link>
          <router-link :to="{ name: 'register' }"
            class="py-1 px-3 text-white bg-green-700 rounded-full hover:bg-green-800">
            Sign Up
          </router-link>
          <router-link :to="{ name: 'login' }">Sign In</router-link>
        </div>
        <img src="@/assets/img/default.png" alt="" class="h-8 w-8 rounded-full hover:brightness-90" />
      </div>
    </div>
  </div>

  <!-- Jika user login -->
  <div v-else>
    <!-- Jika user sedang berada di halaman Create Story -->
    <div v-if="$route.meta.newStory">
      <div
        class="flex justify-between items-center px-6 md:px-9 lg:px-28 pt-3 pb-3 border-b-[1px] border-gray-200 text-sm">
        <router-link :to="{ name: 'main' }">
          <h1 class="font-bold text-3xl md:w-1/3">Medium</h1>
        </router-link>
        <div class="flex items-center gap-7">
          {{ props.data.storyData }}
          <button @click="publishStory" class="py-1 px-3  text-white bg-green-700 rounded-full hover:bg-green-800">
            Publish
          </button>
          <div>
            <button @click.stop="open = !open" id="dropdown-btn">
              <img :src="`http://localhost:3000/${authStore.userDetail.imageUrl}`" alt=""
                class="h-8 w-8 rounded-full hover:brightness-90" />
            </button>
          </div>
        </div>
      </div>

      <div v-show="open" @click.stop id="dropdown"
        class="flex flex-col z-10 absolute right-0 mr-3 w-2/5 md:w-[28%] lg:w-1/5 text-sm bg-white backdrop-brightness-95 drop-shadow-md p-5">
        <div class="flex flex-col border-b space-y-5 pb-5">
          <router-link to="" class="flex items-center gap-3 hover:text-gray-600">
            <User />
            Profile
          </router-link>
          <router-link to="" class="flex items-center gap-3 hover:text-gray-600">
            <Stories />
            Library
          </router-link>
          <router-link to="" class="flex items-center gap-3 hover:text-gray-600">
            <Library />
            Stories
          </router-link>
        </div>
        <div class="flex flex-col mt-5 space-y-5">
          <router-link to="" class=" hover:text-gray-600">Settings</router-link>
          <button @click="logout" class="w-max hover:text-gray-600">Sign Out</button>
        </div>
      </div>
    </div>

    <!-- Jika user selain berada di halaman Create Story -->
    <div v-else>
      <div
        class="flex justify-between items-center px-6 md:px-9 lg:px-13 pt-3 pb-3 border-b-[1px] border-gray-200 text-sm">
        <div>Search</div>
        <div class="flex items-center gap-7">
          <router-link :to="{ name: 'new-story' }" class="flex gap-1 hover:text-gray-600">
            <Write />
            <p>Write</p>
          </router-link>
          <router-link to="">
            <Bel />
          </router-link>
          <div>
            <button @click.stop="open = !open" id="dropdown-btn">
              <img :src="`http://localhost:3000/${authStore.userDetail.imageUrl}`" alt=""
                class="h-8 w-8 rounded-full hover:brightness-90" />
            </button>
          </div>
        </div>
      </div>

      <div v-show="open" @click.stop id="dropdown"
        class="flex flex-col z-10 absolute right-0 mr-3 w-2/5 md:w-[28%] lg:w-1/5 text-sm bg-white backdrop-brightness-95 drop-shadow-md p-5">
        <div class="flex flex-col border-b space-y-5 pb-5">
          <router-link to="" class="flex items-center gap-3 hover:text-gray-600">
            <User />
            Profile
          </router-link>
          <router-link to="" class="flex items-center gap-3 hover:text-gray-600">
            <Stories />
            Library
          </router-link>
          <router-link to="" class="flex items-center gap-3 hover:text-gray-600">
            <Library />
            Stories
          </router-link>
        </div>
        <div class="flex flex-col mt-5 space-y-5">
          <router-link to="" class=" hover:text-gray-600">Settings</router-link>
          <button @click="logout" class="w-max hover:text-gray-600">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>