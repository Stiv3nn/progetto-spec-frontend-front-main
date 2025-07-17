import { useParams, Link } from 'react-router-dom';
import './FruitDetailPage.css';

function FruitDetailPage({ fruits }) {
    const { id } = useParams();
    const fruit = fruits.find(f => f.id === parseInt(id));

    if (!fruit) return <p>Frutto non trovato.</p>;

    return (
        <div className="detail-container">
            <img src={fruit.image} alt={fruit.title} className="detail-image" />
            <h2>{fruit.title}</h2>
            <p><strong>Categoria:</strong> {fruit.category}</p>
            <p><strong>Prezzo:</strong> €{fruit.price.toFixed(2)}</p>
            <p><strong>Origine:</strong> {fruit.origin}</p>
            <p><strong>Calorie:</strong> {fruit.calories}</p>
            <p className="detail-description">{fruit.description}</p>
            <Link to="/fruits">
                <button className="back-button">🔙 Torna alla selezione</button>
            </Link>
        </div>
    );
}

export default FruitDetailPage;
