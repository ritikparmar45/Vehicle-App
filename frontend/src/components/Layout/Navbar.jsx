import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogOut, Settings, Calendar, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'mechanic':
        return '/mechanic';
      default:
        return '/dashboard';
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 outline-none group cursor-pointer lg:pr-8">
            <div className="bg-brand-600 p-2 rounded-lg text-white group-hover:bg-brand-700 transition-colors">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
              AutoCare
            </span>
          </Link>

          {/* Center Links (Guests) */}
          {!user && (
            <div className="hidden md:flex flex-grow items-center space-x-8 lg:space-x-12 px-6">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side (Auth) */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors"
                >
                  {user.role === 'admin' ? (
                    <Settings className="h-4 w-4" />
                  ) : user.role === 'mechanic' ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                  <span>Dashboard</span>
                </Link>

                <div className="h-5 w-px bg-slate-300 mx-2"></div>

                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all font-medium text-sm text-slate-700">
                    <User className="h-4 w-4 text-brand-600" />
                    <span>{user.name}</span>
                  </button>

                  <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 shadow-lg rounded-lg py-1 hidden group-hover:block transition-all">
                    <div className="px-4 py-2 border-b border-slate-100">
                       <span className="text-xs font-semibold text-slate-500 uppercase">Role: {user.role}</span>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600">
                      <User className="h-4 w-4 mr-2" /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none text-left">
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-brand-600 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                  Book Appointment
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-500 hover:text-slate-800 p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 absolute top-full left-0 w-full shadow-lg">
           <div className="px-4 py-3 space-y-2">
             {!user ? (
               <>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-brand-600 px-3 py-2 rounded-md font-medium">Home</Link>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-brand-600 px-3 py-2 rounded-md font-medium">About</Link>
                  <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-brand-600 px-3 py-2 rounded-md font-medium">Services</Link>
                  <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-slate-700 bg-slate-50 border border-slate-200 rounded-lg py-2 font-medium">Sign In</Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center text-white bg-brand-600 hover:bg-brand-700 rounded-lg py-2 font-medium">Book Appointment</Link>
                  </div>
               </>
             ) : (
                <>
                  <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="flex items-center text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-md font-medium"><Settings className="w-5 h-5 mr-3 text-brand-600" /> Dashboard</Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-md font-medium"><User className="w-5 h-5 mr-3 text-brand-600" /> Profile</Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full flex items-center text-red-600 hover:bg-red-50 px-3 py-2 rounded-md font-medium text-left"><LogOut className="w-5 h-5 mr-3" /> Sign Out</button>
                </>
             )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
