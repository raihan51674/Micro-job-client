// src/components/FAQ.jsx
"use client"; // Necessary for Next.js 13+ App Router to make this a client component

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Icons for accordion toggle

// Framer Motion Variants for staggered entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each FAQ item's animation
      delayChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
    },
  },
};

// Variants for expanding/collapsing content - REFINED ANIMATION
const contentVariants = {
  hidden: { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }, // Start with no padding for smooth height collapse
  visible: {
    opacity: 1,
    height: "auto",
    paddingTop: '1rem', // pt-4
    paddingBottom: '1.5rem', // pb-6
    transition: {
      opacity: { duration: 0.2, ease: "easeOut" },
      height: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 0.4, // Increased duration slightly for more perceived smoothness
      },
      paddingTop: { duration: 0.2, ease: "easeOut" },
      paddingBottom: { duration: 0.2, ease: "easeOut" },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      opacity: { duration: 0.2, ease: "easeIn" },
      height: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 0.3, // Slightly shorter exit duration for snappiness
      },
      paddingTop: { duration: 0.2, ease: "easeOut" },
      paddingBottom: { duration: 0.2, ease: "easeOut" },
    },
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to manage which FAQ item is open

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data based on your project requirements PDF - REFINED TEXT FOR CLARITY AND RELEVANCE
  const faqs = [
    {
      id: 1,
      question: "How do I register and what are the initial benefits?",
      answer: "Upon registration, you'll choose your role: **Worker** or **Buyer**. Workers receive an initial 10 coins, while Buyers receive 50 coins. These coins are provided only at the point of initial signup. You can sign up using your name, email, profile picture URL, and password."
    },
    {
      id: 2,
      question: "What login options are available on the platform?",
      answer: "You can securely sign in using your registered email and password. For added convenience, we also offer a seamless Google Sign-In option."
    },
    {
      id: 3,
      question: "How can Buyers create new tasks on the platform?",
      answer: "Buyers can create tasks by filling out a comprehensive form. This includes providing a task title, detailed description, the required number of workers, the payable amount per worker, a completion date, specific submission proof requirements, and an optional task image URL. The total cost is automatically calculated as `required_workers * payable_amount`."
    },
    {
      id: 4,
      question: "What happens if a Buyer has insufficient coins for a task?",
      answer: "If the total calculated payable amount for a task exceeds your current coin balance, an alert stating 'Not available Coin. Purchase Coin' will appear. You will then be redirected to the dedicated Coin Purchase Page to top up your balance."
    },
    {
      id: 5,
      question: "How do Workers earn and withdraw their rewards?",
      answer: "Workers earn coins by successfully completing tasks. You can initiate a withdrawal once your coin balance reaches a minimum of 200 coins. This amount is equivalent to 10 US dollars, based on our conversion rate of 20 coins = 1 dollar."
    },
    {
      id: 6,
      question: "Does the platform include a notification system?",
      answer: "Yes, our platform features an integrated notification system. Workers receive real-time notifications for status updates on their submissions (e.g., approval or rejection by a Buyer) and when their withdrawal requests are processed by an Admin. Buyers receive notifications when Workers submit tasks. Notifications appear as floating pop-ups and can be dismissed by clicking anywhere on the page."
    },
    {
      id: 7,
      question: "What are the responsiveness requirements for the platform?",
      answer: "The entire platform, including all public pages and the user dashboard, is designed to be fully responsive. This ensures an optimal user experience across all devices, including mobile phones, tablets, and desktop computers."
    },
    {
      id: 8,
      question: "Is there an image uploading system integrated?",
      answer: "Yes, an image uploading system is implemented using imageBB. This feature is available both during user registration (for profile pictures) and when Buyers are adding new tasks (for task images)."
    },
  ];

  return (
    <section
      className="py-16 md:py-24 text-gray-100"
      style={{
        background: 'radial-gradient(circle at center, #0d1117, #0d1117 80%, #1a202c)',
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Support</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Find quick answers to the most common questions about using our Micro-Task and Earning Platform.
          </p>
        </motion.div>

        {/* FAQ Accordion Grid */}
        <motion.div
          className="space-y-6" // Space between accordion items
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                background: 'rgba(255, 255, 255, 0.08)', // Light black glassy effect
                backdropFilter: 'blur(10px) brightness(1.2)',
                WebkitBackdropFilter: 'blur(10px) brightness(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question / Header */}
              <div
                className={`p-6 flex justify-between items-center ${activeIndex === index ? 'border-b border-gray-700' : ''}`}
              >
                <h3 className="text-xl font-semibold text-white pr-4">{faq.question}</h3>
                <span className="text-blue-400 text-2xl flex-shrink-0">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>

              {/* Answer Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden" // Ensure content doesn't overflow during animation
                  >
                    <p className="text-lg text-gray-300 leading-relaxed px-6 pb-6 pt-4"> {/* Apply padding here */}
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;