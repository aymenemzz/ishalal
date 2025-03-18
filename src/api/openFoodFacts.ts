import axios from "axios";

interface Product {
    barcode: string;
    productName: string;
    companies: string[];
    ingredients: any[];
    imageUrl: string | null;
}

// Pour importer ce module dans un autre fichier, il suffit d'utiliser la commande suivante:
// import * as OpenFoodFacts from "chemin_du_fichier/openfoodfacts.ts";
//https://world.openfoodfacts.org/api/v0/product/$3095754933015?fields=product_name,brands,ingredients,image_front_url,image_url

const openFoodFacts = axios.create({
    baseURL: "https://world.openfoodfacts.org",
    timeout: 5000,
});

const getProductInformations = async (barcode: string): Promise<Product> => {
    try {
        const response = await openFoodFacts.get(
            `/api/v0/product/${barcode}?fields=product_name,brands,ingredients,image_front_url,image_url`
        );

        const product: Product = {
            barcode: response.data.code ?? barcode,
            productName: response.data.product.product_name ?? "Nom inconnu",
            companies: response.data.product.brands ? response.data.product.brands.split(",") : [],
            ingredients: response.data.product.ingredients ?? [],
            imageUrl: response.data.product.image_front_url ?? response.data.product.image_url ?? null,
        };

        // Si l'image n'est pas trouvée, on essaie avec l'autre URL
        if (product.imageUrl) {
            console.log("Image found");
        } else {
            console.log("Image not found");
        }

        // Return the product object
        console.log(product);
        return product;
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération du produit");
    }
}

export {openFoodFacts, getProductInformations};