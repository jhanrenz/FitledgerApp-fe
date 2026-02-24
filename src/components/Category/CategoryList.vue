<script setup lang="ts">
import type { Category } from '@/types/Category.Type';
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
    categories : Category[]
}>()

const emits = defineEmits<{
    (e: 'edit', id : number ):void
    (e: 'delete', id : number ):void
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
    <TableCaption>List of equipments category</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="[with:100px]">Description</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="category in props.categories"
        :key="category.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ category.id }}</TableCell>
        <TableCell>{{ category.name }}</TableCell>
        <TableCell class="font-medium">
          {{ category.description }}
        </TableCell>
      
        <TableCell class="text-right space-x-2">
          <Button
            size="icon"
            variant="secondary"
            @click="editData(category.id)"
          >
            <Pencil class="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            @click="deleteData(category.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="6">Total Members</TableCell>
        <TableCell class="text-right font-semibold">
          {{ props.categories.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
