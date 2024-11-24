import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-brand-gold/10 
        hover:border-brand-gold/20 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}