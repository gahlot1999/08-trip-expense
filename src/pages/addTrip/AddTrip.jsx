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
            <input type='text' id='tName' placeholder='Trip Name' />
            <label htmlFor='tName' className={styles.label}>
              Trip Name
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTrip;
