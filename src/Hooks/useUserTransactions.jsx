
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const useUserTransactions = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`);
      // Filter transactions only for the logged-in user
      return res.data.filter(item => item.userEmail === user?.email);
    },
  });

  return { transactions: data || [], isLoading, error };
};

export default useUserTransactions;
