import React, { useState, useEffect } from 'react';

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative w-11 h-11 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Rings */}
      <div className="absolute inset-0">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 to-purple-500/20 animate-ping opacity-75"></div>

        {/* Middle Ring */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-r from-sky-500/30 to-purple-500/30 blur-sm"></div>

        {/* Inner Ring */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-sky-500/40 to-purple-500/40 blur-md"></div>
      </div>

      {/* Main Logo Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Geometric Background */}
          <div className="absolute w-8 h-8 bg-gradient-to-br from-sky-500 to-purple-500 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>

          {/* Circuit Lines */}
          <svg className="absolute w-10 h-10" viewBox="0 0 40 40">
            <path
              d="M8 20 L32 20 M20 8 L20 32 M12 12 L28 28 M12 28 L28 12"
              stroke="url#grad1"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-dash"
              style={{ stroke: 'url(#grad1)' }}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;100"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* Dots at intersections */}
            <circle cx="20" cy="20" r="2" fill="white" className="animate-pulse">
              <animate
                attributeName="r"
                values="2;3;2"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <circle cx="8" cy="20" r="1.5" fill="#0ea5e9" className="animate-ping" />
            <circle cx="32" cy="20" r="1.5" fill="#a855f7" className="animate-ping" style={{ animationDelay: '0.5s' }} />
            <circle cx="20" cy="8" r="1.5" fill="#0ea5e9" className="animate-ping" style={{ animationDelay: '1s' }} />
            <circle cx="20" cy="32" r="1.5" fill="#a855f7" className="animate-ping" style={{ animationDelay: '1.5s' }} />

            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9">
                  <animate
                    attributeName="stop-color"
                    values="#0ea5e9;#a855f7;#0ea5e9"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#a855f7">
                  <animate
                    attributeName="stop-color"
                    values="#a855f7;#0ea5e9;#a855f7"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
          </svg>

          {/* MG Text with 3D Effect */}
          <div className="relative z-10 flex items-center justify-center space-x-0.5">
            {/* M Letter */}
            <div className="relative group/m">
              <span className="text-2xl font-black text-transparent bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text transform group-hover:scale-110 transition-transform duration-300 inline-block">
                M
              </span>
              {/* M Glow */}
              <div className="absolute inset-0 blur-lg bg-gradient-to-r from-sky-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </div>

            {/* G Letter */}
            <div className="relative group/g">
              <span className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text transform group-hover:scale-110 transition-transform duration-300 inline-block">
                G
              </span>
              {/* G Glow */}
              <div className="absolute inset-0 blur-lg bg-gradient-to-r from-purple-500 to-sky-500 opacity-0 group-hover:opacity-50 transition-opacity"></div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute -inset-4 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-sky-500 rounded-full animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;