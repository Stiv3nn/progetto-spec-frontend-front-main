import { Link } from 'react-router-dom';
import './FruitCard.css';

function FruitCard({ fruit, onCompare, onToggleFavorite, isFavorite }) {
  return (
    <div className="fruit-card">
      <Link to={`/fruits/${fruit.id}`} className="fruit-title-link">
        <img src={fruit.image} alt={fruit.title} className="fruit-image" />
        <h3>{fruit.title}</h3>
      </Link>
      <p>Categoria: {fruit.category}</p>
      <p>Prezzo: €{fruit.price.toFixed(2)}</p>
      <p className="fruit-short-desc">
        {fruit.description.slice(0, 60)}...
      </p>
      <div className="card-buttons">
        <button onClick={() => onCompare(fruit)}>Confronta</button>
        <button onClick={() => onToggleFavorite(fruit)}>
          {isFavorite ? '💔 Rimuovi' : '💜 Preferito'}
        </button>
      </div>
    </div>
  );
}

export default FruitCard;
