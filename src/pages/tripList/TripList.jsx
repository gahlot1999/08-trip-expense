import styles from './TripList.module.css';

import { useTrips } from '../../hooks/useTrips';
import BackBtn from '../../ui/backBtn/BackBtn';
import FullPageSpinner from '../../ui/spinner/FullPageSpinner';

function TripList() {
  const { data, isLoading } = useTrips();

  console.log(data);

  if (isLoading) return <FullPageSpinner />;

  return (
    <>
      <BackBtn />
      <div className={styles.tripListContainer}>
        <div>
          {data.map((el) => (
            <div key={el.id}>
              {el.place}
              <br />
              {el.description}
              <br />
              {el.friends}
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TripList;
