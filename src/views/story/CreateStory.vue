<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive } from 'vue';

const storyData = reactive({
    title: '',
    body: ''
})

</script>

<template>
    <Navbar :data="storyData" />
    <div class="mx-6 md:mx-10 lg:mx-56">
        <input type="text" placeholder="Title" v-model="storyData.title"
            class="w-full font-medium text-2xl my-4 border-b focus:outline-none focus:border-b-gray-400 pb-1" />

        <div class="h-40">
            <quill-editor v-model:content="storyData.body" theme="snow" placeholder="Tell your story..."
                content-type="html" />
        </div>
    </div>
</template>