import { useLocation, Link } from 'react-router-dom';
import './ComparePage.css';

function ComparePage() {
    const location = useLocation();
    const { fruit1, fruit2 } = location.state || {};

    if (!fruit1 || !fruit2) {
        return (
            <div className="compare-page">
                <p>Errore: frutti non trovati. Seleziona due frutti da confrontare.</p>
                <Link to="/fruits"><button className="back-button">Torna alla selezione</button></Link>
            </div>
        );
    }

    return (
        <div className="compare-page">
            <h1>Confronto tra {fruit1.title} e {fruit2.title}</h1>
            <div className="compare-cards">
                {[fruit1, fruit2].map(fruit => (
                    <div key={fruit.id} className="fruit-compare-card">
                        <img src={fruit.image} alt={fruit.title} />
                        <h2>{fruit.title}</h2>
                        <p><strong>Categoria:</strong> {fruit.category}</p>
                        <p><strong>Origine:</strong> {fruit.origin}</p>
                        <p><strong>Colore:</strong> {fruit.color}</p>
                        <p><strong>Calorie:</strong> {fruit.calories}</p>
                        <p><strong>Prezzo:</strong> €{fruit.price}</p>
                        <p><strong>Descrizione:</strong> {fruit.description}</p>
                    </div>
                ))}
            </div>
            <Link to="/fruits"><button className="back-button">🔙 Torna alla selezione</button></Link>
        </div>
    );
}

export default ComparePage;
