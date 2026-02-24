<script setup lang="ts">
import PlanBin from '@/components/Plan/PlanBin.vue'
import { Button } from '@/components/ui/button'
import { planStore } from '@/stores/Plan.Stores'
import { Card, CardContent } from '@/components/ui/card'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const store = planStore()
const router = useRouter()

onMounted(async () => {
  await store.fetchBinPlans()
})

const restore = async (id: number) => {
  if (!confirm("Are you sure to restore?")) return
  await store.restorePlans(id)
  await store.fetchBinPlans()
}

const handleForceDelete = async (id: number) => {
  if (!confirm("Are you sure to delete permanently?")) return
  await store.forceDeletePlans(id)
  await store.fetchBinPlans()
}

const goToPlans = () => {
  router.push('/plans')
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div class="flex items-center gap-1">
        <h1 class="text-xl font-semibold text-gray-800">Archived Plans</h1>
      </div>

      <Button
        variant="default"
        size="sm"
        class="flex items-center gap-1"
        @click="goToPlans"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Back to Plans
      </Button>
    </div>

    <!-- Card -->
    <Card class="rounded-lg border-gray-200 shadow-sm">
      <CardContent class="p-3">
        <PlanBin
          :bin-plan="store.binPlans"
          @restore="restore"
          @force-delete="handleForceDelete"
        />
      </CardContent>
    </Card>

  </div>
</template>