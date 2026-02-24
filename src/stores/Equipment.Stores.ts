import { api } from "@/config/api";
import { defineStore } from "pinia";
import type { Equipment } from "@/types/Equipment.Types";

export const equipmentStore = defineStore('equipments',{
    state: ()=> ({
        equipments : [] as Equipment[],
        binEquipments : [] as Equipment[],
        loading : false,
        searchEquipment : '',
        filter: ''
    }),

    actions : {
        async fetchEquipments(){
            this.loading = true;
            try{
                const params : any = {};
                if(this.searchEquipment){
                    params.search = this.searchEquipment;
                }
                if(this.filter){
                    params.filter = this.filter;
                }

                const response = await api.get('/equipments')
                this.equipments = response.data.equipments
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async fetchBinRequirements(){
            this.loading = true;
            try{
                const response = await api.get('/equipments?filter=trashed')
                this.binEquipments = response.data.equipments
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },
        
        async addEquipment(equipment: Omit<Equipment, 'id'>){
            this.loading = true;
            try{
                const response = await api.post('/equipments', equipment)
                this.equipments.push(response.data.equipment)
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async updateEquipment (equipment : Equipment){
            this.loading = true;
            try{
                const response = await api.patch(`/equipments/${equipment.id}`, equipment)
                const index = this.equipments.findIndex(e => e.id === equipment.id)
                this.equipments[index] = response.data.equipment
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async deleteEquipment( id : number){
            this.loading = true;
            try{
                await api.delete(`/equipments/${id}`)
                this.equipments = this.equipments.filter(e => e.id !== id)
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async restoreEquipment(id : number){
            this.loading = true;
            try{
                await api.patch(`/equipments/${id}/restore`)
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async forceDeleteEquipment(id : number){
            this.loading = true;
            try{
                await api.delete(`/equipments/${id}/force`)
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        }
    }
})