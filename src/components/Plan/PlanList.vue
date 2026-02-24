<script setup lang="ts">
import type { Plan } from '@/types/Plan.Types'
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
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  plans: Plan[]
}>()

const emits = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

const editData = (id: number) => emits('edit', id)
const deleteData = (id: number) => emits('delete', id)
</script>

<template>
  <Table>
    <TableCaption>Available membership plans</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="plan in props.plans"
        :key="plan.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ plan.id }}</TableCell>
        <TableCell class="font-medium">
          {{ plan.name }}
        </TableCell>
        <TableCell>
          ₱ {{ plan.price }}
        </TableCell>
        <TableCell class="max-w-[300px] truncate">
          {{ plan.description }}
        </TableCell>
        <TableCell class="text-right space-x-2">
          <Button
            size="icon"
            variant="secondary"
            @click="editData(plan.id)"
          >
            <Pencil class="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            @click="deleteData(plan.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>

    <TableFooter>
      <TableRow>
        <TableCell colspan="4">Total Plans</TableCell>
        <TableCell class="text-right font-semibold">
          {{ props.plans.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>