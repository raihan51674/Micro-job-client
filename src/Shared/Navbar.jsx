import React, { useState } from 'react';
import { Menu, X, Code, LogIn, UserPlus, Briefcase, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-3 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  MicroJobs
                </h1>
                <p className="text-sm text-purple-300 font-medium">Professional Services</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <Link 
                to="/login"
                className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-white/20 hover:border-white/30"
              >
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2 font-medium">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </span>
              </Link>
              
              <Link 
                to="/register"
                className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-white/20 hover:border-white/30"
              >
                <span className="relative z-10 flex items-center space-x-2 font-medium">
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </span>
              </Link>
              
              <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-400/30">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span>Join as Developer</span>
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200 border border-white/20"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="px-4 pt-4 pb-6 space-y-3 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-lg border-t border-white/10">
          <Link 
            to="/login"
            className="group flex items-center w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
          >
            <LogIn className="h-5 w-5 mr-3" />
            <span className="font-medium">Login</span>
          </Link>
          
          <Link 
            to="/register"
            className="group flex items-center w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
          >
            <UserPlus className="h-5 w-5 mr-3" />
            <span className="font-medium">Register</span>
          </Link>
          
          <button className="group flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg">
            <Code className="h-5 w-5 mr-3" />
            <span>Join as Developer</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;