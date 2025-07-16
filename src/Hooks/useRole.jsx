import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/role/${user.email}`);
        setRole(data?.role);
      } catch (err) {
        console.error("Error fetching role:", err.message);
      } finally {
        setIsRoleLoading(false);
      }
    };

    if (user?.email) {
      fetchRoleData();
    }

  }, [user]);

  return { role, isRoleLoading };
};

export default useRole;
