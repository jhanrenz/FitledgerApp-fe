<script setup lang="ts">
import type { Equipment } from '@/types/Equipment.Types';
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
import { RotateCcw, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  binEquipments: Equipment[]
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
    <TableCaption>Archived equipments list</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Equipment Name</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Working</TableHead>
        <TableHead>Broken</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="bin in props.binEquipments"
        :key="bin.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ bin.id }}</TableCell>

        <TableCell class="font-medium">
          {{ bin.name }}
        </TableCell>
        <TableCell>{{ bin.category?.name }}</TableCell>
        <TableCell>{{ bin.quantity }}</TableCell>
        <TableCell>{{ bin.working }}</TableCell>
        <TableCell>{{ bin.broken }}</TableCell>
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
          {{ props.binEquipments?.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>