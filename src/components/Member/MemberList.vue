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
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  members: Member[]
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
    <TableCaption>List of registered members</TableCaption>

    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Mobile No:</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Plan</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        v-for="member in props.members"
        :key="member.id"
        class="hover:bg-muted/50 transition-colors"
      >
        <TableCell>{{ member.id }}</TableCell>
        <TableCell class="font-medium">
          {{ member.fullname }}
        </TableCell>
        <TableCell>{{ member.mobile }}</TableCell>
        <TableCell>{{ member.address }}</TableCell>
        <TableCell>{{ member.plan?.name }}</TableCell>
        <TableCell>₱ {{ member.plan?.price }}</TableCell>
        <TableCell>
          <Badge
            :variant="member.is_active ? 'default' : 'secondary'"
          >
            {{ member.is_active }}
          </Badge>
        </TableCell>
        <TableCell class="text-right space-x-2">
          <Button
            size="icon"
            variant="secondary"
            @click="editData(member.id)"
          >
            <Pencil class="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            @click="deleteData(member.id)"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="8">Total Members</TableCell>
        <TableCell class="text-right font-semibold">
          {{ props.members.length }}
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>