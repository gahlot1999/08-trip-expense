import styles from './AddTrip.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';

function AddTrip() {
  return (
    <>
      <button className={styles.backBtn}>
        <IoMdArrowRoundBack size={24} />
      </button>
      <div className={styles.addTripForm}>
        <form>
          <div className={styles.fieldGroup}>
            <input type='text' id='tripPlace' placeholder='Trip Place' />
            <label htmlFor='tripPlace' className={styles.label}>
              Trip Place
            </label>
          </div>

          <div className={styles.fieldGroup}>
            <input type='text' id='tripDesc' placeholder='Trip Description' />
            <label htmlFor='tripDesc' className={styles.label}>
              Trip Description
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTrip;
