import React from 'react';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/Lottie/errorLottie.json';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-800/30 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-gray-700/50 p-6 sm:p-8 lg:p-10 text-center">
        {/* Lottie Animation - Responsive sizing */}
        <div className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] mx-auto mb-6 sm:mb-8">
          <Lottie 
            animationData={errorAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>

        {/* Error Message */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-3 sm:mb-4 py-4">
            Page Not Found
          </h1>
          <p className="text-gray-300 text-base sm:text-lg ">
            The page you're looking for doesn't exist or an error occurred.
          </p>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            Error code: 404
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium tracking-tighter text-white bg-blue-600 hover:bg-blue-700 rounded-lg group transition-all duration-300 ease-out overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Return Home
            </span>
          </Link>
          
          <button 
            onClick={() => window.location.reload()}
            className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium tracking-tighter text-white bg-gray-700 hover:bg-gray-600 rounded-lg group transition-all duration-300 ease-out overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Page
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;