import { Link } from 'react-router-dom';
import './FruitCard.css';

function FruitCard({ fruit, onCompare, onToggleFavorite, isFavorite }) {
  return (
    <div className="fruit-card">
      <img src={fruit.image} alt={fruit.title} />
      <h3>
        <Link to={`/fruits/${fruit.id}`}>{fruit.title}</Link>
      </h3>
      <p className="fruit-short-desc">{fruit.description.slice(0, 60)}...</p>
      <p><strong>Prezzo:</strong> €{fruit.price}</p>
      <div className="buttons">
        <button onClick={() => onCompare(fruit)}>Confronta</button>
        <button onClick={() => onToggleFavorite(fruit)}>
          {isFavorite ? '💔 Rimuovi' : '💜 Preferito'}
        </button>
      </div>
    </div>
  );
}

export default FruitCard;
