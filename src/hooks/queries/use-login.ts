import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/auth';
import { login } from '@/lib/api/auth';
import { toast } from 'sonner';
import { routes } from '@/constants/routes';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      setToken({ token });
      window.location.href = routes.ROOT;
    },
    onError: (err) => {
      toast.error('Error!', {
        description: err.message,
        position: 'top-right',
      });
    },
  });
};
