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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-slate-900/50 rounded-[2.5rem] border border-white/5 p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h2 className="text-4xl font-heading font-black text-white mb-3">Welcome Back</h2>
            <p className="text-slate-400 font-medium">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                   <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-14"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                   <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-14 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-5"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <p className="text-xs font-medium text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-black text-accent-primary hover:text-accent-secondary transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Demo Accounts</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>Admin: admin@autocare.com / admin123</p>
              <p>User: user@autocare.com / user123</p>
              <p>Mechanic: mechanic@autocare.com / mechanic123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;