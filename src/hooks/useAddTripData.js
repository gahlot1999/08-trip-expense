import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTripData } from '../services/apiTrip';
import { toast } from 'react-hot-toast';

export function useAddTripData() {
  const query = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addTripData,
    onSuccess: (data) => {
      query.invalidateQueries(data.at(0).id, ['tripData']);
      toast.success('Data added');
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
