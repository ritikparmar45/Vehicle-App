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
    { label: 'Intelligence', path: '/' },
    { label: 'Protocol', path: '/about' },
    { label: 'Catalog', path: '/services' },
    { label: 'Interface', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative flex justify-between items-center h-20 px-8 rounded-[2rem] transition-all duration-700 ${isScrolled ? 'glass-dark border-white/5 shadow-2xl' : 'bg-transparent'}`}>
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group outline-none">
            <div className="relative w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl">
              <div className="absolute inset-0 bg-accent-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Zap className="h-6 w-6 text-accent-primary animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-heading font-black tracking-tighter leading-none transition-colors duration-500 ${isScrolled || !isHome ? 'text-white' : 'text-slate-900'}`}>
                AUTOCARE<span className="text-accent-primary">.</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 text-slate-400">Precision Labs</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {!user && navLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.path}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white/10 ${location.pathname === link.path ? 'text-accent-primary' : (isScrolled || !isHome ? 'text-slate-300' : 'text-slate-600')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Center */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <Link
                  to={getDashboardLink()}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 group ${isScrolled || !isHome ? 'glass border-white/5 text-white hover:bg-white/10' : 'bg-slate-900 text-white hover:bg-black shadow-xl'}`}
                >
                  <LayoutDashboard className="h-4 w-4 text-accent-primary group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
                </Link>

                <Link
                  to="/garage"
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 group ${isScrolled || !isHome ? 'glass border-white/5 text-white hover:bg-white/10' : 'bg-slate-50 text-slate-900 hover:bg-white shadow-xl'}`}
                >
                  <Car className="h-4 w-4 text-accent-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Garage</span>
                </Link>

                <div className="relative group">
                  <button className={`flex items-center gap-3 px-2 py-2 rounded-2xl transition-all duration-500 ${isScrolled || !isHome ? 'glass border-white/5' : 'bg-slate-50'}`}>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-accent-primary font-black text-xs shadow-inner">
                      {user.name[0].toUpperCase()}
                    </div>
                  </button>

                  <div className="absolute right-0 mt-4 w-64 glass-dark border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2rem] py-4 hidden group-hover:block animate-slide-up overflow-hidden z-[110]">
                    <div className="px-6 py-4 border-b border-white/5 mb-2 bg-white/5">
                       <p className="text-[8px] font-black text-accent-primary uppercase tracking-[0.2em] mb-1">Authenticated Operator</p>
                       <p className="text-sm font-black text-white truncate tracking-tight">{user.name}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                      <User className="h-4 w-4 mr-4 text-accent-primary" /> Profile Settings
                    </Link>
                    <Link to="/vault" className="flex items-center px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                      <ShieldCheck className="h-4 w-4 mr-4 text-accent-primary" /> Digital Vault
                    </Link>
                    <Link to="/garage" className="flex items-center px-6 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                      <Car className="h-4 w-4 mr-4 text-accent-primary" /> My Garage
                    </Link>
                    <div className="px-4 mt-2">
                      <button onClick={handleLogout} className="w-full flex items-center px-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-accent-error bg-accent-error/10 hover:bg-accent-error hover:text-white rounded-2xl transition-all">
                        <LogOut className="h-4 w-4 mr-4" /> Terminate Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isScrolled || !isHome ? 'text-white hover:text-accent-primary' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Authorize
                </Link>
                <Link
                  to="/register"
                  className="relative group px-8 py-3.5 rounded-xl bg-accent-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Initialize <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
