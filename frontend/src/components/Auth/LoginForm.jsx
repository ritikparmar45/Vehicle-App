import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });//this use to store the email and password at the time of login
  const [showPassword, setShowPassword] = useState(false);//it is false so user cant see the password by default
  const [error, setError] = useState('');//this use to store the error message if login fails
  const [loading, setLoading] = useState(false);//this use to show the loading state when the user clicks on login button

  const { login } = useAuth();//those login function we defined in AuthContext.jsx, we are using it here to login the user
  const navigate = useNavigate();//this use to redirect the user to another page after login

  const handleChange = (e) => {
    setFormData({
      ...formData, //keep the old values
      [e.target.name]: e.target.value //update the specific field(email or password)
    });
    setError('');
  };

  const handleSubmit = async (e) => { // e is the event object that is passed to the function when the form is submitted
    e.preventDefault();//this stop the default browser behavior of reloading the page on form submission
    setLoading(true);//this line sets the loading state to true when the user clicks on login button
    setError('');//this line resets the error message before attempting to login

    try {
      await login(formData.email, formData.password); //this line sends the data to backend from usestate

      navigate('/dashboard');//if login is successful, this line redirects to the dashboard
    } catch (err) {
      setError(err.message);//if login fails, this line sets the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-primary/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 animate-fade-in">
        <div className="glass-dark rounded-[2.5rem] border border-white/10 p-10 sm:p-12 shadow-2xl backdrop-blur-2xl space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 text-accent-primary mb-2">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-3xl font-heading font-black text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-sm font-medium">Access your vehicle service dashboard</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center space-x-3 animate-slide-up">
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
              <span className="text-rose-300 text-xs font-semibold">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl shadow-xl shadow-accent-primary/20"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs font-medium text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold text-accent-primary hover:underline transition-all">
                  Register here
                </Link>
              </p>
            </div>
          </form>

          <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available Demo Credentials</p>
            <div className="space-y-1 text-xs text-slate-300 font-mono">
              <p><span className="text-accent-primary">Admin:</span> admin@autocare.com / admin123</p>
              <p><span className="text-accent-primary">User:</span> user@autocare.com / user123</p>
              <p><span className="text-accent-primary">Mechanic:</span> mechanic@autocare.com / mechanic123</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;