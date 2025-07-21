import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFruitById } from '../api';
import { fruitExtras } from '../data/fruitExtras';
import { Link } from 'react-router-dom';
import './FruitDetailPage.css';

function FruitDetail() {
    const { id } = useParams();
    const [fruit, setFruit] = useState(null);

    useEffect(() => {
        getFruitById(id)
            .then(data => {
                const extra = fruitExtras.find(e => e.title === data.title);
                const enriched = { ...data, ...extra };
                setFruit(enriched);
            })
            .catch(err => {
                console.error('Errore nel caricamento del frutto:', err);
            });
    }, [id]);

    if (!fruit) return <div>Caricamento...</div>;

    return (
        <div className="fruit-detail-container">
            <div className="fruit-detail-header">
                <h1 className="fruit-detail-title">{fruit.title}</h1>
            </div>

            <div className="fruit-detail-layout">
                <img src={fruit.image} alt={fruit.title} className="fruit-detail-img" />

                <div className="fruit-detail-info">
                    <p><strong>Categoria:</strong> {fruit.category}</p>
                    <p><strong>Prezzo:</strong> €{fruit.price.toFixed(2)}</p>
                    <p><strong>Colore:</strong> {fruit.color}</p>
                    <p><strong>Calorie:</strong> {fruit.calories}</p>
                    <p><strong>Origine:</strong> {fruit.origin}</p>
                    <p><strong>Descrizione:</strong> {fruit.description}</p>
                </div>
            </div>

            <Link to="/fruits" className="back-button">
                ← Torna alla lista dei frutti
            </Link>
        </div>

    );
}

export default FruitDetail;
