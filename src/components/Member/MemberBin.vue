<script setup lang="ts">
import type { Member } from '@/types/Member.Types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  binMembers: Member[]
}>()

const emits = defineEmits<{
  (e: 'restore', id: number): void
  (e: 'delete', id: number): void
}>()

const restoreData = (id: number) => emits('restore', id)
const deleteData = (id: number) => emits('delete', id)
</script>

<template>
  <Table>
    <TableCaption>Archived members list</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Full Name</TableHead>
        <TableHead>Mobile No</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Plan</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="bin in props.binMembers"
        :key="bin.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ bin.id }}</TableCell>

        <TableCell class="font-medium">
          {{ bin.fullname }}
        </TableCell>
        <TableCell>{{ bin.mobile }}</TableCell>
        <TableCell>{{ bin.address }}</TableCell>
        <TableCell>{{ bin.plan?.name }}</TableCell>
        <TableCell>₱ {{ bin.plan?.price }}</TableCell>
        <TableCell>
          <Badge :variant="bin.is_active ? 'default' : 'secondary'">
            {{ bin.is_active }}
          </Badge>
        </TableCell>

        <!-- Actions -->
        <TableCell class="text-right space-x-2">
          <Button
            size="icon"
            variant="secondary"
            @click="restoreData(bin.id)"
          >
            <RotateCcw class="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            @click="deleteData(bin.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>

    <TableFooter>
      <TableRow>
        <TableCell colspan="6">Total Archived</TableCell>
        <TableCell class="text-right font-semibold">
          {{ props.binMembers?.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>