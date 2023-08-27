import { useCityImage } from '../../hooks/useCityImage';
import Spinner from '../../ui/spinner/FullPageSpinner';
import styles from './TripItem.module.css';

function TripItem({ trip }) {
  const { data: url, isLoading } = useCityImage(trip?.place);

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className={styles.tripListItem}
    >
      {trip.place}
    </div>
  );
}

export default TripItem;
