import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  User, 
  LogOut, 
  Settings, 
  Calendar, 
  Users, 
  Menu, 
  X, 
  ChevronRight,
  Zap,
  LayoutDashboard,
  ShieldCheck,
  Bell
} from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative flex justify-between items-center h-20 px-8 rounded-3xl transition-all duration-700 ${isScrolled ? 'glass-dark border-white/10 shadow-2xl backdrop-blur-2xl' : 'bg-transparent'}`}>
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3.5 group outline-none">
            <div className="relative w-11 h-11 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-accent-primary/50 shadow-xl">
              <div className="absolute inset-0 bg-accent-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Zap className="h-5 w-5 text-accent-primary animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-black tracking-tighter leading-none text-white">
                AUTOCARE<span className="text-accent-primary">.</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-slate-400">Precision Auto Labs</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {!user && navLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.path}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Center */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl glass border-white/10 text-white hover:border-accent-primary/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <LayoutDashboard className="h-4 w-4 text-accent-primary group-hover:rotate-12 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
                </Link>

                <Link
                  to="/garage"
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl glass border-white/10 text-white hover:border-accent-primary/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <Car className="h-4 w-4 text-accent-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Garage</span>
                </Link>

                <div className="relative group">
                  <button className="flex items-center gap-3 p-1.5 rounded-2xl glass border-white/10 hover:border-accent-primary/40 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-primary to-orange-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                      {user.name[0].toUpperCase()}
                    </div>
                  </button>

                  <div className="absolute right-0 mt-3 w-64 glass-dark border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] rounded-2xl py-3 hidden group-hover:block animate-slide-up overflow-hidden z-[110]">
                    <div className="px-5 py-3 border-b border-white/5 mb-1 bg-white/5">
                       <p className="text-[9px] font-black text-accent-primary uppercase tracking-[0.2em] mb-0.5">Logged In User</p>
                       <p className="text-sm font-bold text-white truncate tracking-tight">{user.name}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                      <User className="h-4 w-4 mr-3 text-accent-primary" /> Profile Settings
                    </Link>
                    <Link to="/vault" className="flex items-center px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                      <ShieldCheck className="h-4 w-4 mr-3 text-accent-primary" /> Digital Vault
                    </Link>
                    <Link to="/garage" className="flex items-center px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-300 hover:bg-white/5 hover:text-white transition-all">
                      <Car className="h-4 w-4 mr-3 text-accent-primary" /> My Garage
                    </Link>
                    <div className="px-3 mt-2">
                      <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-xl transition-all">
                        <LogOut className="h-4 w-4 mr-2" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="relative group px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-orange-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40 transition-all active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book Service <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Access Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isScrolled || !isHome ? 'glass border-white/5 text-white' : 'bg-slate-900 text-white shadow-xl'}`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Interface Overlay */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen glass-dark transition-all duration-700 z-[-1] ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col items-center justify-center h-full px-12 space-y-8">
           {navLinks.map((link, idx) => (
             <Link 
              key={link.label} 
              to={link.path} 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-4xl font-heading font-black text-white hover:text-accent-primary transition-all tracking-tighter animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
             >
               {link.label}
             </Link>
           ))}
           <div className="w-12 h-px bg-white/10 my-8"></div>
           {!user ? (
             <div className="flex flex-col w-full gap-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-5 rounded-2xl glass border-white/10 text-white font-black uppercase tracking-widest text-xs">Sign In</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-5 rounded-2xl bg-accent-primary text-white font-black uppercase tracking-widest text-xs shadow-2xl">Book Now</Link>
             </div>
           ) : (
             <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-center py-5 rounded-2xl bg-accent-error/20 text-accent-error border border-accent-error/30 font-black uppercase tracking-widest text-xs">Terminate Session</button>
           )}
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
