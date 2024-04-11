<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Props
const props = defineProps(['users'])
// User Id
// const userId = props.users.id
// Emit
// const emit = defineEmits(['follow'])
// function follow(userId: any) {
//     emit('follow', userId);
// }

// const followStore = useFollowStore()

// const followingId = reactive({
//     followingId: '',
// })

// const errorMessage = ref('')

// async function submit() {
//     await followStore.follow(followingId)
//         .then((res) => {
//             console.log(res)
//         })
//         .catch((err) => {
//             errorMessage.value = err
//         })
// }
</script>
<template>
    <div class="flex items-center justify-between py-2">
        <div class="flex items-center w-full">
            <div class="w-1/4 flex-shrink-0">
                <img :src="`http://localhost:3000/${props.users.imageUrl}`" alt="" class="w-8 h-8 rounded-full">
            </div>
            <div class="">
                <router-link to="" class="font-bold line-clamp-1 hover:underline">{{ props.users.full_name
                    }}</router-link>
                <p>Bio</p>
            </div>
        </div>
        <div>
            <button class="py-1 px-4 border border-black hover:bg-slate-950 hover:text-white rounded-2xl">Follow
                <input type="hidden" :value="props.users.id" />
            </button>
        </div>
    </div>
</template>