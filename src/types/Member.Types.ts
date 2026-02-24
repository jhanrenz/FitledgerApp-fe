export interface Plan{
    id: number;
    name: string;
    price: number;
}

export interface Member{
    id: number;
    fullname: string;
    plan_id: number;
    is_active: string;
    address: string;
    mobile: number;
    plan?: Plan
}