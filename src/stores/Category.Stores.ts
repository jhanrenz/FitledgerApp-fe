import { api } from "@/config/api";
import { defineStore } from "pinia";
import type { Category } from "@/types/Category.Type";


export const categoryStore = defineStore('categories',{
    state: ()=> ({
        categories: [] as Category[],
        binCategories : [] as Category[],
        loading: false,
    }),

    actions : {
        async fetchCategories()
        {
            this.loading = true;
            try{
                const response = await api.get('/categories');
                this.categories = response.data.categories
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },
         async fetchBinCategories()
        {
            this.loading = true;
            try{
                const response = await api.get('/categories?filter=trashed');
                this.binCategories = response.data.categories
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async addCategory(category: Omit<Category, 'id'>){
            this.loading = true;
            try{
                const response = await api.post('/categories', category)
                this.categories.push(response.data.category);
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async updateCategory( category : Category){
            this.loading = true;
            try{
                const response = await api.patch(`/catgories/${category.id}`)
                const index = this.categories.findIndex(c => c.id === category.id)
                this.categories[index] = response.data.category
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async deleteCategory(id : number){
            this.loading = true;
            try{
                await api.delete(`/categories/${id}`);
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async restoreCategory(id : number){
            this.loading = false;
            try{
                await api.patch(`/categories/${id}/restore`)
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async forceDelete(id : number){
            this.loading = true;
            try{
                await api.delete(`/categories/${id}/force`)
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        }
    }
})
