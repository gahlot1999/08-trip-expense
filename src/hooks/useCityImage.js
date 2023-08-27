import { useQuery } from '@tanstack/react-query';
import { getLink } from '../services/apiImages';

export function useCityImage(place) {
  const { data, isLoading } = useQuery({
    queryFn: () => getLink(place),
    queryKey: ['image'],
  });

  return { data, isLoading };
}
