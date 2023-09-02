import { useState } from 'react';
import styles from './ProtectedRoute.module.css';
import { useParams } from 'react-router-dom';
import { getTripPin } from '../../services/apiTrip';
import BackBtn from '../backBtn/BackBtn';
import { toast } from 'react-hot-toast';

function ProtectedRoute({ children }) {
  const params = useParams().id;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [correctPin, setCorrectPin] = useState('');

  getTripPin(params).then((el) => setCorrectPin(Number(el)));

  const [pinEntered, setPinEntered] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (Number(correctPin) === Number(pinEntered)) {
      setIsAuthenticated(true);
    } else {
      toast.error('Invalid pin entered');
    }
  }

  if (!isAuthenticated)
    return (
      <>
        <BackBtn />
        <div className={styles.enterPinContainer}>
          <form>
            <h2>Access Trippppp</h2>
            <div className={styles.fieldGroup}>
              <input
                type='number'
                autoFocus
                id='pin'
                placeholder='Enter your 4 digit pin'
                value={pinEntered}
                onChange={(e) => setPinEntered(e.target.value)}
              />
              <label className={styles.label} htmlFor='pin'>
                Enter your 4 digit pin
              </label>
            </div>
            <button className={styles.authBtn} onClick={handleSubmit}>
              Verify
            </button>
          </form>
        </div>
      </>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
