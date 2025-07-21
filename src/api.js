const BASE_URL = "http://localhost:3001";

export async function getFruits() {
    const res = await fetch(`${BASE_URL}/fruits`);
    if (!res.ok) {
        throw new Error("Errore nel caricamento dei frutti");
    }
    return await res.json();
}
