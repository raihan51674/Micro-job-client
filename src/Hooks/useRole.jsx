import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const useRole = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    useEffect(() => {
        const fetchRoleData = async () => {
            // DEBUG: সার্ভারে পাঠানোর আগে user.email চেক করুন
            console.log("Fetching role for email:", user?.email);
            if (!user?.email) {
                console.error("No email found for user, cannot fetch role.");
                setIsRoleLoading(false);
                return;
            }

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/role/${user.email}`);
                setRole(data?.role);
                console.log("Successfully fetched role:", data?.role); // DEBUG: সফল হলে রোল দেখুন
            } catch (err) {
                console.error("Error fetching role:", err.message);
                // DEBUG: এরর রেসপন্স বডিও দেখতে পারেন
                if (err.response) {
                    console.error("Error Response Data:", err.response.data);
                    console.error("Error Response Status:", err.response.status);
                    console.error("Error Response Headers:", err.response.headers);
                }
            } finally {
                setIsRoleLoading(false);
            }
        };

        if (user?.email) { // শুধু যদি user.email থাকে তবেই API কল হবে
            fetchRoleData();
        } else {
            // যদি user অবজেক্ট না থাকে বা email না থাকে, লোডিং শেষ করুন
            setIsRoleLoading(false);
            setRole(null); // রোল null সেট করুন
            console.log("User or user.email is not available yet.");
        }

    }, [user]);

    return { role, isRoleLoading };
};

export default useRole;