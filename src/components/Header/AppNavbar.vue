<script setup lang="ts">
import { useRouter, useRoute, RouterLink } from "vue-router"
import { LogOut, Menu, X, Home, Users, ClipboardList, Grid, Dumbbell } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { computed, ref } from "vue"
import { authStore } from "@/stores/Auth.Stores"

const auth = authStore()
const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)

const handleLogout = async () => {
  if (!confirm("Are you sure you want to log out?")) return
  try {
    await auth.logout()
    router.push("/")
  } catch (err: any) {
    console.error(err.response?.data)
  }
}

const isActive = (path: string) => route.path.startsWith(path)
const showNavbar = computed(() => route.meta.requiresAuth)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Plans", path: "/plans", icon: ClipboardList },
  { name: "Members", path: "/members", icon: Users },
  { name: "Categories", path: "/categories", icon: Grid },
  { name: "Equipments", path: "/equipments", icon: Dumbbell },
]
</script>

<template>
  <nav v-if="showNavbar" class="bg-white border-b shadow-sm">
    <div class="container mx-auto flex items-center justify-between h-16 px-6">
      
      <!-- Logo -->
      <div class="flex items-center">
        <h1 class="text-lg font-semibold text-gray-800">Fitlegder</h1>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
          :class="{ 'bg-gray-100 text-primary': isActive(item.path) }"
        >
          <component :is="item.icon" class="w-4 h-4" />
          {{ item.name }}
        </RouterLink>
      </div>

      <!-- Logout & Mobile Menu -->
      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          class="hidden md:flex items-center gap-2 text-gray-700 hover:text-red-600"
          @click="handleLogout"
        >
          <LogOut class="w-4 h-4" />
          Logout
        </Button>

        <button class="md:hidden p-2 rounded-md hover:bg-gray-100" @click="toggleMenu">
          <Menu v-if="!isMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t bg-white">
      <div v-for="item in navItems" :key="item.path">
        <RouterLink
          :to="item.path"
          class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          :class="{ 'bg-gray-100 text-primary': isActive(item.path) }"
          @click="toggleMenu"
        >
          <component :is="item.icon" class="w-4 h-4" />
          {{ item.name }}
        </RouterLink>
      </div>
      <button
        class="flex items-center gap-2 w-full px-6 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
        @click="handleLogout"
      >
        <LogOut class="w-4 h-4" />
        Logout
      </button>
    </div>
  </nav>
</template>