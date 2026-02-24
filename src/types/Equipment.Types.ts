export interface Category{
    id: number;
    name: string
}

export interface Equipment{
    id: number;
    name: string;
    quantity: number;
    working: number;
    broken: number;
    category_id: number,
    category? : Category
}