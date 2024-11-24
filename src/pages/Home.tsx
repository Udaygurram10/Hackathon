import { Trophy, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-brand-gold">Innovation</span> Starts Here
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join Vikalma's premier hackathon platform and showcase your innovative solutions to real-world challenges.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-brand-gold/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-brand-gold">Current Challenge</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">AI for Sustainability</h3>
            <p className="text-gray-300">
              Develop innovative AI solutions that address environmental challenges and promote sustainability.
            </p>
            <div className="flex items-center space-x-2 text-brand-gold">
              <Clock size={20} />
              <span>Ends in 5 days</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-brand-gold/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-brand-gold">Prizes</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Trophy className="text-brand-gold" size={24} />
              <div>
                <h4 className="font-semibold">First Prize</h4>
                <p className="text-gray-300">$5,000 + Mentorship</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Trophy className="text-gray-400" size={24} />
              <div>
                <h4 className="font-semibold">Second Prize</h4>
                <p className="text-gray-300">$3,000 + Resources</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 bg-brand-gold/10 px-4 py-2 rounded-full">
          <Users size={20} className="text-brand-gold" />
          <span className="text-brand-gold">150+ Participants Registered</span>
        </div>
      </motion.div>
    </div>
  );
}