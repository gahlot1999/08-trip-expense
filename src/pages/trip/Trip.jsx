import { useParams } from 'react-router-dom';
import styles from './Trip.module.css';
import BackBtn from '../../ui/backBtn/BackBtn';
import { useTrips } from '../../hooks/useTrips';
import Spinner from '../../ui/spinner/FullPageSpinner';
import { useForm } from 'react-hook-form';

function Trip() {
  const urlID = useParams().id;

  const { data, isLoading } = useTrips();
  const tripData = data?.filter((el) => el.id === Number(urlID)).at(0);
  const friends = tripData?.friends;

  const categories = [
    'Accommodation',
    'Food',
    'Travel',
    'Entertainment',
    'Other',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(register, handleSubmit, errors);
  // console.log(errors);

  function onSubmit(data) {
    console.log(data);
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldGroup}>
              <input
                type='text'
                placeholder='Expense Name'
                id='name'
                {...register('expenseName', {
                  required: {
                    value: true,
                    message: 'Expense name is mandatory',
                  },
                })}
              />
              <label className={styles.label} htmlFor='name'>
                Expense Name
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type='number'
                placeholder='Amount'
                id='amount'
                {...register('amount', {
                  required: {
                    value: true,
                    message: 'Amount is mandatory',
                  },
                })}
              />
              <label className={styles.label} htmlFor='amount'>
                Amount
              </label>
            </div>

            <div className={styles.selectGroup}>
              <label htmlFor='categories'>Category</label>
              <select
                name='categories'
                id='categories'
                {...register('category', {
                  required: {
                    value: true,
                    message: 'Category is mandatory',
                  },
                })}
              >
                <option value=''>Select</option>
                {categories?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <label htmlFor='friends'>Paid By</label>
              <select
                name='friends'
                id='friends'
                {...register('paidBy', {
                  required: {
                    value: true,
                    message: 'Paid by is mandatory',
                  },
                })}
              >
                <option value=''>Select</option>
                {friends?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.buttonGroup}>
              <button type='reset'>Reset</button>
              <button type='submit'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Trip;
