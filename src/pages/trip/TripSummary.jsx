import { formatPrice } from '../../services/helpers';
import styles from './TripSummary.module.css';

function TripSummary({ expenseData }) {
  const tripSummary = {};

  expenseData?.forEach((expense) => {
    const { paidBy, amount } = expense;

    if (!tripSummary[paidBy]) {
      tripSummary[paidBy] = amount;
    } else {
      tripSummary[paidBy] += amount;
    }
  });

  return (
    <div className={styles.summary}>
      <h2>Trip Summary</h2>

      <div className={styles.summaryChart}>Chart</div>

      <div className={styles.expenseSummaryContainer}>
        {Object.entries(tripSummary).map((el) => (
          <div key={el} className={styles.expenseSummary}>
            <p>{el[0]}</p>
            <p>{formatPrice(el[1])}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripSummary;
