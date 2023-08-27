import styles from './TripList.module.css';

import { useTrips } from '../../hooks/useTrips';
import BackBtn from '../../ui/backBtn/BackBtn';
import FullPageSpinner from '../../ui/spinner/FullPageSpinner';
import TripItem from './TripItem';

function TripList() {
  const { data, isLoading } = useTrips();

  if (isLoading) return <FullPageSpinner />;

  return (
    <>
      <BackBtn />
      <div className={styles.tripListContainer}>
        <h2>Travel Log</h2>
        <div className={styles.tripList}>
          {data.map((el) => (
            <TripItem key={el.id} trip={el} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TripList;
