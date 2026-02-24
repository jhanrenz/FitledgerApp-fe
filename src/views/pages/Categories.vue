<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import { onMounted } from 'vue';
import CategoryList from '@/components/Category/CategoryList.vue';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-vue-next';
import { Card, CardContent } from '@/components/ui/card'

const store = categoryStore();
const router = useRouter();

onMounted(async () => {
  await store.fetchCategories();
})

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete?")) return;
  await store.deleteCategory(id)
}

const handleEdit = async (id: number) => {
  router.push(`/category/form/${id}`)
}

const goToCategoryForm = () => {
  router.push('/category/form')
}

const goToCategoryBin = () => {
  router.push('/categories/bin')
}
</script>

<template>
  <div class="p-4 space-y-4">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h1 class="text-xl font-semibold text-gray-800">Categories</h1>

      <div class="flex gap-2">
        <Button
          size="sm"
          class="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
          @click="goToCategoryForm"
        >
          <Plus class="w-3.5 h-3.5" />
          Add
        </Button>

        <Button
          size="sm"
          variant="destructive"
          class="flex items-center gap-1"
          @click="goToCategoryBin"
        >
          <Trash2 class="w-3.5 h-3.5" />
          Bin
        </Button>
      </div>
    </div>

    <!-- Card -->
    <Card class="rounded-lg border-gray-200 shadow-sm">
      <CardContent class="p-3">
        <CategoryList
          :categories="store.categories"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </CardContent>
    </Card>

  </div>
</template>