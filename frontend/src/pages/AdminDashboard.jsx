import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, 
  Settings, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Activity, 
  Calendar, 
  Filter, 
  Search,
  Clock,
  Package,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [bookingFilter, setBookingFilter] = useState({ customer: '', status: '' });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    vehicleType: '',
    price: '',
    duration: '',
    isActive: true,
  });
  const [alert, setAlert] = useState(null);
  const API_BASE = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE}/services`);
      setServices(Array.isArray(res.data.services) ? res.data.services : []);
    } catch {
      showAlert('Failed to fetch services', 'error');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/bookings`);
      setBookings(res.data.bookings || []);
    } catch {
      showAlert('Failed to fetch bookings', 'error');
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const handleBookingStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${API_BASE}/bookings/${bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchBookings();
      showAlert(`Booking status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Booking status update failed:', error);
      showAlert('Failed to update booking', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const isToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return today.toDateString() === date.toDateString();
  };

  const stats = [
    { label: 'Total Services', value: services.length, icon: <Package className="w-5 h-5" />, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Active Bookings', value: bookings.filter(b => b.status === 'pending' || b.status === 'approved').length, icon: <Activity className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Today\'s Work', value: bookings.filter(b => isToday(b.appointmentDate)).length, icon: <Calendar className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-brand-50 text-brand-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-extrabold text-slate-900 tracking-tight">Admin Console</h1>
          <p className="text-slate-500 mt-1 font-medium">Control center for services and customer bookings.</p>
        </div>
        
        {alert && (
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl shadow-lg border animate-slide-up ${
            alert.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
            : 'bg-rose-50 border-rose-100 text-rose-800'
          }`}>
            {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-semibold">{alert.message}</span>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow hover:card-shadow-hover transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-3xl font-heading font-extrabold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* Bookings Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-brand-600" />
                Manage Bookings
              </h2>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Customer name..."
                    value={bookingFilter.customer}
                    onChange={(e) => setBookingFilter({ ...bookingFilter, customer: e.target.value })}
                    className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none w-48 transition-all"
                  />
                </div>
                <div className="relative">
                  <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={bookingFilter.status}
                    onChange={(e) => setBookingFilter({ ...bookingFilter, status: e.target.value })}
                    className="pl-10 pr-8 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none appearance-none font-medium text-slate-600"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto -mx-8">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Service</th>
                    <th className="px-8 py-4">Schedule</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings
                    .filter((b) => {
                      const matchName = b.user?.name?.toLowerCase().includes(bookingFilter.customer.toLowerCase());
                      const matchStatus = bookingFilter.status ? b.status === bookingFilter.status : true;
                      return matchName && matchStatus;
                    })
                    .map((b) => (
                      <tr key={b._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                              {(b.user?.name || 'U')[0]}
                            </div>
                            <span className="font-bold text-slate-900">{b.user?.name || 'User not found'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-slate-600 font-medium">{b.service?.name || 'Service not found'}</td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{new Date(b.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                            <span className="text-xs text-slate-500">{b.appointmentTime}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                            b.status === 'approved' ? 'bg-indigo-50 text-indigo-600' :
                            b.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                            b.status === 'cancelled' ? 'bg-rose-50 text-rose-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {b.status !== 'approved' && b.status !== 'completed' && b.status !== 'cancelled' && (
                              <button
                                onClick={() => handleBookingStatusChange(b._id, 'approved')}
                                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {b.status !== 'completed' && b.status !== 'cancelled' && isToday(b.appointmentDate) && b.status === 'approved' && (
                              <button
                                onClick={() => handleBookingStatusChange(b._id, 'completed')}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                title="Complete"
                              >
                                <Activity className="w-4 h-4" />
                              </button>
                            )}
                            {b.status !== 'cancelled' && b.status !== 'completed' && (
                              <button
                                onClick={() => handleBookingStatusChange(b._id, 'cancelled')}
                                className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                title="Cancel"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="py-12 text-center text-slate-400 font-medium">No bookings found in this view.</div>
              )}
            </div>
          </div>
        </div>

        {/* Services & Form Section */}
        <div className="space-y-10">
          
          {/* Add Service Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 card-shadow-hover relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-10">
               <Package className="w-40 h-40" />
             </div>
             
             <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3 relative z-10">
               <Plus className="w-6 h-6 text-brand-400" />
               New Service
             </h2>

             <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await axios.post(`${API_BASE}/services`, formData);
                    fetchServices();
                    showAlert('Service added successfully!', 'success');
                    setFormData({ name: '', category: '', vehicleType: '', price: '', duration: '', isActive: true });
                  } catch (err) {
                    showAlert(err.response?.data?.message || 'Failed to add service', 'error');
                  }
                }}
                className="space-y-4 relative z-10"
              >
                  <input type="text" placeholder="Service Name" className="w-full bg-slate-800/50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 placeholder:text-slate-500 transition-all font-medium" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <div className="flex gap-3">
                    <input type="text" placeholder="Category" className="w-1/2 bg-slate-800/50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 placeholder:text-slate-500 transition-all font-medium" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                    <input type="text" placeholder="Type (Car/Bike)" className="w-1/2 bg-slate-800/50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 placeholder:text-slate-500 transition-all font-medium" value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} required />
                  </div>
                  <div className="flex gap-3">
                    <input type="number" placeholder="Price ₹" className="w-1/2 bg-slate-800/50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 placeholder:text-slate-500 transition-all font-medium" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                    <input type="number" placeholder="Mins" className="w-1/2 bg-slate-800/50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 placeholder:text-slate-500 transition-all font-medium" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Add to Catalog <ArrowRight className="w-4 h-4" />
                  </button>
             </form>
          </div>

          {/* Service List */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow">
             <h3 className="text-xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-brand-600" />
                Active Catalog
             </h3>
             
             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {services.map((s) => (
                  <div key={s._id} className="group flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-brand-50 transition-all border border-transparent hover:border-brand-100">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-700 transition-colors">{s.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">₹{s.price} • {s.duration} min • {s.vehicleType}</p>
                    </div>
                    <div className="flex gap-2">
                       <button
                          onClick={async () => {
                            const updated = { ...s, isActive: !s.isActive };
                            await axios.put(`${API_BASE}/services/${s._id}`, updated);
                            fetchServices();
                            showAlert(`Service ${updated.isActive ? 'activated' : 'deactivated'}`, 'success');
                          }}
                          className={`p-2 rounded-lg transition-all ${s.isActive ? 'bg-brand-100 text-brand-600 hover:bg-brand-600 hover:text-white' : 'bg-slate-200 text-slate-500 hover:bg-brand-600 hover:text-white'}`}
                       >
                         <Clock className="w-4 h-4" />
                       </button>
                       <button
                          onClick={async () => {
                            if (confirm(`Delete '${s.name}'?`)) {
                              await axios.delete(`${API_BASE}/services/${s._id}`);
                              fetchServices();
                              showAlert('Service deleted', 'success');
                            }
                          }}
                          className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
