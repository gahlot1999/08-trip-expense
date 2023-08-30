import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { useTrips } from '../../hooks/useTrips';
import { useAddTripData } from '../../hooks/useAddTripData';

import styles from './Trip.module.css';
import BackBtn from '../../ui/backBtn/BackBtn';
import Spinner from '../../ui/spinner/FullPageSpinner';
import { useGetTripData } from '../../hooks/useGetTripData';

function Trip() {
  const urlID = Number(useParams().id);

  const { data: expenseData, isLoading: isLoadingExpenseData } =
    useGetTripData(urlID);
  const { data, isLoading } = useTrips();
  const tripData = data?.filter((el) => el.id === urlID).at(0);
  const { mutate: mutateAddTripData, isLoading: isAddingExpense } =
    useAddTripData();

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

  function onSubmit(data) {
    const expData = { ...data, id: tripData.id };
    mutateAddTripData(expData);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.trip}>
      <BackBtn />
      <div className={styles.tripHeader}>
        <h2>{tripData.place}</h2>
      </div>

      <div className={styles.tripContent}>
        <div className={styles.expenseContainer}>
          <div className={`${styles.expenseItem} ${styles.expenseItemHeader}`}>
            <span>Expense</span>
            <span>Amount</span>
            {/* <span>Travel</span> */}
            <span>Paid By</span>
          </div>

          {expenseData?.map((el) => (
            <div key={el.expId} className={styles.expenseItem}>
              <span>{el.expenseName}</span>
              <span>{el.amount}</span>
              {/* <span>Travel</span> */}
              <span>{el.paidBy}</span>
              <span className={styles.expenseButtonGroup}>
                <AiFillEdit size={16} />
                <AiFillDelete size={16} />
              </span>
            </div>
          ))}
        </div>

        <div className={styles.addExpense}>
          <h2>Add Expense</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldGroup}>
              <input
                style={
                  errors?.expenseName
                    ? { borderBottom: '2px solid var(--clr-danger)' }
                    : { borderBottom: '2px solid var(--clr-primary)' }
                }
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
                style={
                  errors?.amount
                    ? { borderBottom: '2px solid var(--clr-danger)' }
                    : { borderBottom: '2px solid var(--clr-primary)' }
                }
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
                style={
                  errors?.category
                    ? { borderBottom: '2px solid var(--clr-danger)' }
                    : { borderBottom: '2px solid var(--clr-primary)' }
                }
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
                style={
                  errors?.paidBy
                    ? { borderBottom: '2px solid var(--clr-danger)' }
                    : { borderBottom: '2px solid var(--clr-primary)' }
                }
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
              <button type='submit'>
                {isAddingExpense ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Trip;
