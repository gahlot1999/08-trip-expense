import { useMutation } from '@tanstack/react-query';
import { createTrip } from '../services/apiTrip';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateTrip() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createTrip(data),
    onSuccess: () => {
      toast.success('New trip added');
      navigate('/trips');
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
