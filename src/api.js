// COLLEGAMENTO AL BACKEND E VISUALIZZAZIONE DEI FRUTTI
const BASE_URL = 'http://localhost:3001/fruits';

export async function getFruits() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Errore nel caricamento dei frutti");
    return await res.json();
}
