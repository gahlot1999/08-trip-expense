import styles from './TripItem.module.css';
import { MdDeleteOutline } from 'react-icons/md';
import { useCityImage } from '../../hooks/useCityImage';

function TripItem({ trip }) {
  const { data: url } = useCityImage(trip?.place);

  return (
    <div
      style={{
        background: `linear-gradient(180deg, hsl(156.9, 89.9%, 42.5%, .2), hsl(156.9, 89.9%, 42.5%, .5)),url(${url})`,
      }}
      className={styles.tripListItem}
    >
      <div className={styles.deleteSvgButton}>
        <MdDeleteOutline size={24} />
      </div>
      <p>{trip.place}</p>
    </div>
  );
}

export default TripItem;
