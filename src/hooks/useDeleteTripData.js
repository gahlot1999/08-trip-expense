import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTripData } from '../services/apiTrip';
import { toast } from 'react-hot-toast';

export function useDeleteTripData(tripId) {
  const query = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTripData,
    onSuccess: () => {
      query.invalidateQueries(tripId, ['tripData']);
      toast.success('Deleted');
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
