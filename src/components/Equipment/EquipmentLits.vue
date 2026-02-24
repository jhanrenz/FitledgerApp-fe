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
import { Pencil, Trash2 } from 'lucide-vue-next';

const props = defineProps<{
    equipments : Equipment[]
}>()

const emits = defineEmits<{
    (e: 'edit', id : number) :void
    (e: 'delete', id : number) :void
}>()

const editData = (id : number) => {
    emits('edit', id)
}

const deleteData = (id : number) => {
    emits('delete', id)
}
</script>



<template>
  <Table>
    <TableCaption>List of your equipments</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Working</TableHead>
        <TableHead>Broken</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="equipment in props.equipments" :key="equipment.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ equipment.id }}</TableCell>
        <TableCell class="font-medium">
          {{ equipment.name }}
        </TableCell>
        <TableCell>{{ equipment.category?.name }}</TableCell>
        <TableCell>{{ equipment.quantity }}</TableCell>
        <TableCell>{{ equipment.working }}</TableCell>
        <TableCell>{{ equipment.broken }}</TableCell>
        <TableCell class="text-right space-x-2">
          <Button
            size="icon"
            variant="secondary"
            @click="editData(equipment.id)"
          >
            <Pencil class="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            @click="deleteData(equipment.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>

    <TableFooter>
      <TableRow>
        <TableCell colspan="7">Total Equipments</TableCell>
        <TableCell class="text-right font-semibold">
          {{ props.equipments.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>