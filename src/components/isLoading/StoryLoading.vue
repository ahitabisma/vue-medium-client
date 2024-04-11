<script setup lang="ts">
</script>

<template>
    <div class="animate-pulse space-y-3 md:space-y-4 border-b pb-6 pt-4 lg:pb-8 lg:pt-6">
        <div class="flex items-center gap-5">
            <div class="flex items-center gap-5 hover:underline">
                <div class="w-5 h-5 rounded-full bg-gray-200"></div>
                <div class="h-3 bg-gray-200 w-28 rounded"></div>
            </div>
            <!-- Gunakan fungsi formatDate untuk merubah format tanggal -->
            <div class="h-3 bg-gray-200 w-20 rounded"></div>
        </div>
        <div class="flex">
            <div class="w-4/5 md:space-y-2 space-y-2">
                <div class="h-3 bg-gray-200 w-4/5 rounded"></div>
                <div class="h-3 bg-gray-200 w-3/5 rounded"></div>
            </div>
            <div class="w-1/5 md:flex md:items-center md:justify-center">
                <div class="w-20 h-14 md:h-24 md:w-28 bg-gray-200"> </div>
            </div>
        </div>
        <div class="flex items-center text-xs md:w-4/5 md:text-sm">
            <div class="flex w-4/5 space-x-3">
                <div class="h-3 bg-gray-200 w-16 rounded"></div>
                <div class="h-3 bg-gray-200 w-10 rounded"></div>
            </div>
            <div class="flex w-1/5 justify-around ">
                <div class="h-3 bg-gray-200 w-8 rounded"></div>
                <div class="h-3 bg-gray-200 w-8 rounded"></div>
            </div>
        </div>
    </div>
</template>