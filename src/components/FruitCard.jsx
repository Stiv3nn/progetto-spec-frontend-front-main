import { Link } from 'react-router-dom';
import './FruitCard.css';

function FruitCard({ fruit, onCompare, onToggleFavorite, isFavorite }) {
  return (
    <div className="fruit-card">
      <img src={fruit.image} alt={fruit.title} className="fruit-image" />
      <h3 className="fruit-title">
        <Link to={`/fruits/${fruit.id}`} className="fruit-link">
          {fruit.title}
        </Link>
      </h3>
      <p className="fruit-desc">{fruit.description?.slice(0, 60)}...</p>
      <div className="fruit-buttons">
        <button onClick={() => onCompare(fruit)} className="compare-button">Confronta</button>
        <button onClick={() => onToggleFavorite(fruit)} className="favorite-button">
          {isFavorite ? "💜" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default FruitCard;
