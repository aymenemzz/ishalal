// Pour importer ce module dans un autre fichier, il suffit d'utiliser la commande suivante:
// import * as OpenFoodFacts from "chemin_du_fichier/openfoodfacts.ts";

import axios from "axios";

const openFoodFacts = axios.create({
    baseURL: "https://world.openfoodfacts.org",
    timeout: 5000,
    });

const getProductInformations = async (barcode: String) => {
    try {
        const response = await openFoodFacts.get(
            `/api/v0/product/${barcode}?fields=product_name,brands,ingredients,image_front_url,image_url`
        );

        // On crée un objet avec les informations du produit
        const product = {
            barcode: response.data.code,
            productName: response.data.product.product_name,
            companies: response.data.product.brands,
            ingredients: response.data.product.ingredients,
          };

        // Si l'image n'est pas trouvée, on essaie avec l'autre URL
        if (response.data.product.image_front_url != undefined) {
            product.imageUrl = response.data.product.image_front_url;
            console.log("Image found: image_front_url");
        }
        else if (response.data.product.image_url != undefined) {
            product.imageUrl = response.data.product.image_url;
            console.log("Image found: image_url");
        }
        else{
            console.log("Image not found");
        }

        // On split les companies en un tableau
        product.companies = product.companies.split(",");

        // Return the product object
        console.log(product);
        return product;
    }
    catch (error) {
        console.error(error);
    }
}

export { openFoodFacts, getProductInformations };