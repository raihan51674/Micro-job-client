

import { Pencil, Trash2, X, Info } from "lucide-react";
import { useLoaderData } from "react-router";

// Mock data to simulate tasks added by the user





// Main MyTasks Component
const MyTasks = () => {

    const initialTasks = useLoaderData()

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    // Helper function to truncate text to a specified word limit
    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };






    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
            

            <div className="max-w-7xl mx-auto">
                <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-4 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-6 md:mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                            My Tasks Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base">Manage and track your tasks efficiently</p>
                    </div>

                    {initialTasks.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-gray-700/30 rounded-xl p-8 max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No Tasks Yet</h3>
                                <p className="text-gray-400 mb-4">Start by adding your first task to get organized!</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                    Add New Task {/* This button is illustrative; no add task functionality included */}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Table View (visible on large screens and up) */}
                            <div className="hidden lg:block bg-gray-800/40 rounded-xl border border-gray-700/50 overflow-hidden shadow-xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[700px] sm:min-w-[600px] md:min-w-[700px] lg:min-w-[800px]">
                                        {/* Table Header */}
                                        <thead className="bg-gradient-to-r from-gray-700 to-gray-800">
                                            <tr>
                                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Task
                                                </th>
                                                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Workers
                                                </th>
                                                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Payment
                                                </th>
                                                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Due Date
                                                </th>
                                                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        {/* Table Body */}
                                        <tbody className="divide-y divide-gray-700/50">
                                            {initialTasks.map((task, index) => (
                                                <tr
                                                    key={task._id}
                                                    className={`hover:bg-gray-700/30 transition-all duration-200 ${
                                                        index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/40"
                                                    }`}
                                                >
                                                    {/* Task Column */}
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    src={task?.image || "/placeholder.svg"}
                                                                    alt={task.task_title}
                                                                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover border-2 border-gray-600"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center">
                                                                    <p className="text-sm font-semibold text-white truncate max-w-[200px]">
                                                                        {truncateText(task?.taskTitle, 8)}
                                                                    </p>
                                                                    {task?.taskTitle.split(' ').length > 8 && (
                                                                        <span className="relative group ml-1 flex-shrink-0">
                                                                            <Info className="h-3 w-3 text-gray-400 cursor-help" />
                                                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 text-xs text-white bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                                                {task?.taskTitle}
                                                                            </span>
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-400">ID: {task._id}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Workers Column */}
                                                    <td className="px-4 py-4 text-center">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/50">
                                                            {task?.requiredWorkers}
                                                        </span>
                                                    </td>

                                                    {/* Payment Column */}
                                                    <td className="px-4 py-4 text-center">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-900/50 text-green-300 border border-green-700/50">
                                                            ${Number.parseFloat(task?.payableAmount).toFixed(2)}
                                                        </span>
                                                    </td>

                                                    {/* Date Column */}
                                                    <td className="px-4 py-4 text-center">
                                                        <div className="text-sm text-gray-300 font-medium">{formatDate(task.completationDate)}</div>
                                                    </td>

                                                    {/* Actions Column */}
                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-center items-center space-x-2">
                                                            <button
                                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all duration-200 group"
                                                                title="Edit Task"
                                                            >
                                                                <Pencil className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                            </button>
                                                            <button
                                                                
                                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 group"
                                                                title="Delete Task"
                                                            >
                                                                <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Card View (visible on medium screens and below) */}
                            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {initialTasks.map((task) => (
                                    <div key={task?._id} className="bg-gray-800/40 border border-gray-700/50 rounded-xl shadow-lg p-4 sm:p-5 flex flex-col justify-between hover:bg-gray-700/30 transition-colors duration-200">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <img
                                                src={task?.image || ""}
                                                alt={task?.taskTitle}
                                                className="w-16 h-16 rounded-xl object-cover border-2 border-gray-600 flex-shrink-0"
                                            />
                                            <div className="flex-grow min-w-0">
                                                <h3 className="text-lg font-bold text-white mb-1 truncate">
                                                    {task?.taskTitle}
                                                </h3>
                                                <p className="text-sm text-gray-400">Task ID: {task.id}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                                            <div>
                                                <p className="text-gray-400">Workers Needed:</p>
                                                <span className="font-semibold text-blue-300">
                                                    {task?.requiredWorkers}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Payment:</p>
                                                <span className="font-bold text-green-300">
                                                    ${Number.parseFloat(task?.payableAmount).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="col-span-2"> {/* Takes full width on mobile */}
                                                <p className="text-gray-400">Due Date:</p>
                                                <span className="font-semibold text-gray-300">
                                                    {formatDate(task?.completationDate)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-2 border-t border-gray-700/50 pt-4">
                                            <button
                                                className="flex-1 px-4 py-2 text-blue-400 bg-blue-900/30 hover:bg-blue-900/50 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                                                title="Edit Task"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="hidden sm:inline">Update</span>
                                            </button>
                                            <button
                                                className="flex-1 px-4 py-2 text-red-400 bg-red-900/30 hover:bg-red-900/50 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                                                title="Delete Task"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="hidden sm:inline">Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Stats */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-400">
                                    Displaying <span className="font-semibold text-white">{initialTasks.length}</span> task
                                    {initialTasks.length !== 1 ? "s" : ""} • Last updated: {new Date().toLocaleDateString()}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>


        </div>
    );
}
export default MyTasks;