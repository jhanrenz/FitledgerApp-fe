import { api } from "@/config/api";
import { defineStore } from "pinia";
import type { Register, Login, User } from "@/types/Auth.Types";

export const authStore = defineStore('user',{
    state: () => ({
        user: null as User | null,
        token : localStorage.getItem('token')|| null,
        loading : false
    }),

    actions: {
        async register(data : Omit<Register, 'id'>){
            try{
                const response = await api.post('/register', data);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', response.data.token)
                console.log("sucess register");
            }catch(err:any){
                console.log('fail to register', err.response?.data);
            }
        },

        async login(data: Omit<Login, 'id'>) {
            try {
                const response = await api.post('/login', data)

                this.user = response.data.user
                this.token = response.data.token

                localStorage.setItem('token', response.data.token)

                console.log('login success')
            } catch (err: any) {
                console.log('fail to login', err.response?.data)
            }
        },
         async logout(){
            try{
                await api.post('/logout');
            }catch(err : any){}
            finally{
                this.user = null;
                this.token = null;
                localStorage.removeItem('token');
            }
         },
    }
})