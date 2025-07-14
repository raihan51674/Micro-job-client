
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import {
    ListTodo,
    FileText,
    Users,
    DollarSign,
    CalendarDays,
    Info,
    Image,
    Upload,
    X,
} from 'lucide-react';
import { imageUpload } from '../../../API/utils';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';


const AddTask = () => {
    const {user} = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const taskTitle = form.task_title.value;
        const taskDetails = form.task_detail.value;
        const requiredWorkers = form.required_workers.value;
        const payableAmount = form.payable_amount.value;
        const completationDate = form.completion_date.value;
        const submissionInfo = form.submission_info.value;
        const taskImageFile = form.task_image_file.files[0];

        const imageURL = await imageUpload(taskImageFile)

        const taskData = { 
            taskTitle, 
            taskDetails, 
            requiredWorkers: parseInt(requiredWorkers), 
            payableAmount: parseInt(payableAmount), 
            completationDate, 
            submissionInfo, 
            image: imageURL,
            buyer: {
                name: user?.displayName,
                email: user?.email,
                buyer_image: user?.photoURL
            }
         }

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-task`, taskData)


        if (data?.insertedId) {
            // Show SweetAlert
            Swal.fire({
                title: 'Task Added Successfully!',
                icon: 'success',
                confirmButtonText: 'Great!',

            })
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-8 min-h-screen text-gray-100 flex items-center justify-center"
        >
            <div className="max-w-4xl mx-auto w-full bg-black/40 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 p-6 md:p-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text ">
                    Add New Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased space-y */}
                    {/* Task Title */}
                    <div>
                        <label htmlFor="task_title" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                            <ListTodo className="h-4 w-4 mr-2 text-blue-400" />
                            Task Title *
                        </label>
                        <input
                            type="text"
                            id="task_title"
                            name="task_title"
                            placeholder="e.g., Watch my YouTube video and make a comment"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                            required
                        />
                    </div>

                    {/* Task Detail */}
                    <div>
                        <label htmlFor="task_detail" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-purple-400" />
                            Task Detail *
                        </label>
                        <textarea
                            id="task_detail"
                            name="task_detail"
                            rows="4"
                            placeholder="Provide a detailed description of the task..."
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
                        {/* Required Workers */}
                        <div>
                            <label htmlFor="required_workers" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                                <Users className="h-4 w-4 mr-2 text-yellow-400" />
                                Required Workers *
                            </label>
                            <input
                                type="number"
                                id="required_workers"
                                name="required_workers"
                                min="0"
                                placeholder="e.g., 100"
                                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                required
                            />
                        </div>

                        {/* Payable Amount */}
                        <div>
                            <label htmlFor="payable_amount" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                                <DollarSign className="h-4 w-4 mr-2 text-emerald-400" />
                                Payable Amount (per worker) *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    id="payable_amount"
                                    name="payable_amount"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="e.g., 10.00"
                                    className="w-full pl-8 p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Completion Date */}
                    <div>
                        <label htmlFor="completion_date" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                            <CalendarDays className="h-4 w-4 mr-2 text-red-400" />
                            Completion Date *
                        </label>
                        <input
                            type="date"
                            id="completion_date"
                            name="completion_date"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none shadow-inner"
                            required
                        />
                    </div>

                    {/* Submission Info */}
                    <div>
                        <label htmlFor="submission_info" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                            <Info className="h-4 w-4 mr-2 text-orange-400" />
                            Submission Information *
                        </label>
                        <input
                            type="text"
                            id="submission_info"
                            name="submission_info"
                            placeholder="e.g., Screenshot of comment, proof link"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                            required
                        />
                    </div>

                    {/* Task Image File */}
                    <div>
                        <label htmlFor="task_image_file" className=" text-gray-300 text-sm font-medium mb-2 flex items-center">
                            <Image className="h-4 w-4 mr-2 text-pink-400" />
                            Task Image *
                        </label>

                        <label className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus-within:ring-2 focus-within:ring-blue-500 transition-all cursor-pointer flex items-center justify-between shadow-inner">
                            <span className="text-gray-400 text-sm truncate">
                                Choose an image file
                            </span>
                            <input
                                type="file"
                                name="task_image_file"
                                accept="image/*"
                                className='sr-only'
                                required
                            />
                            <span className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                                Browse
                            </span>
                        </label>

                    </div>

                    {/* Add Task Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }} // Darker blue on hover
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <Upload className="h-5 w-5" />
                        <span>Add Task</span>
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddTask;