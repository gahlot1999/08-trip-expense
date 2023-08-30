import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  function handleNewTrip() {
    navigate('/add');
  }

  function handleExistingTrip() {
    navigate('/trips');
  }

  return (
    <div className={styles.home}>
      <button onClick={handleNewTrip}>Let&apos;s Travel ✈️</button>
      <button onClick={handleExistingTrip}>Past Journeys 📅</button>
    </div>
  );
}

export default Home;
