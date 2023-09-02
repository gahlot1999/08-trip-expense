import styles from './TripSummary.module.css';

import { AiFillCloseSquare } from 'react-icons/ai';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { formatPrice, randomColor } from '../../services/helpers';

function TripSummary({ expenseData, handleShowSummary, summaryRef }) {
  const tripSummary = [];
  const dummyTripSummaryByCategory = [];
  let tripSummaryByCategory = [];

  expenseData?.forEach((expense) => {
    const { paidBy, amount, category } = expense;

    if (!tripSummary[paidBy]) {
      tripSummary[paidBy] = amount;
    } else {
      tripSummary[paidBy] += amount;
    }

    if (!dummyTripSummaryByCategory[category]) {
      dummyTripSummaryByCategory[category] = amount;
    } else {
      dummyTripSummaryByCategory[category] += amount;
    }
  });

  tripSummaryByCategory = Object.entries(dummyTripSummaryByCategory).map(
    ([category, amount]) => ({
      category,
      amount,
      color: randomColor(),
    }),
  );

  return (
    <div className={styles.summary}>
      <AiFillCloseSquare size={24} onClick={handleShowSummary} />
      <h2>Trip Summary</h2>

      <div className={styles.summaryChart} ref={summaryRef}>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={tripSummaryByCategory}
              nameKey='category'
              dataKey='amount'
              innerRadius={65}
              outerRadius={80}
              paddingAngle={3}
            >
              {tripSummaryByCategory.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconSize={10} iconType='circle' />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.expenseSummaryContainer}>
        {Object.entries(tripSummary).map((el) => (
          <div key={el} className={styles.expenseSummary}>
            <p>{el.at(0)}</p>
            <p>{formatPrice(el.at(1))}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripSummary;
