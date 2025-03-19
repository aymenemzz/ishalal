export interface Product {
    barcode: string;
    productName: string;
    companies: string[];
    ingredients: any[];
    imageUrl: string | null;
    withHalalTag: boolean;
}