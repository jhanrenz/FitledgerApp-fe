import { api } from "@/config/api";
import type { Member } from "@/types/Member.Types";
import { defineStore } from "pinia";

export const memberStore = defineStore('members',{
    state: ()=>({
        members : [] as Member[],
        binMembers : [] as Member[],
        loading: false,
        searchMember: '',
        filter: '',
    }),

    actions: {
        async fetchMembers(){
            this.loading = true;
            try{
                const params : any = {};
                if(this.searchMember){
                    params.search = this.searchMember;
                }
                if(this.filter){
                    params.filter = this.filter;
                }

                const response = await api.get('/members');
                this.members = response.data.members
            }catch(err: any){
                console.log(err.response?.data)
            }finally{
                this.loading = false;
            }
        },

        async fetchBinMembers()
        {
            this.loading = true;
            try{
                const response = await api.get('/members?filter=trashed');
                this.binMembers = response.data.members
            }catch(err: any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
        },

        async addMembers(member: Omit<Member, 'id'>){
            try{
                const response = await api.post('/members', member);
                this.members = response.data.member
            }catch(err: any){
                console.log(err.response.data);
            }
        },

        async updateMembers(member : Member){
            try{
                const response = await api.patch(`/members/${member.id}`, member);
                const index = this.members.findIndex(m => m.id === member.id);
                this.members[index] = response.data.member
            }catch(err: any){
                console.log(err.response.data);
            }
        },

        async deleteMembers(id : number){
            try{
                await api.delete(`/members/${id}`);
            }catch(err : any){
                console.log(err.response?.data);
            }
        },

        async restoreMembers(id : number){
            try{
                await api.patch(`/members/${id}/restore`);
            }catch(err: any){
                console.log(err.response.data);
            }
        },

        async forceDeleteMembers(id : number){
            try{
                await api.delete(`/members/${id}/force`);
            }catch(err : any){
                console.log(err.response.data);
            }
        }
    }
})