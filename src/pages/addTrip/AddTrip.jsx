import styles from './AddTrip.module.css';

function AddTrip() {
  return (
    <div className={styles.addTripForm}>
      <form>
        <div className={styles.fieldGroup}>
          <input type='text' id='tName' placeholder='Trip Name' />
          <label htmlFor='tName' className={styles.label}>
            Trip Name
          </label>
        </div>
      </form>
    </div>
  );
}

export default AddTrip;
