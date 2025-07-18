import { useEffect, useState } from 'react';
import FruitCard from '../components/FruitCard';
import './FavoritesPage.css';

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const handleRemove = (fruitId) => {
        const updated = favorites.filter(f => f.id !== fruitId);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="favorites-page">
            <h1>Frutti Preferiti 💜</h1>
            {favorites.length === 0 ? (
                <p className="no-favorites">Nessun frutto preferito al momento.</p>
            ) : (
                <div className="favorites-list">
                    {favorites.map(fruit => (
                        <FruitCard
                            key={fruit.id}
                            fruit={fruit}
                            isFavorite={true}
                            onToggleFavorite={() => handleRemove(fruit.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;
