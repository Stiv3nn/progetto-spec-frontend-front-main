import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Benvenuto nel Comparatore di Frutta! 🍇🍎🍌</h1>
      <Link to="/fruits" className="home-button">
        Vai alla lista dei frutti →
      </Link>
    </div>
  );
}

export default Home;
