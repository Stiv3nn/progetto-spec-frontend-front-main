import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFruits } from '../api';
import './FruitDetailPage.css';

function FruitDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fruit, setFruit] = useState(null);

    useEffect(() => {
        getFruits()
            .then(data => {
                const selected = data.find(f => f.id === parseInt(id));
                setFruit(selected);
            })
            .catch(console.error);
    }, [id]);

    if (!fruit) return <p>Caricamento in corso...</p>;

    return (
        <div className="fruit-detail-container">
            <img src={fruit.image} alt={fruit.title} className="fruit-detail-image" />
            <h2>{fruit.title}</h2>
            <p><strong>Categoria:</strong> {fruit.category}</p>
            <p><strong>Colore:</strong> {fruit.color}</p>
            <p><strong>Origine:</strong> {fruit.origin}</p>
            <p><strong>Calorie:</strong> {fruit.calories}</p>
            <p><strong>Prezzo:</strong> €{fruit.price}</p>
            <p className="fruit-description">{fruit.description}</p>

            <button className="back-button" onClick={() => navigate(-1)}>
                ← Torna indietro
            </button>
        </div>
    );
}

export default FruitDetail;
