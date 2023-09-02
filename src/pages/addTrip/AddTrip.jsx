import styles from './AddTrip.module.css';
import { TiDelete } from 'react-icons/ti';
import { useState } from 'react';
import BackBtn from '../../ui/backBtn/BackBtn';
import SmallSpinner from '../../ui/spinner/SmallSpinner';
import { useCreateTrip } from '../../hooks/useCreateTrip';
import { toast } from 'react-hot-toast';

import { LiaUserFriendsSolid } from 'react-icons/lia';
import { isEmpty } from '../../services/helpers';

function AddTrip() {
  const { mutate: mutateCreateTrip, isLoading: isCreatingTrip } =
    useCreateTrip();

  const [tripPlace, setTripPlace] = useState('');
  const [tripDesc, setTripDesc] = useState('');
  const [tripPin, setTripPin] = useState('');
  const [friend, setFriend] = useState('');
  const [friends, setFriends] = useState([]);

  function handleAddFriend(e) {
    e.preventDefault();
    if (isEmpty(friend)) {
      setFriend('');
      return;
    }
    setFriends((arr) => [...arr, friend]);
    setFriend('');
  }

  function handleAddTrip(e) {
    e.preventDefault();

    if (!tripPlace || !tripDesc || !tripPin || isEmpty(tripPin)) {
      toast.error('All fields are mandatory');
      return;
    }

    if (tripPin.length > 4) {
      toast.error('Trip pin must be of 4 digit');
      return;
    }

    if (friends.length < 2) {
      toast.error('Add atleast two friends');
      return;
    }

    const newTrip = {
      place: tripPlace,
      description: tripDesc,
      friends,
      pin: tripPin,
    };

    mutateCreateTrip(newTrip);
  }

  function handleDeleteFriend(data) {
    setFriends((curr) => curr.filter((el) => el !== data));
  }

  return (
    <>
      <BackBtn size={24} />
      <div className={styles.addTripForm}>
        <h2>
          From Idea to Itinerary <span>Your Next Adventure Starts Now!</span>
        </h2>
        <form>
          <div className={styles.fieldGroup}>
            <input
              disabled={isCreatingTrip}
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
              disabled={isCreatingTrip}
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

          <div className={styles.fieldGroup}>
            <input
              disabled={isCreatingTrip}
              type='number'
              inputMode='numeric'
              id='tripPin'
              placeholder='Enter 4 Digit Trip Pin'
              value={tripPin}
              onChange={(e) => setTripPin(e.target.value)}
            />
            <label htmlFor='tripPin' className={styles.label}>
              Enter 4 Digit Trip Pin
            </label>
          </div>

          <div className={styles.fieldGroup}>
            <input
              disabled={isCreatingTrip}
              type='text'
              id='friend'
              placeholder='Add Friend'
              value={friend}
              onChange={(e) => setFriend(e.target.value)}
            />
            <label
              name='addFriendButton'
              htmlFor='friend'
              className={styles.label}
            >
              Add Friend
            </label>
            <button onClick={handleAddFriend}>
              <LiaUserFriendsSolid size={24} />
            </button>
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

          <button onClick={handleAddTrip} className={styles.addTripButton}>
            {isCreatingTrip ? <SmallSpinner /> : 'Add Trip'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTrip;
