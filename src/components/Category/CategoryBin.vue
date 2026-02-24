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
import { RotateCcw, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
    binCategories : Category[]
}>()

const emits = defineEmits<{
    (e: 'restore', id : number) : void
    (e: 'delete', id : number) : void
}>()

const restoreData = (id : number) => {
    emits ('restore', id)
}
const forceDelete = (id : number) => {
    emits ('delete', id)
}


</script>
<template>
     <Table>
    <TableCaption>Archived membership plans</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="bin in props.binCategories"
        :key="bin.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ bin.id }}</TableCell>

        <TableCell class="font-medium">
          {{ bin.name }}
        </TableCell>
        <TableCell class="max-w-[250px] truncate">
          {{ bin.description }}
        </TableCell>

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
            @click="forceDelete(bin.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>

    <TableFooter>
      <TableRow>
        <TableCell colspan="4">Total Archived Plans</TableCell>
        <TableCell class="text-right font-semibold">
          {{ props.binCategories.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>