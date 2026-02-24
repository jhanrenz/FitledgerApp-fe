<script setup lang="ts">
import { planStore } from '@/stores/Plan.Stores'
import PlanList from '@/components/Plan/PlanList.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-vue-next'

const store = planStore()
const router = useRouter()

onMounted(async () => {
  await store.fetchPlans()
})

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete?")) return
  await store.deletePlans(id)
}

const handleEdit = (id: number) => {
  router.push(`/plan/form/${id}`)
}

const addPlan = () => {
  router.push('/plan/form')
}

const goPlanBin = () => {
  router.push('/plans/bin')
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <h1 class="text-xl font-semibold text-gray-800">Membership Plans</h1>

      <div class="flex gap-2">
        <Button
          size="sm"
          class="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
          @click="addPlan"
        >
          <Plus class="w-3.5 h-3.5" />
          Add
        </Button>

        <Button
          size="sm"
          variant="destructive"
          class="flex items-center gap-1"
          @click="goPlanBin"
        >
          <Trash2 class="w-3.5 h-3.5" />
          Bin
        </Button>
      </div>
    </div>

    <!-- Card -->
    <Card class="rounded-lg border-gray-200 shadow-sm">
      <CardContent class="p-3">
        <PlanList
          :plans="store.plans"
          @delete="handleDelete"
          @edit="handleEdit"
        />
      </CardContent>
    </Card>

  </div>
</template>