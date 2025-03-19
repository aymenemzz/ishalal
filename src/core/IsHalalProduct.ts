import nonHalalData from "@/stores/NoHalalIngredients.json";
import type {Product} from "@/core/interface/Product.ts";

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

/* Examples:
3378740765884 - Jambon Halal - Halal car il contient le tag "en:halal"
3095754933015 - Jambon non Halal - Contient de la gélatine de porc
3449865340383 - Saucisson sec Cochonou - Contient du porc, mais c'est pas dans le champs ingrédients (il n'existe pas) c'est dans le champs 
*/