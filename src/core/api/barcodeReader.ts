import javascriptBarcodeReader from "javascript-barcode-reader";

async function decodeBarcodeFromImage(image: HTMLImageElement | string): Promise<string | null> {
    try {
        const barcode = await javascriptBarcodeReader({
            image: typeof image === "string" ? image : image.src,
            barcode: "EAN-13", // Adapter selon le type de code-barres attendu
        });
        return barcode;
    } catch (error) {
        console.error("Erreur lors de la lecture du code-barres :", error);
        return null;
    }
}

export default decodeBarcodeFromImage;