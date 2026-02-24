<script setup lang="ts">
import { computed } from "vue";
import type { Equipment } from "@/types/Equipment.Types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const props = defineProps<{
  equipments: Equipment[];
}>();



/* ===== Corporate Summary ===== */

const totalQuantity = computed(() =>
  props.equipments.reduce((sum, e) => sum + e.quantity, 0)
);

const totalWorking = computed(() =>
  props.equipments.reduce((sum, e) => sum + e.working, 0)
);

const totalBroken = computed(() =>
  props.equipments.reduce((sum, e) => sum + e.broken, 0)
);

const healthPercent = computed(() =>
  totalQuantity.value
    ? ((totalWorking.value / totalQuantity.value) * 100).toFixed(1)
    : 0
);
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <Table>
      <TableCaption class="text-gray-500">
        Equipment Inventory Overview
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="equipment in props.equipments"
          :key="equipment.id"
          class="hover:bg-muted/50 transition-colors"
        >
          <TableCell>{{ equipment.id }}</TableCell>

          <TableCell class="font-medium">
            {{ equipment.name }}
          </TableCell>

          <TableCell>
            {{ equipment.category?.name }}
          </TableCell>

          <TableCell class="font-semibold">
            {{ equipment.quantity }}
          </TableCell>

          <!-- Corporate Status Column -->
          <TableCell>
            <div class="space-y-2 w-48">
              
              <!-- Working / Broken Labels -->
              <div class="flex justify-between text-xs">
                <Badge variant="default">
                  Working: {{ equipment.working }}
                </Badge>

                <Badge variant="destructive">
                  Broken: {{ equipment.broken }}
                </Badge>
              </div>

              <!-- Health Bar -->
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-emerald-600 h-2 rounded-full transition-all"
                  :style="{
                    width: (equipment.working / equipment.quantity) * 100 + '%'
                  }"
                ></div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>

      <!-- Corporate Summary Footer -->
      <TableFooter>
        <TableRow class="bg-gray-50">
          <TableCell colspan="6" class="space-y-2">

            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Total Units</span>
              <span class="font-semibold">{{ totalQuantity }}</span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-emerald-600">Total Working</span>
              <span class="font-semibold">{{ totalWorking }}</span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-red-600">Total Broken</span>
              <span class="font-semibold">{{ totalBroken }}</span>
            </div>

            <div class="pt-2 border-t text-sm flex justify-between">
              <span class="font-medium text-gray-700">
                Overall Equipment Health
              </span>
              <span class="font-bold text-emerald-700">
                {{ healthPercent }}%
              </span>
            </div>

          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
</template>