import { Calendar, CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Dashboard Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="text-sm font-medium text-gray-500">AutoBoss AI Dashboard</div>
          <div className="w-20"></div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block col-span-1 space-y-2">
            <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
              <TrendingUp size={20} /> Dashboard
            </div>
            <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <FileText size={20} /> Posts
            </div>
            <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <Calendar size={20} /> Schedule
            </div>
            <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <CheckCircle size={20} /> Published
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <FileText size={24} />
                  </div>
                  <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,248</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <Clock size={24} />
                  </div>
                  <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Scheduled</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">86</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">Done</span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">Published</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,162</p>
              </div>
            </div>

            {/* Calendar View Mockup */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Content Calendar</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200 text-sm">Month</button>
                  <button className="p-2 bg-gray-900 text-white rounded-lg text-sm">Week</button>
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors group cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {10 + item}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        5 Tips for Growing Your Audience
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">Scheduled for Instagram, TikTok • 2:00 PM</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium border border-yellow-100">
                      Scheduled
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
