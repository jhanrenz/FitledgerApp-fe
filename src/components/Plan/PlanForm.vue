<script setup lang="ts">
import { planStore } from '@/stores/Plan.Stores'
import type { Plan } from '@/types/Plan.Types'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { ArrowLeft, Save } from 'lucide-vue-next'
import Label from '../ui/label/Label.vue'


const store = planStore()
const route = useRoute()
const router = useRouter()

const planId = Number(route.params.id) || null
const isEdit = computed(() => !!planId)

const data = ref<Omit<Plan, 'id'>>({
  name: '',
  price: 0,
  description: ''
})

onMounted(async () => {
  await store.fetchPlans()

  if (planId) {
    const plan = store.plans.find(p => p.id === planId)
    if (plan) {
      data.value = {
        name: plan.name,
        price: plan.price,
        description: plan.description
      }
    }
  }
})

const submitData = async () => {
  if (!confirm("Are you sure to save?")) return

  if (planId) {
    await store.updatePlans({ id: planId, ...data.value })
  } else {
    await store.addPlans(data.value)
  }

  await store.fetchPlans()
  router.push('/plans')
}

const goToPlan = () => {
  router.push('/plans')
}
</script>

<template>
  <div class="p-6 flex justify-center">
    <Card class="w-full max-w-xl shadow-sm">

      <!-- Header -->
      <CardHeader>
        <CardTitle class="text-2xl font-bold">
          {{ isEdit ? 'Edit Plan' : 'Add Plan' }}
        </CardTitle>
      </CardHeader>

      <!-- Form -->
      <CardContent>
        <form @submit.prevent="submitData" class="space-y-6">

          <!-- Plan Name -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Plan Name</Label>
            <Input
              v-model="data.name"
              type="text"
              placeholder="Enter plan name"
              required
            />
          </div>

          <!-- Price -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Price (₱)</Label>
            <Input
              v-model.number="data.price"
              type="number"
              placeholder="Enter price"
              min="0"
              required
            />
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Description</Label>
            <Input
              v-model="data.description"
              type="text"
              placeholder="Enter description"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              class="flex items-center gap-2"
              @click="goToPlan"
            >
              <ArrowLeft class="w-4 h-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              class="flex items-center gap-2"
            >
              <Save class="w-4 h-4" />
              Save
            </Button>
          </div>

        </form>
      </CardContent>

    </Card>
  </div>
</template>