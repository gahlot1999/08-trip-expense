import { useParams } from 'react-router-dom';
import styles from './Trip.module.css';
import BackBtn from '../../ui/backBtn/BackBtn';
import { useTrips } from '../../hooks/useTrips';
import Spinner from '../../ui/spinner/FullPageSpinner';

function Trip() {
  const urlID = useParams().id;

  const { data, isLoading } = useTrips();

  const tripData = data?.filter((el) => el.id === Number(urlID)).at(0);

  const friends = tripData?.friends;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.trip}>
      <BackBtn />
      <div className={styles.tripHeader}>
        <h2>{tripData.place}</h2>
      </div>

      <div className={styles.tripContent}>
        <div className={styles.expense}>Expense</div>

        <div className={styles.addExpense}>
          <h2>Add Expense</h2>
          <form>
            <div className={styles.fieldGroup}>
              <input type='text' placeholder='Expense Name' id='name' />
              <label className={styles.label} htmlFor='name'>
                Expense Name
              </label>
            </div>

            <div className={styles.fieldGroup}>Category</div>

            <div className={styles.fieldGroup}>
              <input type='number' placeholder='Amount' id='amount' />
              <label className={styles.label} htmlFor='amount'>
                Amount
              </label>
            </div>

            <div className={styles.selectGroup}>
              <label htmlFor='friends'>Paid By</label>
              <select name='friends' id='friends'>
                {friends?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Trip;
