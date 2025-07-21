const BASE_URL = "http://localhost:3001";

export async function getFruits() {
    const res = await fetch(`${BASE_URL}/fruits`);
    if (!res.ok) {
        throw new Error("Errore nel caricamento dei frutti");
    }
    return await res.json();
}

export async function getFruitById(id) {
    const res = await fetch(`http://localhost:3001/fruits/${id}`);
    if (!res.ok) throw new Error('Errore nel recupero del frutto');
    const data = await res.json();
    return data.fruit;
}
