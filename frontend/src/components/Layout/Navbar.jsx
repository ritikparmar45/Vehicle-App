import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, User, LogOut, Settings, Calendar, Users, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${(isScrolled || !isHome) ? 'glass shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 outline-none group cursor-pointer lg:pr-8">
            <div className="bg-brand-600 p-2.5 rounded-xl text-white group-hover:bg-brand-700 transition-colors shadow-sm">
              <Car className="h-5 w-5" />
            </div>
            <span className="text-xl font-heading font-bold text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">
              AutoCare
            </span>
          </Link>

          {/* Center Links */}
          {!user && (
            <div className="hidden md:flex flex-grow justify-center items-center space-x-1 lg:space-x-4 px-6">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-600 hover:text-brand-600 px-4 py-2 rounded-full hover:bg-slate-50 transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side (Auth) */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 px-4 py-2 rounded-full transition-all"
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

                <div className="h-6 w-px bg-slate-200 mx-2"></div>

                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-brand-200 hover:shadow-sm transition-all font-medium text-sm text-slate-700">
                    <div className="cursor-pointer bg-brand-50 p-1.5 rounded-full text-brand-600">
                       <User className="h-3.5 w-3.5" />
                    </div>
                    <span>{user.name}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 hidden group-hover:block transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <div className="px-5 py-3 border-b border-slate-50 mb-1 bg-slate-50/50">
                       <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Signed in as</p>
                       <p className="text-sm font-medium text-slate-900 truncate mt-0.5">{user.email || user.role}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors mx-1 rounded-lg">
                      <User className="h-4 w-4 mr-3 text-slate-400" /> My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-[calc(100%-8px)] mx-1 mt-1 flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 focus:outline-none text-left rounded-lg transition-colors">
                      <LogOut className="h-4 w-4 mr-3 text-red-400" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-brand-600 px-5 py-2.5 text-sm font-medium transition-colors rounded-full hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book Service <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-brand-600 p-2 bg-slate-50 rounded-full focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl transition-all duration-300 origin-top overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}`}>
         <div className="px-6 py-6 space-y-3">
           {!user ? (
             <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-brand-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-colors">Home</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-brand-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-colors">About</Link>
                <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-brand-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-colors">Services</Link>
                <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col space-y-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center text-slate-700 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl py-3 font-medium transition-colors">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center text-white bg-brand-600 hover:bg-brand-700 rounded-xl py-3 font-medium shadow-md shadow-brand-500/20 transition-colors">Book Appointment</Link>
                </div>
             </>
           ) : (
              <>
                <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="flex items-center text-slate-700 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-colors"><Settings className="w-5 h-5 mr-3 text-brand-500" /> Dashboard</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-slate-700 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition-colors"><User className="w-5 h-5 mr-3 text-brand-500" /> Profile</Link>
                <div className="pt-4 border-t border-slate-100">
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full flex items-center text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl font-medium text-left transition-colors"><LogOut className="w-5 h-5 mr-3 text-red-500" /> Sign Out</button>
                </div>
              </>
           )}
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
