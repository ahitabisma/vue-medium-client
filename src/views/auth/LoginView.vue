<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')

async function submit() {
  await authStore.login(loginData)
    .then(() => {
      router.replace({ name: 'main' })
    })
    .catch((err) => {
      errorMessage.value = err
    })
}
</script>

<template>
  <div class="h-svh flex flex-col items-center justify-center w-3/5 md:w-2/5 lg:w-1/3 mx-auto">
    <p class="font-semibold text-2xl mb-6 mt-7">Welcome back.</p>
    <p>{{ errorMessage }}</p>
    <div>
      <button
        class="border-black border-[1px] py-2 w-full flex items-center justify-center gap-6 px-8 rounded-full hover:bg-gray-50 hover:cursor-pointer">
        <img src="../../assets/img/google.png" alt="Google" class="w-5 h-5" />
        <p>Sign In with Google</p>
      </button>
      <div>
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 mt-7">
            <label for="email">Email</label>
            <input v-model="loginData.email" type="email" name="email" id="email" placeholder="Input your email ..."
              autocomplete="off"
              class="border-none ring-1 ring-gray-500 rounded-full py-2 px-3 mt-2 mb-5 focus:outline-gray-500" />
          </div>
          <div class="grid grid-cols-1">
            <label for="password">Password</label>
            <input v-model="loginData.password" type="password" name="password" id="password"
              placeholder="Input your password ..." autocomplete="off"
              class="border-none ring-1 ring-gray-500 rounded-full py-2 px-3 mt-2 mb-7 focus:outline-gray-500" />
          </div>
          <div class="text-center mb-3">
            <button
              class="bg-black text-white w-full py-3 text-sm rounded-full hover:cursor-pointer font-semibold hover:bg-gray-800">
              Sign In
            </button>
          </div>
        </form>
      </div>
      <p class="text-center mb-10 mt-3 lg:mb-3">
        No account?
        <router-link :to="{ name: 'register' }" class="font-bold text-green-700 hover:text-green-600">Create One
        </router-link>
      </p>
      <div class="flex flex-col items-center justify-center">
        <p class="mb-10 text-xs text-gray-500 lg:mb-5">
          Forgot email or trouble signing in? Get help.
        </p>
        <p class="text-xs text-gray-500">
          Click “Sign in” to agree to Medium’s Terms of Service and acknowledge that Medium’s
          Privacy Policy applies to you.
        </p>
      </div>
    </div>
  </div>
</template>
