import styles from './FullPageSpinner.module.css';

function FullPageSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <span className={styles.spinner}></span>;
    </div>
  );
}

export default FullPageSpinner;
