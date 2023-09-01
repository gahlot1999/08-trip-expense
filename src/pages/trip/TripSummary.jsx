import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { formatPrice, randomColor } from '../../services/helpers';
import styles from './TripSummary.module.css';

/* const tripSummaryByCategory1 = [
    { category: 'Accommodation', amount: 4500, color: 'red' },
    { category: 'Food', amount: 2000, color: 'royalblue' },
    { category: 'Travel', amount: 1500, color: 'orangered' },
    { category: 'Entertainment', amount: 1000, color: 'green' },
    { category: 'Other', amount: 700, color: 'gray' },
  ]; */

function TripSummary({ expenseData }) {
  const tripSummary = [];
  const dummyTripSummaryByCategory = [];
  const tripSummaryByCategory = [];

  expenseData?.forEach((expense) => {
    const { paidBy, amount } = expense;

    if (!tripSummary[paidBy]) {
      tripSummary[paidBy] = amount;
    } else {
      tripSummary[paidBy] += amount;
    }
  });

  expenseData?.forEach((expense) => {
    let { category, amount } = expense;

    if (!dummyTripSummaryByCategory[category]) {
      dummyTripSummaryByCategory[category] = amount;
    } else {
      dummyTripSummaryByCategory[category] += amount;
    }
  });

  for (const category in dummyTripSummaryByCategory) {
    tripSummaryByCategory.push({
      category,
      amount: dummyTripSummaryByCategory[category],
      color: randomColor(),
    });
  }

  randomColor();

  return (
    <div className={styles.summary}>
      <h2>Trip Summary</h2>

      <div className={styles.summaryChart}>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={tripSummaryByCategory}
              nameKey='category'
              dataKey='amount'
              innerRadius={75}
              outerRadius={100}
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
