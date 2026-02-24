<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import type { Category } from '@/types/Category.Type';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Label } from '../ui/label';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-vue-next'

const store = categoryStore();
const route = useRoute()
const router = useRouter();
const categoryId = Number(route.params.id) || null;
const isEdit = computed(()=> !!categoryId)

const data = ref<Omit<Category, 'id'>>({
    name: '',
    description: ''
})

onMounted(()=>{
    if(categoryId){
        const category = store.categories.find(c => c.id === categoryId)
        if(category){
            data.value ={
                name: category.name,
                description: category.description
            }
        }
    }
})

const submitData = async () => {
    if(!confirm("Are you sure to save?")) return;
    if(categoryId){
        await store.updateCategory({id : categoryId, ...data.value})
    }else{
        await store.addCategory(data.value)
    }
    router.push('/categories')
}

const goToCategories = () => {
    router.push('/categories')
}
</script>
<template>
    <div class="p-6 flex justify-center">
    <Card class="w-full max-w-xl shadow-sm">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">
          {{ isEdit ? 'Edit Category' : 'Add Category' }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="submitData" class="space-y-6">
          <div class="space-y-2">
            <Label class="text-sm font-medium">Category Name</Label>
            <Input
              v-model="data.name"
              type="text"
              placeholder="Enter category name"
              required
            />
          </div>

          <div class="space-y-2">
            <Label class="text-sm font-medium">Description</Label>
            <Input
              v-model="data.description"
              type="text"
              placeholder="Enter description"
              required
            />
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              class="flex items-center gap-2"
              @click="goToCategories"
            >
              <ArrowLeft class="w-4 h-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              class="flex items-center gap-2"
            >
              <Save class="w-4 h-4" />
              {{ isEdit ? 'Update' : 'Add' }}
            </Button>
          </div>

        </form>
      </CardContent>

    </Card>
  </div>
</template>