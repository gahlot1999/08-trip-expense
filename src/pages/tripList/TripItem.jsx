import styles from './TripItem.module.css';
import { MdDeleteOutline } from 'react-icons/md';
import { useCityImage } from '../../hooks/useCityImage';
import { useDeleteTrip } from '../../hooks/useDeleteTrip';
import { Link } from 'react-router-dom';

function TripItem({ trip }) {
  const { mutate: mutateDeleteTrip, isLoading: isDeletingTrip } =
    useDeleteTrip();

  function handleDeleteTrip() {
    const deleteTrip = confirm('Confirm Trip Deletion');
    if (deleteTrip) mutateDeleteTrip(trip.id);
  }

  const { data: url } = useCityImage(trip?.place);

  return (
    <Link
      to={`/trip/${trip.id}`}
      style={
        !isDeletingTrip
          ? {
              background: `linear-gradient(180deg, hsl(156.9, 89.9%, 42.5%, .2), hsl(156.9, 89.9%, 42.5%, .5)),url(${url})`,
            }
          : {
              background: `linear-gradient(0deg, hsl(240, 3.6%, 16.3%, .9), hsl(240, 3.6%, 16.3%, .9)),url(${url})`,
            }
      }
      className={styles.tripListItem}
    >
      <div className={styles.deleteSvgButton} onClick={handleDeleteTrip}>
        <MdDeleteOutline size={24} />
      </div>
      <p>{trip.place}</p>
    </Link>
  );
}

export default TripItem;
