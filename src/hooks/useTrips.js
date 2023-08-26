import { useQuery } from '@tanstack/react-query';
import { getTrips } from '../services/apiTrip';

export function useTrips() {
  const { data, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: getTrips,
  });

  return { data, isLoading };
}
