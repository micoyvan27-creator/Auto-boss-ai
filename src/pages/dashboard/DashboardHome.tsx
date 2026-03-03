import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  TrendingUp 
} from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, scheduled: 0, published: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email.split('@')[0]}! 👋</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <FileText size={24} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Clock size={24} />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Scheduled</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.scheduled}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <CheckCircle size={24} />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
              Done
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Published</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.published}</p>
        </div>
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="/dashboard/generate" className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group border border-gray-100">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <FileText size={24} className="text-blue-600" />
              </div>
              <span className="font-medium text-sm">Create New Post</span>
            </a>
            <a href="/dashboard/scheduled" className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors group border border-gray-100">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Calendar size={24} className="text-purple-600" />
              </div>
              <span className="font-medium text-sm">View Calendar</span>
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-gray-400 text-sm">
            Connect platforms to see analytics
          </div>
        </div>
      </div>
    </div>
  );
}
