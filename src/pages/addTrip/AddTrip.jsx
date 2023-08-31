import styles from './AddTrip.module.css';
import { TiDelete } from 'react-icons/ti';
import { useState } from 'react';
import BackBtn from '../../ui/backBtn/BackBtn';
import Spinner from '../../ui/spinner/Spinner';
import { useCreateTrip } from '../../hooks/useCreateTrip';
import { toast } from 'react-hot-toast';

function AddTrip() {
  const { mutate: mutateCreateTrip, isLoading: isCreatingTrip } =
    useCreateTrip();

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [tripPlace, setTripPlace] = useState('');
  const [tripDesc, setTripDesc] = useState('');
  const [friend, setFriend] = useState('');
  const [friends, setFriends] = useState([]);

  function handleAddFriend(e) {
    e.preventDefault();
    setFriends((arr) => [...arr, friend]);
    setFriend('');
    setShowAddFriend(false);
  }

  function handleAddTrip(e) {
    e.preventDefault();

    if (!tripPlace || !tripDesc) {
      toast.error('All fields are mandatory');
      return;
    }

    if (friends.length < 3) {
      toast.error('Add atleast two friends');
      return;
    }

    const newTrip = {
      place: tripPlace,
      description: tripDesc,
      friends,
    };

    mutateCreateTrip(newTrip);
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
                disabled={isCreatingTrip}
                autoFocus
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
            {showAddFriend && (
              <button onClick={handleAddFriend}>Add Friend</button>
            )}

            <button
              onClick={handleShowHideFriend}
              className={!showAddFriend ? '' : styles.dangerBtn}
            >
              {!showAddFriend ? 'Add Friend' : 'Close'}
            </button>

            <button onClick={handleAddTrip}>
              {isCreatingTrip ? <Spinner /> : 'Add Trip'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTrip;
