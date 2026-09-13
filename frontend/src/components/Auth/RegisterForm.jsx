import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, AlertCircle } from 'lucide-react'; //for icons
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false); //false hides the password ,true shows it
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);//false hides the password ,true shows it
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //stops the page from refreshing
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData; //it remove the confirmPassword field from the userData object
      await register(userData);// Call the register function from AuthContext
      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-accent-primary/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-lg w-full relative z-10 animate-fade-in">
        <div className="glass-dark rounded-[2.5rem] border border-white/10 p-10 sm:p-12 shadow-2xl backdrop-blur-2xl space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary mb-2">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-heading font-black text-white tracking-tight">Create Account</h2>
            <p className="text-slate-400 text-sm font-medium">Join AutoCare Precision Labs today</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center space-x-3 animate-slide-up">
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
              <span className="text-rose-300 text-xs font-semibold">{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-12"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-12"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field pl-12"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-12 pr-12"
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-12 pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl shadow-xl shadow-accent-primary/20 mt-4"
            >
              {loading ? 'Creating Account...' : 'Initialize Registration'}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs font-medium text-slate-400">
                Already registered?{' '}
                <Link to="/login" className="font-bold text-accent-primary hover:underline transition-all">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;