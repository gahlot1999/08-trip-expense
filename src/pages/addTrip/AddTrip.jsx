import { useNavigate } from 'react-router-dom';
import styles from './AddTrip.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';

function AddTrip() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }

  function handleAddFriend(e) {
    e.preventDefault();
    console.log('Handle Add Friend');
  }

  function handleAddTrip(e) {
    e.preventDefault();
    console.log('Handle Add Trip');
  }

  function handleShowHideFriend(e) {
    e.preventDefault();
    setShowAddFriend((curr) => !curr);
  }

  return (
    <>
      <button className={styles.backBtn} onClick={handleBackClick}>
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

          {showAddFriend && (
            <div className={styles.fieldGroup}>
              <input type='text' id='friend' placeholder='Add Friend' />
              <label htmlFor='friend' className={styles.label}>
                Add Friend
              </label>
            </div>
          )}

          <div className={styles.addTripButtonGroup}>
            {showAddFriend && <button onClick={handleAddFriend}>Add</button>}

            <button onClick={handleShowHideFriend}>
              {!showAddFriend ? 'Add Friend' : 'Close'}
            </button>

            <button onClick={handleAddTrip}>Add Trip</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTrip;
