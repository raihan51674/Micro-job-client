import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaRegLightbulb, FaClipboardList, FaCheckSquare, FaWallet, FaHandshake } from 'react-icons/fa'; // Icons specific to client/worker actions

// Framer Motion Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card's animation
      delayChildren: 0.2,    // Delay before the first card starts
      duration: 0.8,         // Total duration for the container's fade-in
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 }, // Cards start lower and invisible
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.5, // Lighter mass for quicker bounce
    },
  },
  hover: {
    y: -10, // Lift slightly on hover
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)', // Enhanced shadow
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: FaUserPlus,
      title: "Register Your Role",
      description: "Sign up as a Worker to earn rewards or a Buyer to manage tasks. It's quick and easy to join!", // Based on registration options [cite: 63, 70]
      role: "Both"
    },
    {
      id: 2,
      icon: FaRegLightbulb, // Icon for idea/task creation
      title: "Create Your Task",
      description: "Buyers, clearly define your micro-task requirements, budget, and deadline to attract the best Workers.", // Based on Buyer creating tasks [cite: 28, 108]
      role: "Buyer"
    },
    {
      id: 3,
      icon: FaClipboardList, // Icon for viewing/selecting tasks
      title: "Browse & Select Tasks",
      description: "Workers, explore available tasks, apply for those matching your skills, and submit your proposal.", // Based on Worker viewing tasks [cite: 27, 162]
      role: "Worker"
    },
    {
      id: 4,
      icon: FaCheckSquare, // Icon for task submission
      title: "Submit Your Work",
      description: "Workers deliver completed tasks. Buyers review submissions to ensure quality and satisfaction.", // Based on Worker submitting [cite: 27, 173] and Buyer reviewing [cite: 28, 93]
      role: "Both"
    },
    {
      id: 5,
      icon: FaHandshake, // Icon for approval/payment process
      title: "Approve & Pay",
      description: "Buyers approve successful submissions, and payment is processed seamlessly to the Workers.", // Based on Buyer approving [cite: 28, 102]
      role: "Buyer"
    },
    {
      id: 6,
      icon: FaWallet, // Icon for withdrawal
      title: "Withdraw Your Earnings",
      description: "Workers can easily withdraw their earned coins once they reach the minimum threshold. Your money, your way!", // Based on Worker withdrawing coins 
      role: "Worker"
    },
  ];

  return (
    <section
      className="py-16 md:py-24 text-gray-100"
      style={{
        background: 'radial-gradient(circle at center, #0d1117, #0d1117 80%, #1a202c)',
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Simple Steps</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our platform simplifies the process of connecting talent with tasks. Follow these easy steps to get started, whether you're hiring or freelancing.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="p-8 rounded-2xl shadow-xl h-full flex flex-col justify-between"
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: 'rgba(255, 255, 255, 0.08)', // Light black glassy effect
                backdropFilter: 'blur(10px) brightness(1.2)',
                WebkitBackdropFilter: 'blur(10px) brightness(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div>
                {/* Icon */}
                <div className="mb-6 flex justify-center items-center">
                  <step.icon className="text-5xl text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 text-center">
                  {step.id}. {step.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-300 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Role Indicator */}
              <div className="mt-6 text-center">
                <span className="inline-block bg-blue-700 bg-opacity-30 text-blue-200 text-sm font-medium px-4 py-1 rounded-full border border-blue-500 border-opacity-30">
                  For {step.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;