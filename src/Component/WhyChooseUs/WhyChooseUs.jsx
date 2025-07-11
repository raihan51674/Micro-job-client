// src/components/WhyChooseUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaUserTie, FaShieldAlt, FaRocket, FaHandsHelping, FaLightbulb } from 'react-icons/fa'; // Relevant and appealing icons

// Framer Motion Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const featureCardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 0.5,
    },
  },
  hover: {
    y: -10,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const WhyChooseUs = () => {
  // These advantages are tailored to a micro-task platform for both workers and buyers
  const advantages = [
    {
      id: 1,
      icon: FaDollarSign,
      title: "Earn & Save Efficiently",
      description: "Workers earn competitive rewards for micro-tasks. Buyers save significantly compared to traditional hiring.",
    },
    {
      id: 2,
      icon: FaUserTie,
      title: "Access Diverse Talent",
      description: "Buyers find skilled professionals for any task, while Workers discover a wide range of earning opportunities.",
    },
    {
      id: 3,
      icon: FaShieldAlt,
      title: "Secure & Transparent",
      description: "Our platform ensures secure transactions and transparent processes for both task completion and payments.",
    },
    {
      id: 4,
      icon: FaRocket,
      title: "Fast & Flexible",
      description: "Quick task turnaround times for Buyers, and flexible work schedules for Workers. Get things done faster.",
    },
    {
      id: 5,
      icon: FaHandsHelping,
      title: "Dedicated Support",
      description: "Benefit from responsive customer support ready to assist you with any questions or issues.",
    },
    {
      id: 6,
      icon: FaLightbulb,
      title: "Innovation at Core",
      description: "We're constantly enhancing features to provide you with the best micro-tasking and earning experience.",
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
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Our Commitments</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Why Choose <span className="text-blue-400">Our Platform</span>?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the compelling reasons why thousands of Workers and Buyers trust us to achieve their micro-task goals. We're built for your success.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.id}
              className="p-8 rounded-2xl shadow-xl h-full flex flex-col items-center text-center"
              variants={featureCardVariants}
              whileHover="hover"
              style={{
                background: 'rgba(255, 255, 255, 0.08)', // Light black glassy effect
                backdropFilter: 'blur(10px) brightness(1.2)',
                WebkitBackdropFilter: 'blur(10px) brightness(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center items-center">
                <advantage.icon className="text-5xl text-blue-400" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {advantage.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;