import { useMutation } from '@tanstack/react-query';
import { addTripData } from '../services/apiTrip';
import { toast } from 'react-hot-toast';

export function useAddTripData() {
  const { mutate, isLoading } = useMutation({
    mutationFn: addTripData,
    onSuccess: () => toast.success('Data added'),
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
