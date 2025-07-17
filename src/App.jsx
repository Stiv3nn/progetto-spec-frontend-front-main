import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FruitPage from './pages/FruitPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';
import FruitDetail from './pages/FruitDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fruits" element={<FruitPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/fruits/:id" element={<FruitDetail />} />
    </Routes>
  );
}

export default App;
