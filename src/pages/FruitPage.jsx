import { useEffect, useState } from 'react';
import { getFruits } from '../api';
import { fruitExtras } from '../data/fruitExtras';
import FruitCard from '../components/FruitCard';
import { Link } from 'react-router-dom';
import './FruitPage.css';

function FruitPage() {
  const [fruits, setFruits] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

  // Salva i preferiti nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Gestione preferiti
  const handleToggleFavorite = (fruit) => {
    if (favorites.find(f => f.id === fruit.id)) {
      setFavorites(prev => prev.filter(f => f.id !== fruit.id));
    } else {
      setFavorites(prev => [...prev, fruit]);
    }
  };

  // Gestione confronto
  const handleCompare = (fruit) => {
    if (compareList.find(f => f.id === fruit.id)) return;
    if (compareList.length >= 2) return;
    setCompareList(prev => [...prev, fruit]);
  };

  const handleResetCompare = () => {
    setCompareList([]);
  };

  // INSERIMENTO DELLA LOGICA PER LA RICERCA, FILTRO E ORDINAMENTO
  const filteredFruits = fruits
    .filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(f => !filterCategory || f.category === filterCategory)
    .sort((a, b) => sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
    );




  return (
    <div>

      <div className="fruit-page">
        <h1>Frutti disponibili 🍎</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Cerca un frutto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="filter-input"
          />
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">Tutte le categorie</option>
            <option value="Tropicale">Tropicale</option>
            <option value="Agrumi">Agrumi</option>
            <option value="Frutta a polpa">Frutta a polpa</option>
            <option value="Frutta a bacca">Frutta a bacca</option>
          </select>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="asc">Ordina A-Z</option>
            <option value="desc">Ordina Z-A</option>
          </select>
        </div>

        {/* 💜 Pulsante per preferiti */}
        {favorites.length > 0 && (
          <Link to="/favorites">
            <button className="favorites-button">
              Vai alla pagina dei preferiti 💜
            </button>
          </Link>
        )}

        {/* ⚖️ Confronto */}
        {compareList.length > 0 && (
          <div className="compare-container">
            <h2>Confronto</h2>
            <div className="compare-list">
              {compareList.map(fruit => (
                <div key={fruit.id} className="compare-card">
                  <img src={fruit.image} alt={fruit.title} className="compare-image" />
                  <h3>{fruit.title}</h3>
                  <p><strong>Categoria:</strong> {fruit.category}</p>
                  <p><strong>Colore:</strong> {fruit.color}</p>
                  <p><strong>Calorie:</strong> {fruit.calories}</p>
                  <p><strong>Origine:</strong> {fruit.origin}</p>
                </div>
              ))}
            </div>
            <button className="reset-button" onClick={handleResetCompare}>
              Rimuovi confronto
            </button>

            {compareList.length === 2 && (
              <Link
                to="/compare"
                state={{ fruit1: compareList[0], fruit2: compareList[1] }}
              >
                <button className="compare-go-button">Vai al confronto →</button>
              </Link>
            )}
          </div>
        )}

        {/* 🧺 Lista frutti */}
        <div className="fruit-list">
          {filteredFruits.map(fruit => (
            <FruitCard
              key={fruit.id}
              fruit={fruit}
              onCompare={handleCompare}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.find(f => f.id === fruit.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FruitPage;
