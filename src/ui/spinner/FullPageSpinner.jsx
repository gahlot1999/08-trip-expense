import styles from './FullPageSpinner.module.css';

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <span className={styles.spinner}></span>;
    </div>
  );
}

export default Spinner;
