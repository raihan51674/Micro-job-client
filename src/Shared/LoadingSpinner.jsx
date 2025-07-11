// src/components/common/LoadingSpinner.jsx
"use client"; // If using Next.js App Router

import React from 'react';
import { HashLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';


const LoadingSpinner = ({
  isLoading = true,
  message = "Loading...",
  color = "#8B5CF6", // Defaulting to a vibrant purple/blue shade
  size = 60, // A bit larger for better visibility
  fullScreen = true,
  className = "",
}) => {
  if (!isLoading) {
    return null; // Don't render anything if not loading
  }

  const spinnerContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center p-8 rounded-lg shadow-2xl z-50`}
      // Apply subtle glassy effect to the spinner's direct container
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(15px) brightness(1.2)',
        WebkitBackdropFilter: 'blur(15px) brightness(1.2)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        minWidth: fullScreen ? '200px' : 'auto',
        minHeight: fullScreen ? '150px' : 'auto',
      }}
    >
      <HashLoader color={color} size={size} />
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6 text-lg font-medium text-white text-center"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <AnimatePresence>
        <motion.div
          key="full-screen-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[9999] ${className}`}
          // Base background for the full screen overlay
          style={{
            background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.95), rgba(26, 32, 44, 0.95))',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
          }}
        >
          {spinnerContent}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Inline spinner
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;