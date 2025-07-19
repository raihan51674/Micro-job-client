
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const useUserCoins = () => {
  const { user } = useContext(AuthContext);

  const { data, isPending, isLoading, error, refetch } = useQuery({
    queryKey: ['coins', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user.email}`, {
        withCredentials: true
      });
      return res?.data?.currentCoin; // This should be totalCoins
    },
  });

  return { coins: data, isLoading, error, refetch };
};

export default useUserCoins;
