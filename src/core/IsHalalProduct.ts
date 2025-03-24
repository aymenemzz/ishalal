// noinspection ES6UnusedImports

import nonHalalData from "@/stores/NoHalalIngredients.json";
import type {Product} from "@/core/interface/Product.ts";
// import toraw from vue
import {toRaw} from "vue";

const ingredientTranslationLibrary = {
    "en:pork": ["porc", "cochon", "fr:porc", "fr:cochon"],
    "en:alcohol": ["en:alcoholic-beverages", "alcool", "fr:alcool", "fr:boisson-alcoolisée", "en:alcool"],
}

export type HalalStatus = "halal" | "not-halal" | "doubtful";

export function isHalal(product: Product): HalalStatus {
    const ingredients: any[] = product.ingredients || [];
    const halalTag: boolean = product.withHalalTag || false;
    if (halalTag) return "halal";
    const hasNonHalalIngredient = ingredients.some(ing => {
        if (typeof ing !== "object" || !ing.id || typeof ing.id !== "string") {
            console.warn("Ingrédient non valide détecté :", ing);
            return false; // Ignorer les éléments non valides
        }
        return nonHalalData.nonHalalIngredients.includes(ing.id.toLowerCase());
    });
    return hasNonHalalIngredient ? "not-halal" : "halal";
}

// Return list of non-halal ingredients
export function getNonHalalIngredients(product: Product): string[] {
    const ingredients: any[] = product.ingredients || [];
    const nonHalalIngredients: string[] = [];
    for (const ing of ingredients) {
        if (typeof ing !== "object" || !ing.id || typeof ing.id !== "string") {
            console.log("Ingrédient non valide détecté :", ing);
            continue; // Ignorer les éléments non valides
        }
        const ingId = ing.id.toLowerCase();
        if (nonHalalData.nonHalalIngredients.includes(ingId)) {
            // Check if the ingredient is in the ingredientTranslationLibrary
            let found = false;
            for (const [key, values] of Object.entries(ingredientTranslationLibrary)) {
                if (values.includes(ingId)) {
                    nonHalalIngredients.push(key);
                    found = true;
                    break;
                }
            }
            if (!found) {
                nonHalalIngredients.push(ingId);
            }
        }
    }
    return nonHalalIngredients;
}

/* Examples:
3378740765884 - Jambon Halal - Halal car il contient le tag "en:halal"
3095754933015 - Jambon non Halal - Contient de la gélatine de porc
3449865340383 - Saucisson sec Cochonou - Contient du porc, mais c'est pas dans le champs ingrédients (il n'existe pas) c'est dans le champs 
*/