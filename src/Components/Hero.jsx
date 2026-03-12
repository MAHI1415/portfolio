


import React, { useEffect, useRef, useState } from 'react';
import ProfileCard from './ProfileCard';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const heroRef = useRef(null);
  const floatingRef = useRef(null);

  const fullText = "Senior Flutter Developer";

  useEffect(() => {
    // Infinity Typewriter Effect
    let i = 0;
    let isDeleting = false;
    let timeoutId;

    const typeWriter = () => {
      const currentText = fullText;

      if (isDeleting) {
        // Deleting text
        setTypedText(currentText.substring(0, i - 1));
        i--;

        if (i === 0) {
          isDeleting = false;
          // Pause at start before typing again
          timeoutId = setTimeout(typeWriter, 500);
          return;
        }
      } else {
        // Typing text
        setTypedText(currentText.substring(0, i + 1));
        i++;

        if (i === currentText.length) {
          isDeleting = true;
          // Pause at full text before deleting
          timeoutId = setTimeout(typeWriter, 2000);
          return;
        }
      }

      // Speed control: faster when deleting, normal when typing
      const speed = isDeleting ? 50 : 100;
      timeoutId = setTimeout(typeWriter, speed);
    };

    // Start the typewriter effect
    timeoutId = setTimeout(typeWriter, 500);

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = heroRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId); // Clean up timeout on unmount
    };
  }, []); // Empty dependency array - runs once on mount

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-zinc-900 py-20 lg:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }}></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* Left Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-zinc-300">
                    💼 Full Time
                  </span>
                  <span className="w-1 h-1 rounded-full bg-sky-500"></span>
                  <span className="text-xs sm:text-sm font-medium text-zinc-300">
                    ✨ Freelance
                  </span>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                <span className="block relative group">
                  <span className="relative z-10 bg-gradient-to-r from-white via-sky-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
                    Crafting
                  </span>
                  <span className="absolute -bottom-2 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full transition-all duration-700"></span>
                </span>
                <span className="block mt-2 relative">
                  <span className="text-white">
                    Digital
                  </span>
                </span>
                <span className="block mt-2 relative">
                  <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                    Masterpieces
                  </span>
                </span>
              </h1>

              {/* Platform Indicators */}
              <div className="flex items-center gap-4 text-sm sm:text-base text-zinc-400">
                <span className="hover:text-sky-400 transition-colors cursor-pointer">Mobile</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                <span className="hover:text-purple-400 transition-colors cursor-pointer">Web</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span className="hover:text-pink-400 transition-colors cursor-pointer">Desktop</span>
              </div>
            </div>

            {/* Typewriter Effect - INFINITE LOOP */}
            <div className="flex items-center gap-2 text-xl sm:text-2xl">
              <span className="text-zinc-400">I'm a</span>
              <span className="font-bold text-transparent bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text min-w-[200px] inline-block">
                {typedText}
              </span>
              <span className="w-0.5 h-6 bg-sky-500 animate-blink"></span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Transforming complex ideas into seamless, multi-platform experiences that users love. One codebase, unlimited possibilities.
            </p>

            {/* Platform Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "📱", label: "Android", color: "from-green-500 to-emerald-500" },
                { icon: "🍎", label: "iOS", color: "from-gray-400 to-gray-600" },
                { icon: "🌐", label: "Web", color: "from-blue-500 to-cyan-500" },
                { icon: "💻", label: "Desktop", color: "from-purple-500 to-pink-500" }
              ].map((platform, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative px-3 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-transparent transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <div className="text-xl mb-1">{platform.icon}</div>
                    <div className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                      {platform.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-zinc-500">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-colors">
                  Flutter
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                  React Native
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors">
                  Native
                </span>
              </div>
            </div>

           {/* CTA Buttons */}
           <div className="flex flex-wrap items-center gap-4 pt-4">
             <a
               href={process.env.PUBLIC_URL + '/documents/Mahendra_Gurjar_Resume.pdf'}
               download="Mahendra_Gurjar_Resume.pdf"
               className="group relative px-6 py-3 rounded-lg font-medium overflow-hidden"
             >
               <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 transition-transform duration-500 group-hover:scale-110"></div>
               <span className="relative z-10 flex items-center gap-2 text-white">
                 <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
                 Download Resume
               </span>
             </a>

             <a href="#about" className="group">
               <button className="px-6 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:border-sky-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                 View Portfolio
                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </button>
             </a>
           </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <div className="flex -space-x-2">
                {[2, 5, 7, 1].map((num, i) => (
                  <div key={i} className="relative group" style={{ zIndex: 10 - i }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white border-2 border-zinc-900 hover:scale-110 transition-transform">
                      {num}+
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">15+</span>
                </p>
                <p className="text-sm text-zinc-400">Projects Delivered</p>
{/*                 <p className="text-xs text-zinc-500">Across 20+ Countries</p> */}
              </div>
            </div>
          </div>

          {/* Right Content - Profile Card */}
          <div
            ref={floatingRef}
            className="relative mt-0 lg:mt-0"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -2}deg)`
            }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
            <div className="relative">
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 group">
          <span className="text-xs uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors">
            Scroll
          </span>
          <div className="relative">
            <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-sky-500/50 transition-colors flex justify-center">
              <div className="w-1 h-2 bg-gradient-to-b from-sky-500 to-purple-500 rounded-full mt-2 animate-scroll"></div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;