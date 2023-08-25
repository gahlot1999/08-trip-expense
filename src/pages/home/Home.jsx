import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <button>New Trip?</button>
      <button>Existing Trip?</button>
    </div>
  );
}

export default Home;
