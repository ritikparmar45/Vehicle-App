import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    await axios.put(`${API_BASE}/bookings/${bookingId}`, { status: newStatus });
    fetchBookings();
    showAlert(`Booking ${newStatus}`, 'success');
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>

      {alert && (
        <div
          className={`p-4 rounded-lg shadow ${
            alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Bookings Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Bookings</h2>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by customer"
            value={bookingFilter.customer}
            onChange={(e) => setBookingFilter({ ...bookingFilter, customer: e.target.value })}
            className="border p-2 rounded w-full sm:w-1/3"
          />
          <select
            value={bookingFilter.status}
            onChange={(e) => setBookingFilter({ ...bookingFilter, status: e.target.value })}
            className="border p-2 rounded w-full sm:w-1/3"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-800 mt-4 rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {bookings
                .filter((b) => {
                  const matchName = b.user?.name?.toLowerCase().includes(bookingFilter.customer.toLowerCase());
                  const matchStatus = bookingFilter.status ? b.status === bookingFilter.status : true;
                  return matchName && matchStatus;
                })
                .map((b) => (
                  <tr key={b._id}>
                    <td className="px-4 py-3">{b.user?.name || 'User not found'}</td>
                    <td className="px-4 py-3">{b.service?.name || 'Service not found'}</td>
                    <td className="px-4 py-3">{new Date(b.appointmentDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 capitalize">{b.status}</td>
                    <td className="px-4 py-3 space-x-2">
                      {b.status !== 'approved' && (
                        <button
                          onClick={() => handleBookingStatusChange(b._id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                        >
                          Approve
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => handleBookingStatusChange(b._id, 'cancelled')}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                        >
                          Cancel
                        </button>
                      )}
                      {b.status !== 'completed' && isToday(b.appointmentDate) && (
                        <button
                          onClick={() => handleBookingStatusChange(b._id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Services</h2>

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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <input type="text" placeholder="Service Name" className="border p-2 rounded" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="text" placeholder="Category" className="border p-2 rounded" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
          <input type="text" placeholder="Vehicle Type" className="border p-2 rounded" value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} required />
          <input type="number" placeholder="Price ₹" className="border p-2 rounded" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          <input type="number" placeholder="Duration (mins)" className="border p-2 rounded" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
            <span>Active</span>
          </label>
          <button type="submit" className="col-span-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
            Add Service
          </button>
        </form>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm text-gray-800 rounded-xl overflow-hidden shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {services.map((s) => (
                <tr key={s._id}>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.category}</td>
                  <td className="px-4 py-3">{s.vehicleType}</td>
                  <td className="px-4 py-3">₹{s.price}</td>
                  <td className="px-4 py-3">{s.duration} min</td>
                  <td className="px-4 py-3">{s.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={async () => {
                        const updated = { ...s, isActive: !s.isActive };
                        await axios.put(`${API_BASE}/services/${s._id}`, updated);
                        fetchServices();
                        showAlert(`Service ${updated.isActive ? 'activated' : 'deactivated'}`, 'success');
                      }}
                      className={`${
                        s.isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
                      } text-white px-3 py-1 rounded transition`}
                    >
                      {s.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Are you sure to delete this service?')) {
                          await axios.delete(`${API_BASE}/services/${s._id}`);
                          fetchServices();
                          showAlert('Service deleted', 'success');
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
