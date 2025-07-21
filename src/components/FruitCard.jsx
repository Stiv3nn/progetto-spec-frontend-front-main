import { Link } from 'react-router-dom';
import './FruitCard.css';

function FruitCard({ fruit, onCompare, onToggleFavorite, isFavorite }) {
  return (
    <div className="fruit-card">
      <Link to={`/fruits/${fruit.id}`} className="fruit-link">
        <img src={fruit.image} alt={fruit.title} />
        <h2>{fruit.title}</h2>
        <p className="fruit-short-desc">{fruit.description.slice(0, 60)}...</p>
        <p><strong>Prezzo:</strong> {fruit.price.toFixed(2)} €</p>
        <p><strong>Colore:</strong> {fruit.color}</p>
        <p><strong>Calorie:</strong> {fruit.calories} kcal</p>
        <p><strong>Origine:</strong> {fruit.origin}</p>
      </Link>


      <div className="fruit-actions">
        <button onClick={() => onCompare(fruit)}>Confronta</button>
        <button onClick={() => onToggleFavorite(fruit)} className="favorite-button">
          {isFavorite ? '💔 Rimuovi' : '💜 Preferito'}
        </button>
      </div>
    </div>
  );
}

export default FruitCard;
