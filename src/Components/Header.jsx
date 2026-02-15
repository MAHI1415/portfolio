import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AnimatedLogo from './AnimatedLogo';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navOpen && !e.target.closest('.navbar') && !e.target.closest('.menu-btn')) {
        setNavOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [navOpen]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleContactClick = (e) => {
    createRipple(e);
    // Add your contact navigation logic here
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-900/90 backdrop-blur-xl shadow-lg shadow-purple-500/5'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className='max-w-screen-2xl w-full mx-auto px-4 h-20 flex items-center justify-between md:px-8'>

        {/* Animated Logo with hover and tap effect */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
          <a
            href="#home"
            className='relative block logo'
            onClick={createRipple}
          >
            <AnimatedLogo />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:block'>
          <Navbar navOpen={false} />
        </div>

        {/* Contact Button - Desktop with Circle Effects */}
        <a
          href="#contact"
          onClick={handleContactClick}
          className='hidden md:flex group relative bg-gradient-to-r from-sky-500 to-purple-500 h-10 items-center gap-2 px-6 rounded-full font-medium text-sm text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 overflow-hidden contact-btn'
        >
          {/* Animated circles background */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

          {/* Floating circles */}
          <span className="absolute w-20 h-20 bg-white/10 rounded-full -top-10 -left-10 group-hover:scale-150 transition-transform duration-700"></span>
          <span className="absolute w-16 h-16 bg-white/5 rounded-full -bottom-8 -right-8 group-hover:scale-150 transition-transform duration-700 delay-100"></span>

          {/* Pulsing circle on hover */}
          <span className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-30 transition-all duration-700"></span>

          <span className="relative z-10 flex items-center gap-2">
            Let's Talk
            <span className="material-symbols-rounded text-base group-hover:translate-x-1 transition-transform relative">
              arrow_forward
            </span>
          </span>

          {/* Tap ripple effect will be added by JavaScript */}
        </a>

        {/* Mobile Menu Button with Circle Effects */}
        <button
          className='md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sky-500/50 transition-all duration-300 group overflow-hidden menu-btn'
          onClick={(e) => {
            createRipple(e);
            setNavOpen(!navOpen);
          }}
          aria-label="Toggle menu"
        >
          {/* Circle background effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>

          {/* Pulsing circles */}
          <span className="absolute w-8 h-8 bg-sky-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></span>
          <span className="absolute w-6 h-6 bg-purple-500/20 rounded-full animate-ping animation-delay-200 opacity-0 group-hover:opacity-100"></span>

          <span className='material-symbols-rounded text-2xl relative z-10 text-white'>
            {navOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Overlay with Slide Animation */}
      <div
        className={`fixed inset-0 bg-zinc-900/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          navOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '80px' }}
      >
        <div className="container mx-auto px-4 py-8">
          <Navbar navOpen={navOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;