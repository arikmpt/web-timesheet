import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/auth';
import { getProfile } from '@/lib/api/profile';

export const useProfile = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!token,
  });
};
