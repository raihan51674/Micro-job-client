// src/components/Footer.jsx
"use client"; // Necessary for Next.js 13+ App Router to make this a client component

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLinkedin,
  FaFacebook,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa';
import { Briefcase } from 'lucide-react'; // Only Briefcase for the logo

const Footer = () => {

  // Social media links - REMEMBER TO REPLACE `yourprofile` WITH ACTUAL URLs
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/yourprofile', // REPLACE THIS
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/mdtanvirislamrakib',
      color: 'hover:text-gray-400'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://www.facebook.com/ra.k.ib.912236',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/tanvirislam_rakib/',
      color: 'hover:text-pink-500'
    },
  ];

  return (
    <footer
      className="pt-16 text-white relative overflow-hidden"
      // NEW GRADIENT COLOR for better distinction
      style={{
        background: 'linear-gradient(135deg, #0A0D11 0%, #151A22 50%, #0A0D11 100%)', // Deeper, more distinct linear gradient
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundSize: '150px 150px',
          filter: 'brightness(0.8) invert(100%)',
        }}
        aria-hidden="true"
      ></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ALIGNMENT FIXES: Use justify-center on small and justify-between on medium+ */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-12 text-center md:text-left">

            {/* Company Info & Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start max-w-sm"
            >
              {/* Logo */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 shadow-lg">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    MicroJobs
                  </h2>
                  <p className="text-sm text-purple-300 font-medium">Professional Micro-Tasks</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-center md:text-left">
                Connecting talent with opportunities, one micro-task at a time. Empowering flexible work and efficient project completion.
              </p>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start w-full md:w-auto" // ALIGNMENT FIX: items-start for social heading and icons on md+
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Connect With Us</h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-4"> {/* ALIGNMENT FIX: justify-start for icons on md+ */}
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-gray-300 text-xl
                                 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-xl
                                 border border-white/20 hover:border-white/30`}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      title={`Visit our ${social.name} page`}
                    >
                      <IconComponent />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar - Copyright and Policy Links */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} MicroJobs. All rights reserved.
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex space-x-6"
              >
                <a href="https://www.microworkers.com/privacy.php" target='_blank' className="hover:text-blue-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="https://www.microworkers.com/terms.php" target='_blank' className="hover:text-blue-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="https://www.mjob.work/cookie-policy/" target='_blank' className="hover:text-blue-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;