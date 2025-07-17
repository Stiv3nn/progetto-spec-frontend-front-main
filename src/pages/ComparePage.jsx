import { useLocation, Link, Navigate } from 'react-router-dom';
import './ComparePage.css';

function ComparePage() {
    const location = useLocation();
    const { fruit1, fruit2 } = location.state || {};

    if (!fruit1 || !fruit2) {
        return <Navigate to="/fruits" />;
    }

    return (
        <div className="compare-page">
            <h1>Confronto tra {fruit1.title} e {fruit2.title}</h1>
            <div className="compare-grid">
                {[fruit1, fruit2].map(fruit => (
                    <div className="compare-card" key={fruit.id}>
                        <img src={fruit.image} alt={fruit.title} className="compare-image" />
                        <h2>{fruit.title}</h2>
                        <p><strong>Categoria:</strong> {fruit.category}</p>
                        <p><strong>Colore:</strong> {fruit.color}</p>
                        <p><strong>Calorie:</strong> {fruit.calories}</p>
                        <p><strong>Origine:</strong> {fruit.origin}</p>
                        <p><strong>Prezzo:</strong> €{fruit.price}</p>
                        <p className="description">{fruit.description}</p>
                    </div>
                ))}
            </div>

            <Link to="/fruits">
                <button className="back-button">← Torna alla selezione</button>
            </Link>
        </div>
    );
}

export default ComparePage;
