import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTrip } from '../services/apiTrip';
import { toast } from 'react-hot-toast';

export function useDeleteTrip() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries(['trips']);
      toast.success('Trip deleted successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}
