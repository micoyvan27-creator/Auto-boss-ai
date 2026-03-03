import { BarChart3, Calendar, Hash, Layers, Zap, Users } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: 'AI Bulk Post Generator',
    description: 'Generate 100+ posts in seconds with a single prompt. No more writer\'s block.',
    icon: Zap,
  },
  {
    title: 'Smart Hashtag Creator',
    description: 'Automatically find and add high-performing hashtags to boost your reach.',
    icon: Hash,
  },
  {
    title: 'Multi-Platform Posting',
    description: 'Post to Instagram, TikTok, Facebook, X, and YouTube Shorts simultaneously.',
    icon: Layers,
  },
  {
    title: 'Auto Daily Scheduler',
    description: 'Set your schedule once, and let our AI fill the slots automatically.',
    icon: Calendar,
  },
  {
    title: 'Zero Followers Growth',
    description: 'Proven strategies built-in to help you grow from scratch.',
    icon: Users,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track your growth and engagement with our comprehensive analytics.',
    icon: BarChart3,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to dominate social media without the manual work.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group bg-white"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
