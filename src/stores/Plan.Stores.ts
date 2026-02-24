import { api } from "@/config/api";
import { defineStore } from "pinia";
import type { Plan } from "@/types/Plan.Types";

export const planStore = defineStore('plans',{
    state: ()=> ({
        plans : [] as Plan[],
        binPlans : [] as Plan[],
        loading: false,
    }),

    actions : {
        async fetchPlans(){
            this.loading = true;
            try{
                const response = await api.get('/plans');
                this.plans = response.data.plans;
            }catch(err: any){
                console.log(err.response?.data);
            }finally{
                this.loading = false;
            }
        },

        async fetchBinPlans(){
            this.loading = true;
            try{
                const response = await api.get('/plans?filter=trashed');
                this.binPlans = response.data.plans;
            }catch(err: any){
                console.log(err.response?.data)
            }finally{
                this.loading = false;
            }
        },

        async addPlans(plan: Omit<Plan, 'id'>){
            this.loading = true;
            try{
                const response = await api.post('/plans', plan);
                this.plans.push(response.data.plan);
            }catch(err : any){
                console.log(err.response?.data)
            }finally{
                this.loading = false;
            }
        },

        async updatePlans(plan : Plan){
            try{
                const response = await api.patch(`/plans/${plan.id}`, plan);
                const index = this.plans.findIndex(p => p.id === plan.id);
                if(index !== -1){
                    this.plans[index] = response.data.plan;
                }
            }catch(err: any){
                console.log(err.response.data);
            }
        },

        async deletePlans(id : number){
            try{
                await api.delete(`/plans/${id}`);
                this.plans = this.plans.filter(p => p.id !== id);
            }catch(err : any){
                console.log(err.response?.data)
            }
        },


        async restorePlans( id : number ){
            try{
                await api.patch(`/plans/${id}/restore`);
            }catch(err : any){
                console.log(err.response?.data)
            }
        },

        async forceDeletePlans( id : number ){
            try{
                await api.delete(`/plans/${id}/force`);
            }catch(err : any){
                console.log(err.response?.data)
            }
        },

    }
})