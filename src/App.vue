<script setup lang="ts">
import AppNavbar from "@/components/Header/AppNavbar.vue"
</script>

<template>
  <AppNavbar class="fixed top-0 left-0 right-0 z-50" />
  <div class="pt-16"> <!-- adjust padding to navbar height -->
    <router-view />
  </div>
</template>