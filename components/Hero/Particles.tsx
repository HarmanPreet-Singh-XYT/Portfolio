import React, { useEffect, useState } from 'react';

type Particle = {
  x: string;
  y: string;
  duration: string;
  size: string;
  opacity: string;
}

type ParticlesProps = {
  quantity?: number;
  className?: string;
}

export function Particles({ quantity = 40, className = '' }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate varied particles for visual interest
    setParticles(
      Array.from({ length: quantity }, () => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        duration: `${3 + Math.random() * 7}s`,
        size: `${Math.random() * 2 + 1}px`,
        opacity: `${Math.random() * 0.5 + 0.3}`
      }))
    );
  }, [quantity]);
  
  return (
    <div aria-hidden="true" className={`particle-container pointer-events-none ${className}`}>
      {particles.map((particle, i) => (
        <div 
          key={i} 
          className="particle absolute will-change-transform"
          style={{
            '--x': particle.x,
            '--y': particle.y,
            '--duration': particle.duration,
            '--size': particle.size,
            '--opacity': particle.opacity,
            left: '0',
            top: '0',
            width: 'var(--size)',
            height: 'var(--size)',
            borderRadius: '50%',
            backgroundColor: 'rgba(74, 222, 128, 0.6)',
            opacity: 'var(--opacity)',
            transform: 'translate(var(--x), var(--y))',
            animation: `float var(--duration) infinite alternate ease-in-out`
          } as React.CSSProperties}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          100% { transform: translate(var(--x), var(--y)); }
        }
      `}</style>
    </div>
  );
}