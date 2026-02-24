<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { equipmentStore } from '@/stores/Equipment.Stores'
import { categoryStore } from '@/stores/Category.Stores'
import type { Equipment } from '@/types/Equipment.Types'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Label from '../ui/label/Label.vue'
import { ArrowLeft, Save } from 'lucide-vue-next'

const store = equipmentStore()
const selectCategory = categoryStore()
const router = useRouter()
const route = useRoute()

const equipmentId = Number(route.params.id) || null
const isEdit = computed(() => !!equipmentId)

const data = ref<Omit<Equipment, 'id'>>({
  name: '',
  quantity: 0,
  category_id: 0,
  working: 0,
  broken: 0,
})

onMounted(() => {
  if (equipmentId) {
    const equipment = store.equipments.find(e => e.id === equipmentId)
    if (equipment) {
      data.value = {
        name: equipment.name,
        quantity: equipment.quantity,
        category_id: equipment.category_id,
        working: equipment.working,
        broken: equipment.broken,
      }
    }
  }
})

const submitData = async () => {
  if (!confirm('Are you sure to save?')) return

  if (equipmentId) {
    await store.updateEquipment({ id: equipmentId, ...data.value })
  } else {
    await store.addEquipment(data.value)
  }

  router.push('/equipments')
}

const goToEquipments = () => router.push('/equipments')
</script>

<template>
  <div class="p-6 flex justify-center">
    <Card class="w-full max-w-xl shadow-sm">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">
          {{ isEdit ? 'Edit Equipment' : 'Add Equipment' }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="submitData" class="space-y-6">
          
          <!-- Single row: Equipment Name -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Equipment Name</Label>
            <Input v-model="data.name" type="text" placeholder="Enter name" required />
          </div>

          <!-- Single row: Category -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Category</Label>
            <select
              v-model.number="data.category_id"
              required
              class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option disabled value="0">Select Category</option>
              <option v-for="c in selectCategory.categories" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>

          <!-- Two-column grid for numeric fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label class="text-sm font-medium">Quantity</Label>
              <Input v-model.number="data.quantity" type="number" placeholder="Enter quantity" min="0" required />
            </div>
            <div class="space-y-2">
              <Label class="text-sm font-medium">Working</Label>
              <Input v-model.number="data.working" type="number" placeholder="Number working" min="0" required />
            </div>
            <div class="space-y-2">
              <Label class="text-sm font-medium">Broken</Label>
              <Input v-model.number="data.broken" type="number" placeholder="Number broken" min="0" required />
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" class="flex items-center gap-2" @click="goToEquipments">
              <ArrowLeft class="w-4 h-4" /> Cancel
            </Button>

            <Button type="submit" class="flex items-center gap-2">
              <Save class="w-4 h-4" /> Save
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  </div>
</template>