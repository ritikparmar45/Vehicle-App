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
  AlertCircle,
  Database,
  ShieldAlert,
  Zap,
  TrendingUp,
  LayoutDashboard,
  Bell,
  Command
} from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [bookingFilter, setBookingFilter] = useState({ customer: '', status: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      showAlert(`Matrix updated: Booking status ${newStatus}`, 'success');
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
    { label: 'Catalog Size', value: services.length, icon: <Package />, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { label: 'Active Queue', value: bookings.filter(b => b.status === 'pending' || b.status === 'approved').length, icon: <Activity />, color: 'text-accent-success', bg: 'bg-accent-success/10' },
    { label: 'Today\'s Matrix', value: bookings.filter(b => isToday(b.appointmentDate)).length, icon: <Zap />, color: 'text-accent-secondary', bg: 'bg-accent-secondary/10' },
    { label: 'Units Processed', value: bookings.filter(b => b.status === 'completed').length, icon: <TrendingUp />, color: 'text-slate-900', bg: 'bg-slate-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Terminal Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass border-slate-100 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
              <Command className="w-4 h-4 text-accent-primary" />
              <span>Root Access: Administrator Console</span>
            </div>
            <h1 className="text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">Operational Matrix</h1>
            <p className="text-lg text-slate-500 font-medium">Global control interface for service protocols and customer scheduling.</p>
          </div>
          
          <div className="flex items-center gap-6">
            {alert && (
              <div className={`flex items-center gap-4 px-8 py-4 rounded-[1.5rem] shadow-2xl border animate-slide-up ${
                alert.type === 'success' 
                ? 'bg-slate-900 border-accent-success text-accent-success' 
                : 'bg-slate-900 border-accent-error text-accent-error'
              }`}>
                {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{alert.message}</span>
              </div>
            )}
            <button className="relative w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-white transition-all shadow-sm group">
               <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
               <span className="absolute top-4 right-4 w-2 h-2 bg-accent-primary rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Real-time Diagnostics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 card-shadow hover:shadow-2xl transition-all duration-500 group">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-4xl font-heading font-black text-slate-900 tracking-tighter">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Booking Management Queue */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 card-shadow overflow-hidden">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
                <div className="space-y-1">
                  <h2 className="text-3xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <Database className="w-8 h-8 text-accent-primary" />
                    Process Queue
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">Managing current operational flow.</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="relative group">
                    <Search className="w-4 h-4 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-accent-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Operator lookup..."
                      value={bookingFilter.customer}
                      onChange={(e) => setBookingFilter({ ...bookingFilter, customer: e.target.value })}
                      className="pl-14 pr-6 py-4 bg-slate-50 border-none rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-slate-900 outline-none w-56 transition-all shadow-sm"
                    />
                  </div>
                  <div className="relative group">
                    <Filter className="w-4 h-4 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-accent-primary transition-colors" />
                    <select
                      value={bookingFilter.status}
                      onChange={(e) => setBookingFilter({ ...bookingFilter, status: e.target.value })}
                      className="pl-14 pr-10 py-4 bg-slate-50 border-none rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-slate-900 outline-none appearance-none text-slate-600 shadow-sm"
                    >
                      <option value="">Full Archive</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto -mx-10 md:-mx-14">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-14 py-6">Identity</th>
                      <th className="px-10 py-6">Module</th>
                      <th className="px-10 py-6">Scheduled</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-14 py-6 text-right">Directives</th>
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
                        <tr key={b._id} className="hover:bg-slate-50/80 transition-all group">
                          <td className="px-14 py-8">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-lg group-hover:scale-110 transition-transform">
                                {(b.user?.name || 'U')[0]}
                              </div>
                              <div className="space-y-0.5">
                                <span className="font-black text-slate-900 tracking-tight text-lg">{b.user?.name || 'Unknown Entity'}</span>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: #0{b._id.slice(-5)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <div className="space-y-1">
                              <p className="font-bold text-slate-700">{b.service?.name || 'Undefined Module'}</p>
                              <p className="text-[10px] font-black text-accent-primary uppercase tracking-widest">{b.vehicleDetails?.make}</p>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <div className="space-y-1">
                              <span className="font-black text-slate-900 tracking-tight">{new Date(b.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <Clock size={12} className="text-accent-primary" />
                                {b.appointmentTime}
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] shadow-sm ${
                              b.status === 'approved' ? 'bg-accent-primary/10 text-accent-primary' :
                              b.status === 'completed' ? 'bg-accent-success/10 text-accent-success' :
                              b.status === 'cancelled' ? 'bg-accent-error/10 text-accent-error' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-14 py-8 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                              {b.status !== 'approved' && b.status !== 'completed' && b.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleBookingStatusChange(b._id, 'approved')}
                                  className="w-10 h-10 bg-accent-primary/10 text-accent-primary rounded-xl hover:bg-accent-primary hover:text-white transition-all shadow-sm flex items-center justify-center"
                                  title="Validate"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                              )}
                              {b.status !== 'completed' && b.status !== 'cancelled' && b.status === 'approved' && (
                                <button
                                  onClick={() => handleBookingStatusChange(b._id, 'completed')}
                                  className="w-10 h-10 bg-accent-success/10 text-accent-success rounded-xl hover:bg-accent-success hover:text-white transition-all shadow-sm flex items-center justify-center"
                                  title="Initialize Completion"
                                >
                                  <Activity className="w-5 h-5" />
                                </button>
                              )}
                              {b.status !== 'cancelled' && b.status !== 'completed' && (
                                <button
                                  onClick={() => handleBookingStatusChange(b._id, 'cancelled')}
                                  className="w-10 h-10 bg-accent-error/10 text-accent-error rounded-xl hover:bg-accent-error hover:text-white transition-all shadow-sm flex items-center justify-center"
                                  title="Abort Session"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {bookings.length === 0 && (
                  <div className="py-24 text-center">
                    <Database className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No matrix data available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Module Configuration Section */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* New Protocol Form */}
            <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-20 -bottom-20 opacity-10 transition-transform duration-1000 group-hover:scale-125 rotate-12">
                 <LayoutDashboard className="w-64 h-64" />
               </div>
               
               <div className="relative z-10 space-y-10">
                 <div className="space-y-3">
                   <div className="w-12 h-12 rounded-2xl bg-accent-primary/20 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-accent-primary" />
                   </div>
                   <h2 className="text-3xl font-heading font-black tracking-tight leading-tight">Define <br/> Protocol</h2>
                 </div>

                 <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      try {
                        await axios.post(`${API_BASE}/services`, formData);
                        fetchServices();
                        showAlert('Protocol established: Service Added', 'success');
                        setFormData({ name: '', category: '', vehicleType: '', price: '', duration: '', isActive: true });
                      } catch (err) {
                        showAlert(err.response?.data?.message || 'Protocol transmission failed', 'error');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="space-y-6"
                  >
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Protocol Name</label>
                        <input type="text" placeholder="e.g. Engine Calibration" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 text-xs focus:ring-2 focus:ring-accent-primary placeholder:text-slate-600 transition-all font-black uppercase tracking-widest outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                          <input type="text" placeholder="Matrix" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 text-xs focus:ring-2 focus:ring-accent-primary placeholder:text-slate-600 transition-all font-black uppercase tracking-widest outline-none" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Type</label>
                          <input type="text" placeholder="Car/Bike" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 text-xs focus:ring-2 focus:ring-accent-primary placeholder:text-slate-600 transition-all font-black uppercase tracking-widest outline-none" value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} required />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Payload (₹)</label>
                          <input type="number" placeholder="Cost" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 text-xs focus:ring-2 focus:ring-accent-primary placeholder:text-slate-600 transition-all font-black uppercase tracking-widest outline-none" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Duration (Min)</label>
                          <input type="number" placeholder="Mins" className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-4 text-xs focus:ring-2 focus:ring-accent-primary placeholder:text-slate-600 transition-all font-black uppercase tracking-widest outline-none" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-accent-primary hover:bg-white hover:text-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-accent-primary/20 active:scale-95 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? 'Transmitting...' : 'Commit Protocol'} <ArrowRight className="w-4 h-4" />
                      </button>
                 </form>
               </div>
            </div>

            {/* Protocol Catalog */}
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 card-shadow overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-heading font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <Settings className="w-6 h-6 text-slate-400" />
                    Catalog
                 </h3>
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{services.length} Total</span>
               </div>
               
               <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                  {services.map((s) => (
                    <div key={s._id} className="group flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-slate-100">
                      <div className="space-y-2">
                        <h4 className="font-black text-slate-900 tracking-tight group-hover:text-accent-primary transition-colors">{s.name}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span>₹{s.price}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span>{s.duration} MIN</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button
                            onClick={async () => {
                              const updated = { ...s, isActive: !s.isActive };
                              await axios.put(`${API_BASE}/services/${s._id}`, updated);
                              fetchServices();
                              showAlert(`Protocol ${updated.isActive ? 'activated' : 'deactivated'}`, 'success');
                            }}
                            className={`p-3 rounded-xl transition-all shadow-sm ${s.isActive ? 'bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                         >
                           <Zap className="w-4 h-4" />
                         </button>
                         <button
                            onClick={async () => {
                              if (confirm(`Purge protocol '${s.name}' from catalog?`)) {
                                await axios.delete(`${API_BASE}/services/${s._id}`);
                                fetchServices();
                                showAlert('Protocol purged successfully', 'success');
                              }
                            }}
                            className="p-3 bg-accent-error/10 text-accent-error rounded-xl hover:bg-accent-error hover:text-white transition-all shadow-sm"
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
    </div>
  );
};

export default AdminDashboard;
