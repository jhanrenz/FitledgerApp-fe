<script setup lang="ts">
import EquipmentList from '@/components/Equipment/EquipmentLits.vue'
import { equipmentStore } from '@/stores/Equipment.Stores'
import { categoryStore } from '@/stores/Category.Stores'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-vue-next'

const store = equipmentStore()
const selectCategory = categoryStore()
const router = useRouter()

const searchQuery = ref('')
const categoryFilter = ref('')  // category id as string

onMounted(async () => {
  await store.fetchEquipments()
})

const filteredEquipments = computed(() => {
  return store.equipments.filter(equipment => {
    const matchesSearch = [equipment.name, equipment.category?.name]
      .some(field => String(field ?? '').toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesCategory = !categoryFilter.value || equipment.category?.id === Number(categoryFilter.value)
    return matchesSearch && matchesCategory
  })
})

const editData = (id: number) => router.push(`/equipment/form/${id}`)
const deleteData = async (id: number) => {
  if (!confirm('Are you sure to delete?')) return
  await store.deleteEquipment(id)
}
const goToEquipmentBin = () => router.push('/equipments/bin')
const goToEquipmentForm = () => router.push('/equipment/form')
const resetFilters = () => {
  searchQuery.value = ''
  categoryFilter.value = ''
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <h1 class="text-xl font-semibold text-gray-800">Equipments</h1>

      <div class="flex gap-2">
        <Button @click="goToEquipmentForm" size="sm" class="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus class="w-3.5 h-3.5" /> Add
        </Button>

        <Button @click="goToEquipmentBin" variant="destructive" size="sm" class="flex items-center gap-1">
          <Trash2 class="w-3.5 h-3.5" /> Bin
        </Button>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-2 items-center">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name or category..."
        class="border rounded px-2 py-1 text-sm flex-1"
      />
      <select v-model="categoryFilter" class="border rounded px-2 py-1 text-sm">
        <option value="">All Categories</option>
        <option v-for="c in selectCategory.categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
      <Button size="sm" class="text-sm" @click="resetFilters">Reset</Button>
    </div>

    <!-- Equipment List -->
    <Card class="rounded-lg border-gray-200 shadow-sm">
      <CardContent class="p-3">
        <EquipmentList
          :equipments="filteredEquipments"
          @edit="editData"
          @delete="deleteData"
        />
      </CardContent>
    </Card>

  </div>
</template>