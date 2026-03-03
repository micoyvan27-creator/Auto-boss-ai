import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-6 border border-purple-100">
          🚀 AI Social Media Automation
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
          Automate Your Social Media.<br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Grow From 0 Followers.
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI generates 100 posts, schedules them, and auto-publishes daily — so you don’t have to.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2 group">
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 rounded-full bg-white text-gray-700 font-semibold text-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-gray-500" />
            See Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}
