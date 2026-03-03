import { Calendar, PenTool, Send } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    id: 1,
    title: 'Generate',
    description: 'Tell AutoBoss AI what you want: "Create 50 motivational TikTok posts"',
    icon: PenTool,
    colorClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2,
    title: 'Schedule',
    description: 'Auto schedule for 30–100 days in just a few clicks.',
    icon: Calendar,
    colorClass: 'bg-purple-50 text-purple-600',
  },
  {
    id: 3,
    title: 'Auto Post',
    description: 'We publish automatically on your connected platforms.',
    icon: Send,
    colorClass: 'bg-green-50 text-green-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to automate your entire social media strategy.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${step.colorClass} flex items-center justify-center mb-6 shadow-sm`}>
                <step.icon className="w-8 h-8" />
              </div>
              <div className="absolute top-6 right-6 bg-gray-100 text-gray-500 font-bold text-xs px-2 py-1 rounded-md">
                STEP {step.id}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
