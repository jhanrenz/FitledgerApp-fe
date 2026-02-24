
<script setup lang="ts">
defineProps<{
  title: string;
  value: number | string;
}>();
</script>
<template>
  <div class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300">
    <h2 class="text-lg font-semibold text-gray-700 mb-2">{{ title }}</h2>
    <p class="text-4xl font-bold text-gray-900">{{ value }}</p>
  </div>
</template>
