import React, { useContext, useEffect, useState } from 'react';
import { Menu, X, Code, LogIn, UserPlus, Briefcase, LayoutDashboard, Wallet, UserCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router'; // Ensure this is react-router-dom for web apps
import { AuthContext } from '../Provider/AuthProvider'; // Make sure this path is correct
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This availableCoin should ideally come from your user context or fetched data, not a fixed state here.
  const [availableCoin, setAvailableCoin] = useState(0);

  const { logOut, user } = useContext(AuthContext); // Get user and logOut from AuthContext

  useEffect(() => {
    const fetchCoinData = async () => {
      if (user?.email) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/my-coins?email=${user.email}`)
        setAvailableCoin(data)
      }
    }
    fetchCoinData()

  }, [user])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logOut();
    toggleMenu();
  };

  return (
    <nav className="bg-black bg-opacity-40 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand - Always visible */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-3 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  MicroJobs
                </h1>
                <p className="text-sm text-purple-300 font-medium">Professional Services</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4"> {/* Increased space-x for better separation */}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="group relative px-4 py-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-white/20 hover:border-white/30"
                  >
                    <span className="relative z-10 flex items-center space-x-2 font-medium">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </span>
                  </Link>

                  {/* Available Coin Display */}
                  <div className="flex items-center px-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20">
                    <Wallet className="h-4 w-4 mr-2 text-green-400" />
                    <span className="font-medium">Coins: {availableCoin.toFixed(2)}</span>
                  </div>

                  {/* User Profile and Logout Button */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-white/20 hover:border-white/30">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                          className="h-8 w-8 rounded-full object-cover border-2 border-purple-400"
                        />
                      ) : (
                        <UserCircle className="h-8 w-8 text-purple-400" />
                      )}
                      <span className="font-medium">{user.displayName || "User"}</span>
                    </button>
                    {/* Dropdown for Profile and Logout */}
                    <div className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-md rounded-lg shadow-xl py-1 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 origin-top-right">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-150"
                      >
                        <UserCircle className="h-5 w-5 mr-3" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors duration-150 rounded-b-lg"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>

                  {/* Join as Developer Button */}
                  <a
                    href="https://github.com/mdtanvirislamrakib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-400/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Join as Developer</span>
                    </span>
                  </a>
                </>
              ) : (
                <>
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

                  <a
                    href="https://github.com/your-client-repo" // Replace with actual GitHub repo URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-400/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Join as Developer</span>
                    </span>
                  </a>
                </>
              )}
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
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
        <div className="px-4 pt-4 pb-6 space-y-3 bg-black/50 backdrop-blur-md border-t border-white/10">
          {user ? (
            <>
              {/* Profile Info in Mobile */}
              <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover border-2 border-purple-400"
                  />
                ) : (
                  <UserCircle className="h-10 w-10 text-purple-400" />
                )}
                <div className="flex flex-col">
                  <span className="font-bold text-white">{user.displayName || "User"}</span>
                  <span className="text-sm text-purple-300">{user.email}</span>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={toggleMenu} // Close menu on navigation
                className="group flex items-center w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </Link>

              <div className="flex items-center w-full px-4 py-3 rounded-xl text-white/90 bg-white/5 border border-white/10">
                <Wallet className="h-5 w-5 mr-3 text-green-400" />
                <span className="font-medium">Coins: {availableCoin.toFixed(2)}</span>
              </div>

              <Link
                to="/profile"
                onClick={toggleMenu} // Close menu on navigation
                className="group flex items-center w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
              >
                <UserCircle className="h-5 w-5 mr-3" />
                <span className="font-medium">Profile</span>
              </Link>

              <button
                onClick={() => { handleLogout(); toggleMenu(); }} // Close menu and logout
                className="group flex items-center w-full px-4 py-3 rounded-xl bg-red-600/80 text-white font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>

              <a
                href="https://github.com/mdtanvirislamrakib"
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleMenu} // Close menu on navigation
                className="group flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg"
              >
                <Code className="h-5 w-5 mr-3" />
                <span>Join as Developer</span>
              </a>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu} // Close menu on navigation
                className="group flex items-center w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
              >
                <LogIn className="h-5 w-5 mr-3" />
                <span className="font-medium">Login</span>
              </Link>

              <Link
                to="/register"
                onClick={toggleMenu} // Close menu on navigation
                className="group flex items-center w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
              >
                <UserPlus className="h-5 w-5 mr-3" />
                <span className="font-medium">Register</span>
              </Link>

              <a
                href="https://github.com/your-client-repo" // Replace with actual GitHub repo URL
                target="_blank"
                rel="noopener noreferrer"
                onClick={toggleMenu} // Close menu on navigation
                className="group flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg"
              >
                <Code className="h-5 w-5 mr-3" />
                <span>Join as Developer</span>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;