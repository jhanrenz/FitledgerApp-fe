<script setup lang="ts">
import { equipmentStore } from '@/stores/Equipment.Stores'
import EquipmentBin from '@/components/Equipment/EquipmentBin.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-vue-next'

const store = equipmentStore()
const router = useRouter()

onMounted(async () => {
  await store.fetchBinRequirements()
})

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete permanently?")) return
  await store.forceDeleteEquipment(id)
  await store.fetchBinRequirements()
}

const handleRestore = async (id: number) => {
  if (!confirm("Are you sure to restore?")) return
  await store.restoreEquipment(id)
  await store.fetchBinRequirements()
}

const goToEquipments = () => {
  router.push('/equipments')
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div class="flex items-center gap-1">
        <h1 class="text-xl font-semibold text-gray-800">Archived Equipments</h1>
      </div>

      <Button
        variant="default"
        size="sm"
        class="flex items-center gap-1"
        @click="goToEquipments"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Back
      </Button>
    </div>

    <!-- Card -->
    <Card class="rounded-lg border-gray-200 shadow-sm">
      <CardContent class="p-3">
        <EquipmentBin
          :bin-equipments="store.binEquipments"
          @delete="handleDelete"
          @restore="handleRestore"
        />
      </CardContent>
    </Card>

  </div>
</template>