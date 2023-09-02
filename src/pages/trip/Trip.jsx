import styles from './Trip.module.css';

import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  AiFillEdit,
  AiFillDelete,
  AiFillPlusCircle,
  AiFillCloseSquare,
  AiFillCloseCircle,
} from 'react-icons/ai';
import { BiSolidReport } from 'react-icons/bi';

import { useTrips } from '../../hooks/useTrips';
import { useAddTripData } from '../../hooks/useAddTripData';
import { useGetTripData } from '../../hooks/useGetTripData';
import { useDeleteTripData } from '../../hooks/useDeleteTripData';

import FullPageSpinner from '../../ui/spinner/FullPageSpinner';
import SmallSpinner from '../../ui/spinner/SmallSpinner';
import TripSummary from './TripSummary';

import { formatPrice } from '../../services/helpers';

function Trip() {
  const summaryRef = useRef(null);
  const urlID = Number(useParams().id);
  const [deletingEl, setDeletingEl] = useState('');
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: mutateDeleteTripData } = useDeleteTripData(urlID);
  const { data: expenseData, isLoading: isLoadingExpenseData } =
    useGetTripData(urlID);

  const total = expenseData?.reduce((curr, el) => el.amount + curr, 0);

  const { data, isLoading } = useTrips();
  const { mutate: mutateAddTripData, isLoading: isAddingExpense } =
    useAddTripData();

  const tripData = data?.filter((el) => el.id === urlID).at(0);
  const friends = tripData?.friends;

  const categories = [
    'Accommodation',
    'Food',
    'Travel',
    'Entertainment',
    'Other',
  ];

  function onSubmit(data) {
    mutateAddTripData(
      { ...data, id: tripData?.id },
      {
        onSuccess: () => {
          reset();
          handleShowAddExpenseForm();
        },
      },
    );
  }

  function handleDelete(expId) {
    const deleteTripData = confirm('Confirm trip data deletion');
    if (deleteTripData) {
      setDeletingEl(expId);
      mutateDeleteTripData(expId, {
        onSuccess: () => {
          console.log(expenseData);
          if (expenseData.length === 1) handleShowAddExpenseForm();
        },
      });
    }
  }

  function handleShowSummary() {
    setShowSummary((curr) => !curr);
    if (summaryRef?.current) {
      summaryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  function handleShowAddExpenseForm() {
    setShowAddExpenseForm((curr) => !curr);
  }

  if (isLoading || isLoadingExpenseData) return <FullPageSpinner />;

  return (
    <div className={styles.trip}>
      <div className={styles.tripContent}>
        <h2>{tripData.place}</h2>

        {showSummary && (
          <TripSummary
            expenseData={expenseData}
            friends={friends}
            handleShowSummary={handleShowSummary}
            total={total}
            summaryRef={summaryRef}
          />
        )}

        {showAddExpenseForm && (
          <div className={styles.addExpense}>
            {expenseData.length > 0 && (
              <AiFillCloseSquare size={24} onClick={handleShowAddExpenseForm} />
            )}
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
        )}

        {expenseData.length > 0 && (
          <div className={styles.expenseContainer}>
            <div
              className={`${styles.expenseItem} ${styles.expenseItemHeader}`}
            >
              <span>Expense</span>
              <span>Amount</span>
              <span>Paid By</span>
              <span className={styles.expenseButtonGroup}>
                {showSummary ? (
                  <AiFillCloseCircle
                    size={20}
                    onClick={handleShowSummary}
                    fill='var(--clr-danger)'
                  />
                ) : (
                  <BiSolidReport
                    size={20}
                    onClick={handleShowSummary}
                    fill='var(--clr-primary)'
                  />
                )}
                {showAddExpenseForm ? (
                  <AiFillCloseCircle
                    size={20}
                    onClick={handleShowAddExpenseForm}
                    fill='var(--clr-danger)'
                  />
                ) : (
                  <AiFillPlusCircle
                    size={20}
                    onClick={handleShowAddExpenseForm}
                    fill='hsl(var(--clr-secondary-hsl), .7)'
                  />
                )}
              </span>
            </div>

            {expenseData?.map((el) => (
              <div key={el.expId} className={styles.expenseItem}>
                <span>{el.expenseName}</span>
                <span>{formatPrice(el.amount)}</span>
                <span>{el.paidBy}</span>
                <span className={styles.expenseButtonGroup}>
                  <AiFillEdit size={18} />

                  {el.expId === deletingEl ? (
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

            <div
              className={`${styles.expenseItem} ${styles.expenseItemHeader}`}
            >
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trip;
