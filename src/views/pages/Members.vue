<script setup lang="ts">
import MemberList from '@/components/Member/MemberList.vue'
import { memberStore } from '@/stores/Member.Stores'
import { planStore } from '@/stores/Plan.Stores'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-vue-next'

const store = memberStore()
const selectPlan = planStore()
const router = useRouter()

const searchQuery = ref('')
const statusFilter = ref('')
const planFilter = ref('')

onMounted(async () => {
  await store.fetchMembers()
})

const editData = (id: number) => router.push(`/member/form/${id}`)
const deleteData = async (id: number) => {
  if (!confirm('Are you sure to delete?')) return
  await store.deleteMembers(id)
}

const goMemberBin = () => router.push('/members/bin')
const goToMemberForm = () => router.push('/member/form')

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  planFilter.value = ''
}

const filteredMembers = computed(() => {
  return store.members.filter(member => {
    const matchesSearch = [member.fullname, member.mobile, member.address, member.plan?.name]
      .some(field => String(field).toLowerCase().includes(searchQuery.value.toLowerCase()))
      
    const matchesStatus = !statusFilter.value || member.is_active === statusFilter.value
    const matchesPlan = !planFilter.value || member.plan?.name === planFilter.value

    return matchesSearch && matchesStatus && matchesPlan
  })
})
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <h1 class="text-xl font-semibold text-gray-800">Members</h1>
      <div class="flex gap-2">
        <Button @click="goToMemberForm" size="sm" class="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus class="w-3.5 h-3.5" /> Add
        </Button>
        <Button @click="goMemberBin" variant="destructive" size="sm" class="flex items-center gap-1">
          <Trash2 class="w-3.5 h-3.5" /> Bin
        </Button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-2 items-center">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search member..."
        class="border rounded px-2 py-1 text-sm flex-1"
      />
      <select v-model="statusFilter" class="border rounded px-2 py-1 text-sm">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select v-model="planFilter" class="border rounded px-2 py-1 text-sm">
        <option value="">All Plans</option>
        <option v-for="p in selectPlan.plans" :key="p.id" :value="p.name">
          {{ p.name }}
        </option>
      </select>
      <Button size="sm" class="text-sm" @click="resetFilters">Reset</Button>
    </div>

    <!-- Member List -->
    <Card class="rounded-lg border-gray-200 shadow-sm">
      <CardContent class="p-3">
        <MemberList
          :members="filteredMembers"
          @edit="editData"
          @delete="deleteData"
        />
      </CardContent>
    </Card>

  </div>
</template>