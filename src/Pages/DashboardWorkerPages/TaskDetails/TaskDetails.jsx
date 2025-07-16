import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DollarSign, UserPlus, Calendar, FileText, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';
import LoadingSpinner from '../../../Shared/LoadingSpinner';



const TaskDetails = () => {
    const { id } = useParams(); // Get taskId from URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Get logged-in user info
    const [submissionDetails, setSubmissionDetails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch specific task data using useQuery
    const {
        data: task = {},
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['taskDetails', id],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/task/${id}`);
            return data;
        },
        enabled: !!id, // Run query only if id exists
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-lg">
                <p>Error loading task: {error.message}</p>
            </div>
        );
    }

    // If task not found
    if (!task._id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400 text-lg">
                <p>No task found.</p>
            </div>
        );
    }

    const handleTaskSubmission = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to submit the task.',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#8B5CF6',
            });
            navigate('/login');
            return;
        }

        if (!submissionDetails.trim()) {
            toast.error('Submission details cannot be empty.');
            return;
        }

        setIsSubmitting(true);

        const submissionData = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task?.payableAmount,
            worker_email: user?.email,
            submission_details: submissionDetails,
            worker_name: user?.displayName || 'Unknown Worker',
            Buyer_name: task.buyer?.name,
            Buyer_email: task.buyer?.email,
            current_date: new Date().toISOString(),
            status: 'pending',
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/submit-task`, submissionData);
            console.log('Submission successful:', response.data);
            Swal.fire({
                title: 'Submitted Successfully!',
                text: 'Your task has been submitted successfully.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                confirmButtonColor: '#8B5CF6',
            });
            setSubmissionDetails('');
        } catch (submitError) {
            console.error('Submission error:', submitError);
            Swal.fire({
                title: 'Submission Failed',
                text: 'There was an error submitting the task. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#8B5CF6',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center font-sans text-white bg-gray-900">
            <motion.div
                className="max-w-4xl mx-auto w-full bg-gray-800/30 backdrop-blur-3xl rounded-3xl shadow-2xl border border-gray-700/60 p-6 md:p-10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight leading-tight mb-4 drop-shadow-lg">
                        {task.task_title}
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Task details and submission form.
                    </p>
                </div>

                {/* Task Details Section */}
                <div className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600/70 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Task Details</h2>
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                        {task?.taskDetails}
                    </p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-300 text-sm">
                            <FileText className="w-4 h-4 mr-2 text-purple-400" />
                            <span>
                                Buyer: <span className="font-medium text-white">{task?.buyer?.name}</span>
                            </span>
                        </div>
                        <div className="flex items-center text-gray-300 text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                            <span>
                                Completion Date: <span className="font-medium text-white">{task?.completationDate}</span>
                            </span>
                        </div>
                        <div className="flex items-center text-green-400 text-sm font-semibold">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span>
                                Payable: <span className="text-lg font-bold">${task?.payableAmount}</span>
                            </span>
                        </div>
                        <div className="flex items-center text-blue-400 text-sm font-semibold">
                            <UserPlus className="w-4 h-4 mr-2" />
                            <span>
                                Workers Needed: <span className="text-lg font-bold">{task?.requiredWorkers}</span>
                            </span>
                        </div>
                        <div className="flex items-center text-gray-300 text-sm">
                            <img src={task?.image} alt="Task" className="w-16 h-16 object-cover rounded-md mr-2" />
                            <span>Task Image</span>
                        </div>
                    </div>
                </div>

                {/* Submission Form Section */}
                <div className="bg-gray-700/40 p-6 rounded-xl shadow-lg border border-gray-600/70">
                    <h2 className="text-2xl font-bold text-white mb-4">Submit Your Task</h2>
                    <form onSubmit={handleTaskSubmission} className="space-y-4">
                        <div>
                            <label htmlFor="submission_details" className="block text-gray-300 text-sm font-medium mb-2">
                                Write your submission details:
                            </label>
                            <textarea
                                id="submission_details"
                                value={submissionDetails}
                                onChange={(e) => setSubmissionDetails(e.target.value)}
                                rows="6"
                                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                                placeholder="Describe what you completed for the task..."
                                required
                            ></textarea>
                        </div>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting || !user}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-base shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" /> Submit Task
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>

                <motion.div
                    className="mt-12 text-center text-gray-500 text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <p className="mb-2">
                        Complete tasks using your skills and earn coins.
                    </p>
                    <p>&copy; {new Date().getFullYear()} CoinFlow. All rights reserved.</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TaskDetails;
