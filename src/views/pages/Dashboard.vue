<script setup lang="ts">
import { onMounted, computed } from "vue";
import { memberStore } from "@/stores/Member.Stores";
import { equipmentStore } from "@/stores/Equipment.Stores";
import { planStore } from "@/stores/Plan.Stores";

import StatsCard from "@/components/Dashboard/StatsCard.vue";
import MemberStatusPieChart from "@/components/Dashboard/MemberStatusPieChart.vue";
import EquipmentChart from "@/components/Dashboard/EquipmentChart.vue";
const mStore = memberStore();
const eStore = equipmentStore();
const pStore = planStore();

onMounted(async () => {
  await Promise.all([
    mStore.fetchMembers(),
    eStore.fetchEquipments(),
    pStore.fetchPlans(),
  ]);
});

const totalMembers = computed(() => mStore.members.length);
const totalEquipments = computed(() =>
  eStore.equipments.reduce((sum, e) => sum + e.quantity, 0)
);
const totalPlans = computed(() => pStore.plans.length);

</script>

<template>
  <div class="min-h-screen p-4">
    
    

    <!-- Stats Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <StatsCard
        title="Total Members"
        :value="totalMembers"
        class="hover:shadow-md transition"
      />
      <StatsCard
        title="Total Equipments"
        :value="totalEquipments"
        class="hover:shadow-md transition"
      />
      <StatsCard
        title="Membership Plans"
        :value="totalPlans"
        class="hover:shadow-md transition"
      />
    </div>

    <!-- Analytics Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
         <MemberStatusPieChart
          :members="mStore.members"
          />
          <EquipmentChart
          :equipments="eStore.equipments"
          />
      </div>
    </div>

  </div>
</template>