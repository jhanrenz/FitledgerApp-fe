<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import CategoryBin from '@/components/Category/CategoryBin.vue';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-vue-next';

const store = categoryStore();
const router = useRouter();

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete?")) return;
  await store.forceDelete(id)
  router.push('/categories')
}

const handleRestore = async (id: number) => {
  if (!confirm("Are you sure to restore?")) return;
  await store.restoreCategory(id)
  router.push('/categories')
}

const goToCategories = () => {
  router.push('/categories')
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div class="flex items-center gap-1">
        <h1 class="text-xl font-semibold text-gray-800">Archived Categories</h1>
      </div>

      <Button
        variant="default"
        size="sm"
        class="flex items-center gap-1"
        @click="goToCategories"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Back
      </Button>
    </div>

    <!-- Card -->
    <Card class="rounded-lg border-gray-200 shadow-sm">

      <CardContent class="p-3">
        <CategoryBin
          :bin-categories="store.categories"
          @restore="handleRestore"
          @force-delete="handleDelete"
        />
      </CardContent>
    </Card>

  </div>
</template>