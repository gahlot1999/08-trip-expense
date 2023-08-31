import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { useTrips } from '../../hooks/useTrips';
import { useAddTripData } from '../../hooks/useAddTripData';

import styles from './Trip.module.css';
import BackBtn from '../../ui/backBtn/BackBtn';
import FullPageSpinner from '../../ui/spinner/FullPageSpinner';
import SmallSpinner from '../../ui/spinner/SmallSpinner';
import { useGetTripData } from '../../hooks/useGetTripData';
import { useDeleteTripData } from '../../hooks/useDeleteTripData';

function Trip() {
  const urlID = Number(useParams().id);

  const { mutate: mutateDeleteTripData, isLoading: isDeletingTripData } =
    useDeleteTripData(urlID);
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

  function handleDelete(expId) {
    const deleteTripData = confirm('Confirm trip data deletion');
    if (deleteTripData) mutateDeleteTripData(expId);
  }

  if (isLoading || isLoadingExpenseData) return <FullPageSpinner />;

  return (
    <>
      <BackBtn />
      <div className={styles.trip}>
        <div className={styles.tripContent}>
          <h2>{tripData.place}</h2>
          <div className={styles.expenseContainer}>
            <div
              className={`${styles.expenseItem} ${styles.expenseItemHeader}`}
            >
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
                  <AiFillEdit size={18} />

                  {isDeletingTripData ? (
                    <SmallSpinner />
                  ) : (
                    <AiFillDelete
                      onClick={() => handleDelete(el.expId)}
                      size={18}
                    />
                  )}
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
                  {isAddingExpense ? <SmallSpinner /> : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trip;
