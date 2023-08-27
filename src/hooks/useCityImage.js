import { useQuery } from '@tanstack/react-query';
import { getLink } from '../services/apiImages';

export function useCityImage(place) {
  const { data, isLoading } = useQuery({
    queryKey: ['image', place],
    queryFn: () => getLink(place),
  });

  return { data, isLoading };
}
