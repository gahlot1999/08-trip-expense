import { useTrips } from '../../hooks/useTrips';
import BackBtn from '../../ui/backBtn/BackBtn';
import FullPageSpinner from '../../ui/spinner/FullPageSpinner';

function TripList() {
  const { data, isLoading } = useTrips();

  console.log(data);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div>
      <BackBtn />
      
    </div>
  );
}

export default TripList;
