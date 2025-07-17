import { useEffect, useState } from 'react';
import { getFruits } from '../api';
import { fruitExtras } from '../data/fruitExtras';
import FruitCard from '../components/FruitCard';
import './FruitPage.css';

// LOGICA DELLA CHIAMATA CON FETCH + I FRUTTI EXTRA
function FruitPage() {
  const [fruits, setFruits] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // QUESTO BLOCCO DI CODICE SERVE PER CARICARE I DATI INZIALI APPENA LA PAGINA VIENE CARICATA, UNENDO I DATI DEL BACKEND CON QUELLI EXTRA
  useEffect(() => {
    // UTILIZZO PROMISE.ALL PER ESEGUIRE PIù OPERAZIONI ASINCRONE, 2
    Promise.all([
      // GETFRUITS FA LA RICHESTA AL BACKEND PER L'ELENCO DEI FRUTTI --> ID, TITLE, CATEGORY
      getFruits(),
      // RECUPERA I FRUTTI PREFERITI
      Promise.resolve(localStorage.getItem('favorites')) // --> LOCALESTORAGE...LEGGE I DATI SALVATI NEL BROWSER, CIOè I PREFERITI CHE AVEVAMO SALVATO IN PRECEDENZA, SI TROVA ALL'INTERNO DI UNA PROMISE.RESOLVE PER RENDERLO UNA PROMESSA PER LA PROMISE.ALL, MI RESITUISCE UNA STRINGA JSON O NULL
    ])
      // FETCHEDFRUITS E' L'ARRAY DI FRUTTI DAL BACKEND / STOREDFAVORITES E' LA STRINGA JSON [{id:1,title:'Mela'}]
      .then(([fetchedFruits, storedFavorites]) => {
        // SE STOREDFAVORITES CONTINENE QUALCOSA, LO TRASFORMA IN ARRAY, ALTRIMENTI E' NULL
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        // ENRICHED CREA UN NUOVO ARRAY CHE CONTIENE I FRUTTI COMPLETI --> PER OGNI FRUTTO PRESO DAL BACKEND (FETCHEDFRUITS) CERCA UN OGGTTTO EXTRA DA FRUTIEXTRASS
        const enriched = fetchedFruits.map(fruit => {
          const extra = fruitExtras.find(e => e.title === fruit.title);
          // USO LO SPREAD OPERATOR PER UNIRE LE INFO --> DATI BACKEDN (ID, TITLE, CATEGORY) // DATI EXTRA (PRICE, DESCRIPTION, IMAGE)
          return { ...fruit, ...extra };
        });
        // AGGIRONA LO STATO FRUITS E VERRANO VISUALIZZATI NELLA PAGINA
        setFruits(enriched);
        // AGGIORNA LO STATO FAVORITES E EVIDENZIERA' I PREFERITI
        setFavorites(favorites);
      }) // GESTIONE DEGLI ERRORI
      .catch(err => {
        console.error("Errore nel caricamento dati:", err);
      });
  }, []); // VIENE ESEGUITA UNA VOLTA GRAZIE ALLA DIPENDENZA

  const handleCompare = (fruit) => {
    if (compareList.find(f => f.id === fruit.id)) return;
    if (compareList.length >= 2) return;
    setCompareList(prev => [...prev, fruit]);
  };

  const handleToggleFavorite = (fruit) => {
    if (favorites.find(f => f.id === fruit.id)) {
      const updated = favorites.filter(f => f.id !== fruit.id);
      setFavorites(updated);
    } else {
      setFavorites([...favorites, fruit]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="fruit-page">
      <h1>Frutti disponibili 🍎</h1>
      <div className="fruit-list">
        {fruits.map(fruit => (
          <FruitCard
            key={fruit.id}
            fruit={fruit}
            onCompare={handleCompare}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.some(f => f.id === fruit.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default FruitPage;
