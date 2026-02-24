<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authStore } from '@/stores/Auth.Stores'
import type { Register } from '@/types/Auth.Types'
import { UserPlus, X, Loader2 } from 'lucide-vue-next'

const auth = authStore()
const router = useRouter()

const data = ref<Register>({
  name: '',
  email: '',
  password: ''
})

const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  try {
    await auth.register(data.value)
    router.push('/login')
  } catch (err: any) {
    console.error("Failed to register", err.response?.data)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-muted p-6">
    <Card class="w-full max-w-md shadow-lg relative">
      <Button
        variant="ghost"
        size="icon"
        class="absolute top-2 right-2"
        @click="goHome"
        aria-label="Close"
      >
        <X class="w-5 h-5" />
      </Button>

      <CardHeader class="text-center space-y-2">
        <CardTitle class="text-2xl font-bold">Fitledger</CardTitle>
        <p class="text-sm text-muted-foreground">Create your account</p>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Username</label>
            <Input
              v-model="data.name"
              type="text"
              placeholder="Enter your username"
              required
              :disabled="loading"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <Input
              v-model="data.email"
              type="email"
              placeholder="Enter your email"
              required
              :disabled="loading"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Password</label>
            <Input
              v-model="data.password"
              type="password"
              placeholder="Enter your password"
              required
              :disabled="loading"
            />
          </div>

          <Button
            type="submit"
            class="w-full flex items-center justify-center gap-2"
            :disabled="loading"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <UserPlus v-else class="w-4 h-4" />
            {{ loading ? 'Creating account...' : 'Register' }}
          </Button>
        </form>

        <div class="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?
          <Button
            variant="link"
            class="ml-1 inline-flex items-center gap-1 p-0"
            @click="goToLogin"
            :disabled="loading"
          >
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>