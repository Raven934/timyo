import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import api from '../services/api';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [startsAt, setStartsAt] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
    } catch (error) {
      showToast('Failed to fetch appointments', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post('/appointments', {
        starts_at: startsAt,
        notes: notes || null,
      });
      showToast('Appointment created successfully!', 'success');
      setShowCreateForm(false);
      setStartsAt('');
      setNotes('');
      fetchAppointments();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create appointment';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await api.delete(`/appointments/${id}`);
      showToast('Appointment cancelled successfully!', 'success');
      fetchAppointments();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to cancel appointment';
      showToast(errorMessage, 'error');
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Create Appointment Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            {showCreateForm ? 'Cancel' : '+ Create New Appointment'}
          </button>
        </div>

        {/* Create Appointment Form */}
        {showCreateForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4">Create New Appointment</h3>
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  required
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                {submitting ? 'Creating...' : 'Create Appointment'}
              </button>
            </form>
          </div>
        )}

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">My Appointments</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No appointments yet. Create your first appointment!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(appointment.starts_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {appointment.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(appointment.status)}`}>
                          {appointment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.status === 'pending' && new Date(appointment.starts_at) > new Date() && (
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
