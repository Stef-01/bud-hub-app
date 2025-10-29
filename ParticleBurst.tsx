import React from 'react';
import { motion } from 'framer-motion';

const ParticleBurst: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const numParticles = 20;
  const particles = Array.from({ length: numParticles });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            backgroundColor: ['#4ade80', '#34d399', '#fde047'][index % 3], // green, emerald, yellow
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
          }}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 0.5,
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 0.6 + Math.random() * 0.4,
            ease: 'easeOut',
          }}
          onAnimationComplete={index === 0 ? onComplete : undefined}
        />
      ))}
    </div>
  );
};

export default ParticleBurst;
