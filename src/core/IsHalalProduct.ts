import nonHalalData from "@/stores/NoHalalIngredients.json";

export function isHalal(ingredients: any[]): boolean {
    return !ingredients.some(ing => {
        if (typeof ing !== "object" || !ing.id || typeof ing.id !== "string") {
            console.warn("Ingrédient non valide détecté :", ing);
            return false; // Ignorer les éléments non valides
        }
        return nonHalalData.nonHalalIngredients.includes(ing.id.toLowerCase());
    });
}