import { useState } from 'react';
import { getLink } from '../../services/apiImages';
import styles from './TripItem.module.css';
import { useCityImage } from '../../hooks/useCityImage';

function TripItem({ trip }) {
  const { data: url, isLoading } = useCityImage(trip?.place);

  // const [url, setUrl] = useState('');

  // getLink(trip.place).then(function (result) {
  //   setUrl(result);
  // });

  return (
    <div
      style={{
        background: `linear-gradient(180deg, hsl(156.9, 89.9%, 42.5%, .2), hsl(156.9, 89.9%, 42.5%, .5)),url(${url})`,
      }}
      className={styles.tripListItem}
    >
      <p>{trip.place}</p>
    </div>
  );
}

export default TripItem;
