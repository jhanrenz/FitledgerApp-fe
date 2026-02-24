<script setup lang="ts">
import { computed } from "vue";
import type { Member } from "@/types/Member.Types";

const props = defineProps<{
  members: Member[];
}>();

/* =========================
   Inner Ring: Active vs Inactive
========================= */
const activeCount = computed(() =>
  props.members.filter(m => m.is_active === "active").length
);
const inactiveCount = computed(() =>
  props.members.filter(m => m.is_active === "inactive").length
);

const total = computed(() => props.members.length);

const activePercent = computed(
  () => (total.value ? (activeCount.value / total.value) * 100 : 0)
);
const inactivePercent = computed(
  () => (total.value ? (inactiveCount.value / total.value) * 100 : 0)
);

/* =========================
   Outer Ring: Members by Plan
========================= */
const planCounts = computed(() => {
  const counts: Record<string, number> = {};
  props.members.forEach((member) => {
    const planName = member.plan?.name ?? "No Plan";
    counts[planName] = (counts[planName] || 0) + 1;
  });
  return counts;
});

const planPercentages = computed(() => {
  const percentages: Record<string, number> = {};
  for (const [plan, count] of Object.entries(planCounts.value)) {
    percentages[plan] = total.value ? (count / total.value) * 100 : 0;
  }
  return percentages;
});

/* =========================
   SVG Circle Math
========================= */
const innerRadius = 60; // active/inactive
const outerRadius = 80; // plans
const innerCircumference = 2 * Math.PI * innerRadius;
const outerCircumference = 2 * Math.PI * outerRadius;

// Inner ring strokes
const activeStroke = computed(() => (activePercent.value / 100) * innerCircumference);

// Outer ring strokes
const planStrokes = computed(() => {
  let offset = 0;
  return Object.entries(planPercentages.value).map(([plan, percent]) => {
    const strokeLength = (percent / 100) * outerCircumference;
    const result = { plan, strokeLength, offset };
    offset += strokeLength;
    return result;
  });
});

// Colors for each plan
const planColors = computed(() => {
  const colors: Record<string, string> = {};
  const plans = Object.keys(planCounts.value);
  plans.forEach((plan, index) => {
    const hue = (index * 360) / plans.length;
    colors[plan] = `hsl(${hue}, 70%, 50%)`;
  });
  return colors;
});
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-6">
      Member Overview
    </h2>

    <div class="flex flex-col items-center">
      <div class="relative w-48 h-48">
        <svg class="w-full h-full transform -rotate-90">
          <!-- Inner Ring Background -->
          <circle
            :r="innerRadius"
            cx="96"
            cy="96"
            fill="transparent"
            stroke="#e5e7eb"
            stroke-width="18"
          />
          <!-- Inner Ring Active -->
          <circle
            :r="innerRadius"
            cx="96"
            cy="96"
            fill="transparent"
            stroke="#16a34a"
            stroke-width="18"
            stroke-linecap="round"
            :stroke-dasharray="`${activeStroke} ${innerCircumference}`"
          />

          <!-- Outer Ring Background -->
          <circle
            :r="outerRadius"
            cx="96"
            cy="96"
            fill="transparent"
            stroke="#e5e7eb"
            stroke-width="18"
          />
          <!-- Outer Ring Plans -->
          <circle
            v-for="plan in planStrokes"
            :key="plan.plan"
            :r="outerRadius"
            cx="96"
            cy="96"
            fill="transparent"
            :stroke="planColors[plan.plan]"
            stroke-width="18"
            stroke-linecap="round"
            :stroke-dasharray="`${plan.strokeLength} ${outerCircumference}`"
            :stroke-dashoffset="`-${plan.offset}`"
          />
        </svg>

        <!-- Center Label -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-semibold text-gray-800">
            {{ total }}
          </span>
          <span class="text-xs text-gray-500">
            Total Members
          </span>
        </div>
      </div>

      <!-- Legend -->
      <div class="mt-6 space-y-2 w-full max-w-xs">
        <!-- Active/Inactive -->
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-green-600 rounded-full"></span>
            <span class="text-gray-600">Active</span>
          </div>
          <span class="font-medium text-gray-800">
            {{ activeCount }} ({{ activePercent.toFixed(1) }}%)
          </span>
        </div>
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span class="text-gray-600">Inactive</span>
          </div>
          <span class="font-medium text-gray-800">
            {{ inactiveCount }} ({{ inactivePercent.toFixed(1) }}%)
          </span>
        </div>

        <!-- Plans -->
        <div
          v-for="(count, plan) in planCounts"
          :key="plan"
          class="flex justify-between items-center text-sm"
        >
          <div class="flex items-center gap-2">
            <span
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: planColors[plan] }"
            ></span>
            <span class="text-gray-600">{{ plan }}</span>
          </div>
          <span class="font-medium text-gray-800">
            {{ count }} ({{ (planPercentages[plan] ?? 0).toFixed(1) }}%)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>