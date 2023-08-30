import { useQuery } from '@tanstack/react-query';
import { getTripData } from '../services/apiTrip';

export function useGetTripData(id) {
  const { data, isLoading } = useQuery({
    queryFn: getTripData,
    queryKey: [id, 'tripData'],
  });

  return { data, isLoading };
}
