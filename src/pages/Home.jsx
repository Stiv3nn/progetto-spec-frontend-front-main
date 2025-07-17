// src/pages/Home.jsx
import { Link } from 'react-router-dom';
// import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Benvenuto nel Comparatore di Frutta 🍓</h1>
      <Link to="/fruits">
        <button className="start-button">Inizia</button>
      </Link>
    </div>
  );
}

export default Home;
