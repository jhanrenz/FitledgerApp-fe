import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Dashboard from "./views/pages/Dashboard.vue";
import PlanForm from "./components/Plan/PlanForm.vue";
import Plans from "./views/pages/Plans.vue";
import ArchivePlan from "./views/Archives/ArchivePlan.vue";
import Members from "./views/pages/Members.vue";
import ArchiveMember from "./views/Archives/ArchiveMember.vue";
import MemberForm from "./components/Member/MemberForm.vue";
import Home from "./views/Home.vue";
import Categories from "./views/pages/Categories.vue";
import CategoryForm from "./components/Category/CategoryForm.vue";
import ArchiveCategory from "./views/Archives/ArchiveCategory.vue";
import Equipments from "./views/pages/Equipments.vue";
import ArchiveEquipment from "./views/Archives/ArchiveEquipment.vue";
import EquipmentForm from "./components/Equipment/EquipmentForm.vue";


const routes : RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth : true}
    },
    {
        path: '/plan/form',
        name: 'Add Plan',
        component: PlanForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/plan/form/:id?',
        name: 'Update Plan',
        component: PlanForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/plans',
        name: 'Plans',
        component: Plans,
        meta: {requiresAuth : true}
    },
    {
        path: '/plans/bin',
        name: 'Plan bin',
        component: ArchivePlan,
        meta: {requiresAuth : true}
    },
    {
        path: '/members',
        name: 'Members',
        component: Members,
        meta: {requiresAuth : true}
    },
    {
        path: '/members/bin',
        name: 'Archive members',
        component: ArchiveMember,
        meta: {requiresAuth : true}
    },
    {
        path: '/member/form',
        name: 'Add member',
        component: MemberForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/member/form/:id?',
        name: 'Update member',
        component: MemberForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories,
        meta: {requiresAuth : true}
    },
    {
        path: '/categories/bin',
        name: 'Bin Categories',
        component: ArchiveCategory,
        meta: {requiresAuth : true}
    },
    {
        path: '/category/form',
        name: 'Add Category',
        component: CategoryForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/category/form/:id?',
        name: 'Update Category',
        component: CategoryForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/equipments',
        name: 'Equipments',
        component: Equipments,
        meta: {requiresAuth : true}
    },
     {
        path: '/equipments/bin',
        name: 'Equipments bin',
        component: ArchiveEquipment,
        meta: {requiresAuth : true}
    },
     {
        path: '/equipment/form',
        name: 'Add Equipments',
        component: EquipmentForm,
        meta: {requiresAuth : true}
    },
     {
        path: '/equipment/form/:id?',
        name: 'Update Equipments',
        component: EquipmentForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to)=>{
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && ! token){
        return {name : 'Login'};
    }
    return true;
})
export default router;