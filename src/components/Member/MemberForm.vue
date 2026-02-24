<script setup lang="ts">
import { memberStore } from '@/stores/Member.Stores'
import { planStore } from '@/stores/Plan.Stores'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { ArrowLeft, Save } from 'lucide-vue-next'
import type { Member } from '@/types/Member.Types'

const store = memberStore()
const selectPlan = planStore()
const router = useRouter()
const route = useRoute()

const memberId = Number(route.params.id) || null
const isEdit = computed(() => !!memberId)

const data = ref<Omit<Member, 'id'>>({
  fullname: '',
  plan_id: 0,
  is_active: '',
  mobile: 0,
  address: ''
})

onMounted(async () => {
  await selectPlan.fetchPlans()

  if (memberId) {
    await store.fetchMembers()
    const member = store.members.find(m => m.id === memberId)
    if (member) {
      data.value = {
        fullname: member.fullname,
        plan_id: member.plan_id,
        is_active: member.is_active,
        mobile: member.mobile,
        address: member.address
      }
    }
  }
})

const submitData = async () => {
  if (!confirm('Are you sure to save?')) return

  if (memberId) {
    await store.updateMembers({ id: memberId, ...data.value })
  } else {
    await store.addMembers(data.value)
  }

  await store.fetchMembers()
  router.push('/members')
}

const goBackMember = () => {
  router.push('/members')
}
</script>

<template>
  <div class="p-6 flex justify-center">
    <Card class="w-full max-w-xl shadow-sm">
      
      <CardHeader>
        <CardTitle class="text-2xl font-bold">
          {{ isEdit ? 'Edit Member' : 'Add Member' }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="submitData" class="space-y-6">

          <div class="space-y-2">
            <label class="text-sm font-medium">Full Name</label>
            <Input
              v-model="data.fullname"
              type="text"
              placeholder="Enter full name"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Mobile</label>
            <Input
              v-model="data.mobile"
              type="tel"
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Address</label>
            <Input
              v-model="data.address"
              type="text"
              placeholder="Enter address"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Plan Membership</label>
            <select
              v-model.number="data.plan_id"
              required
              class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option disabled value="0">Select Plan</option>
              <option
                v-for="p in selectPlan.plans"
                :key="p.id"
                :value="p.id"
              >
                {{ p.name }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">Membership Status</label>
            <select
              v-model="data.is_active"
              required
              class="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option disabled value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              class="flex items-center gap-2"
              @click="goBackMember"
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