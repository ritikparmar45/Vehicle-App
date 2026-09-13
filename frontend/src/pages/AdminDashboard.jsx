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
  ShieldAlert,
  Zap,
  TrendingUp,
  Command,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [bookingFilter, setBookingFilter] = useState({ customer: '', status: '' });
  const [alert, setAlert] = useState(null);
  
  const API_BASE = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE}/services`);
      setServices(Array.isArray(res.data.services) ? res.data.services : []);
    } catch {
      showAlert('Failed to synchronize service catalog', 'error');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/bookings`);
      setBookings(res.data.bookings || []);
    } catch {
      showAlert('Failed to synchronize booking queue', 'error');
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
      showAlert(`Status updated: Booking is now ${newStatus.toUpperCase()}`, 'success');
    } catch (error) {
      console.error('Booking status update failed:', error);
      showAlert('Failed to transmit status update', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const isToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return today.toDateString() === date.toDateString();
  };

  const stats = [
    { label: 'Catalog Size', value: services.length, icon: <Package className="w-5 h-5" />, color: 'text-accent-primary bg-accent-primary/10 border-accent-primary/20' },
    { label: 'Active Queue', value: bookings.filter(b => b.status === 'pending' || b.status === 'approved').length, icon: <Activity className="w-5 h-5" />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: "Today's Schedule", value: bookings.filter(b => isToday(b.appointmentDate)).length, icon: <Zap className="w-5 h-5" />, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Processed Units', value: bookings.filter(b => b.status === 'completed').length, icon: <TrendingUp className="w-5 h-5" />, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white py-16 pt-28 animate-fade-in relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Terminal Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-[0.25em]">
              <Command className="w-3.5 h-3.5" />
              <span>Root Control Console</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight leading-none">
              Operational Command Matrix
            </h1>
            <p className="text-slate-400 text-sm font-medium">Global management panel for appointments, queue validation, and service protocols.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {alert && (
              <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border text-xs font-black uppercase tracking-widest animate-slide-up ${
                alert.type === 'success' 
                ? 'glass-dark border-emerald-500/30 text-emerald-400' 
                : 'glass-dark border-rose-500/30 text-rose-400'
              }`}>
                {alert.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{alert.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-dark rounded-3xl p-6 border border-white/10 card-shadow-hover transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl border ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-heading font-black text-white mt-1 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings Queue Console */}
        <div className="glass-dark rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden space-y-6 p-6 sm:p-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div className="space-y-1">
              <h2 className="text-2xl font-heading font-black text-white tracking-tight">Active Reservations Queue</h2>
              <p className="text-slate-400 text-xs font-medium">Verify appointments, update status logs, or reassign resources.</p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter customer name..."
                  value={bookingFilter.customer}
                  onChange={(e) => setBookingFilter({ ...bookingFilter, customer: e.target.value })}
                  className="input-field pl-11 py-2.5 text-xs rounded-2xl"
                />
              </div>

              <select
                value={bookingFilter.status}
                onChange={(e) => setBookingFilter({ ...bookingFilter, status: e.target.value })}
                className="w-full sm:w-auto bg-slate-900 border border-white/10 rounded-2xl px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-300 outline-none focus:border-accent-primary"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Customer Identity</th>
                  <th className="px-6 py-4">Service & Asset</th>
                  <th className="px-6 py-4">Schedule Window</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Operational Directives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-medium">
                {bookings
                  .filter((b) => {
                    const matchName = b.user?.name?.toLowerCase().includes(bookingFilter.customer.toLowerCase());
                    const matchStatus = bookingFilter.status ? b.status === bookingFilter.status : true;
                    return matchName && matchStatus;
                  })
                  .map((b) => (
                    <tr key={b._id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-primary to-orange-600 flex items-center justify-center font-black text-white text-xs shadow-md">
                            {(b.user?.name || 'U')[0].toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-white tracking-tight">{b.user?.name || 'Customer'}</span>
                            <p className="text-xs text-slate-400">{b.user?.email || '—'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="space-y-0.5">
                          <p className="font-bold text-white">{b.service?.name || 'Service'}</p>
                          <p className="text-xs text-slate-400 uppercase font-mono">
                            {b.vehicleDetails?.make} {b.vehicleDetails?.model} • {b.vehicleDetails?.licensePlate}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="space-y-0.5">
                          <span className="text-white font-bold">{new Date(b.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-accent-primary" /> {b.appointmentTime}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className={`badge-status ${
                          b.status === 'pending' ? 'badge-pending' :
                          b.status === 'approved' ? 'badge-approved' :
                          b.status === 'in-progress' ? 'badge-in-progress' :
                          b.status === 'completed' ? 'badge-completed' : 'badge-cancelled'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                          {b.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleBookingStatusChange(b._id, 'approved')}
                              className="px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all border border-indigo-500/20"
                            >
                              Approve
                            </button>
                          )}
                          {(b.status === 'approved' || b.status === 'pending') && (
                            <button
                              onClick={() => handleBookingStatusChange(b._id, 'in-progress')}
                              className="px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all border border-purple-500/20"
                            >
                              Start
                            </button>
                          )}
                          {b.status === 'in-progress' && (
                            <button
                              onClick={() => handleBookingStatusChange(b._id, 'completed')}
                              className="px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                            >
                              Complete
                            </button>
                          )}
                          {b.status !== 'cancelled' && b.status !== 'completed' && (
                            <button
                              onClick={() => handleBookingStatusChange(b._id, 'cancelled')}
                              className="p-2 rounded-xl text-rose-400 hover:bg-rose-500 hover:text-white bg-rose-500/10 transition-all border border-rose-500/20"
                              title="Cancel Booking"
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
              <div className="py-20 text-center text-slate-500 font-medium">
                No bookings match your current filter parameters.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
