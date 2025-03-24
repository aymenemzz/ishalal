import axios from "axios";
import type {Product} from "@/core/interface/Product.ts";

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
            `/api/v0/product/${barcode}?fields=status,product_name,brands,ingredients,categories_tags,ingredients_tags,image_front_url,image_url,labels_tags,specific_ingredients`
        );
        const labels_tags = response.data.product.labels_tags ?? [];
        let ingredients = [];
        if (response.data.product.ingredients){
            ingredients = response.data.product.ingredients;
        }
        else if (response.data.product.specific_ingredients){
            ingredients = response.data.product.specific_ingredients;
        }
        else{
            ingredients = [];
        }
        
        const categories_tags = response.data.product.categories_tags ?? [];
        const categories_tags_dict = categories_tags.map((category: string) => {
            return {id: category};
        });
        const ingredients_tags = response.data.product.ingredients_tags ?? [];
        const ingredients_tags_dict = ingredients_tags.map((ingredient: string) => {
            return {id: ingredient};
        });



        ingredients = ingredients.concat(categories_tags_dict, ingredients_tags_dict);

        const product: Product = {
            barcode: response.data.code ?? null,
            productName: response.data.product.product_name ?? "Nom inconnu",
            companies: response.data.product.brands ? response.data.product.brands.split(",") : [],
            ingredients: ingredients,
            imageUrl: response.data.product.image_front_url ?? response.data.product.image_url ?? null,
            withHalalTag: labels_tags.includes("en:halal"),
        };

        console.log("Product informations", product);

        // console.log("Response", response.data);
        // console.log("Product informations", product);

        if ("en:halal" in labels_tags) {
            product.withHalalTag = true
        }

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