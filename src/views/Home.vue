<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => router.push('/login')

const goToRegister = () => router.push('/register')
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white p-6">
    <!-- App Logo / Hero -->
    <div class="text-center mb-12 space-y-4">
      <h1 class="text-5xl font-bold text-gray-800">Fitledger</h1>
      <p class="text-gray-600 text-lg max-w-md mx-auto">
        Manage gym memberships, plans, and equipment easily. Your all-in-one gym management solution.
      </p>
    </div>

    <!-- Call to Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <Button class="px-8 py-3 text-lg" @click="goToLogin">Login</Button>
      <Button class="px-8 py-3 text-lg" variant="secondary" @click="goToRegister">Register</Button>
    </div>

    <!-- Optional Footer -->
    <footer class="mt-20 text-sm text-gray-400">
      &copy; 2026 Fitledger. Jhan Renz
    </footer>
  </div>
</template>