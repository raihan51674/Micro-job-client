// src/Component/BestWorkers/BestWorkers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const BestWorkers = () => {
    const [topWorkers, setTopWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopWorkers = async () => {
            try {
                setLoading(true);
                
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/top-workers`);
                setTopWorkers(response.data);
            } catch (err) {
                console.error("Error fetching top workers:", err);
                setError("Failed to load top workers. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopWorkers();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <p>{error}</p>
            </div>
        );
    }

    if (topWorkers.length === 0) {
        return (
            <div className="text-center text-gray-400 p-4">
                <p>No top workers found at the moment.</p>
            </div>
        );
    }

    return (
        <section className="py-12 bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Our Top Workers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                    {topWorkers.map((worker) => (
                        <div
                            key={worker._id}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                                       flex flex-col items-center p-6 border border-gray-700 hover:border-blue-500"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mb-4 flex-shrink-0">
                                <img
                                    src={worker.image || "https://via.placeholder.com/150"} // Placeholder if image is missing
                                    alt={worker.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-2 truncate max-w-full">
                                {worker.name}
                            </h3>
                            <p className="text-blue-300 text-sm font-medium mb-4">Worker</p>
                            <div className="flex items-center text-yellow-400 font-bold text-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{worker.coin} Coins</span>
                            </div>
                            {/* You could add a button to view profile here */}
                            {/* <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                                View Profile
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestWorkers;