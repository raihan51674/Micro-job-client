import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLinkedin, 
  FaFacebook, 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaHeart
} from 'react-icons/fa';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const svgBackground = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/yourprofile',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/yourprofile',
      color: 'hover:text-gray-400'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com/yourprofile',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/yourprofile',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/yourprofile',
      color: 'hover:text-pink-500'
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com/yourchannel',
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Support', href: '/support' }
  ];

  const categories = [
    { name: 'Web Development', href: '/category/web-development' },
    { name: 'Mobile Apps', href: '/category/mobile-apps' },
    { name: 'Graphic Design', href: '/category/graphic-design' },
    { name: 'Digital Marketing', href: '/category/digital-marketing' },
    { name: 'Content Writing', href: '/category/content-writing' },
    { name: 'Data Entry', href: '/category/data-entry' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
        <div className={`absolute top-0 left-0 w-full h-full bg-[url('${svgBackground}')]`}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info & Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              {/* Logo */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-3 shadow-lg">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    MicroJobs
                  </h2>
                  <p className="text-sm text-purple-300 font-medium">Professional Services</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Connect with skilled professionals and find the perfect micro jobs for your projects. 
                Building bridges between talent and opportunity.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">contact@microjobs.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Popular Categories</h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={category.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Connect With Us</h3>
              
              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-white/30`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>

              
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-gray-300 text-sm"
              >
                <span>© 2024 MicroJobs. Made with</span>
                <FaHeart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>by our team</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex space-x-6 text-sm"
              >
                <a href="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
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