import { useNavigate } from 'react-router-dom';
import styles from './AddTrip.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import { useState } from 'react';

function AddTrip() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [tripPlace, setTripPlace] = useState('Jaipur');
  const [tripDesc, setTripDesc] = useState('4 days trip in jaipur');
  const [friend, setFriend] = useState('');
  const [friends, setFriends] = useState([
    'Ashish',
    'Hitesh',
    'Kritika',
    'Mayank',
  ]);

  const navigate = useNavigate();
  function handleBackClick() {
    navigate(-1);
  }

  function handleAddFriend(e) {
    e.preventDefault();
    setFriends((arr) => [...arr, friend]);
    setFriend('');
    setShowAddFriend(false);
  }

  function handleAddTrip(e) {
    e.preventDefault();
    console.log(tripPlace, tripDesc, friends);
  }

  function handleShowHideFriend(e) {
    e.preventDefault();
    setShowAddFriend((curr) => !curr);
  }

  function handleDeleteFriend(data) {
    setFriends((curr) => curr.filter((el) => el !== data));
  }

  return (
    <>
      <button className={styles.backBtn} onClick={handleBackClick}>
        <IoMdArrowRoundBack size={24} />
      </button>
      <div className={styles.addTripForm}>
        <form>
          <div className={styles.fieldGroup}>
            <input
              type='text'
              id='tripPlace'
              placeholder='Trip Place'
              value={tripPlace}
              onChange={(e) => setTripPlace(e.target.value)}
            />
            <label htmlFor='tripPlace' className={styles.label}>
              Trip Place
            </label>
          </div>

          <div className={styles.fieldGroup}>
            <input
              type='text'
              id='tripDesc'
              placeholder='Trip Description'
              value={tripDesc}
              onChange={(e) => setTripDesc(e.target.value)}
            />
            <label htmlFor='tripDesc' className={styles.label}>
              Trip Description
            </label>
          </div>

          {friends.length > 0 && (
            <div>
              <p className={styles.friendsHeading}>Friends</p>
              <div className={styles.friendsContainer}>
                {friends.map((el) => (
                  <span
                    onClick={() => handleDeleteFriend(el)}
                    className={styles.friendName}
                    key={el}
                  >
                    {el} <TiDelete />
                  </span>
                ))}
              </div>
            </div>
          )}

          {showAddFriend && (
            <div className={styles.fieldGroup}>
              <input
                type='text'
                id='friend'
                placeholder='Add Friend'
                value={friend}
                onChange={(e) => setFriend(e.target.value)}
              />
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
