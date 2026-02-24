<script setup lang="ts">
import { memberStore } from '@/stores/Member.Stores'
import MemberBin from '@/components/Member/MemberBin.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-vue-next'

const store = memberStore()
const router = useRouter()

onMounted(async () => {
  await store.fetchBinMembers()
})

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete permanently?")) return
  await store.forceDeleteMembers(id)
  await store.fetchBinMembers()
}

const handleRestore = async (id: number) => {
  if (!confirm("Are you sure to restore?")) return
  await store.restoreMembers(id)
  await store.fetchBinMembers()
}

const goToMembers = () => {
  router.push('/members')
}
</script>

<template>
  <div class="p-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
      <h1 class="text-xl font-semibold text-gray-800">Members</h1>
      </div>

      <Button
        variant="default"
        class="flex items-center gap-2"
        @click="goToMembers"
      >
        <ArrowLeft class="w-4 h-4" />
        Back
      </Button>
    </div>

    <!-- Card -->
    <Card>
      <CardContent>
        <MemberBin
          :bin-members="store.binMembers"
          @delete="handleDelete"
          @restore="handleRestore"
        />
      </CardContent>
    </Card>

  </div>
</template>