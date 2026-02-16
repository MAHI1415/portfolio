import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ navOpen }) => {
  const lastActiveLink = useRef();
  const activeBox = useRef();
  const navRef = useRef();
  // Removed the unused rippleRef declaration

  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      setTimeout(() => {
        activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px';
        activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px';
        activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px';
        activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px';
      }, 50);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initActiveBox();
    }, 100);

    window.addEventListener('resize', initActiveBox);

    return () => {
      window.removeEventListener('resize', initActiveBox);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (navOpen) {
      setTimeout(initActiveBox, 150);
    }
  }, [navOpen]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';

    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const activeCurrentLink = (event) => {
    event.preventDefault();
    const clickedLink = event.currentTarget;

    // Create ripple effect on click
    createRipple(event);

    // Add tap circle animation
    clickedLink.classList.add('tap-effect');
    setTimeout(() => {
      clickedLink.classList.remove('tap-effect');
    }, 300);

    if (lastActiveLink.current) {
      lastActiveLink.current.classList.remove('active');
    }

    clickedLink.classList.add('active');
    lastActiveLink.current = clickedLink;

    if (activeBox.current) {
      activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px';
      activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px';
      activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px';
      activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px';
    }

    const href = clickedLink.getAttribute('href');
    if (href && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    {
      label: 'Home',
      link: '#home',
      icon: 'home',
    },
    {
      label: 'About',
      link: '#about',
      icon: 'info',
    },
    {
      label: 'Skills',
      link: '#skills',
      icon: 'school',
    },
    {
      label: 'Projects',
      link: '#projects',
      icon: 'work',
    },
    {
      label: 'Contact',
      link: '#contact',
      icon: 'mail',
    },
  ];

  return (
    <nav
      ref={navRef}
      className={'navbar ' + (navOpen ? 'active' : '')}
    >
      {navItems.map(({ label, link, icon }, key) => (
        <a
          href={link}
          key={key}
          ref={key === 0 ? lastActiveLink : null}
          className={`nav-link group ${key === 0 ? 'active' : ''}`}
          onClick={activeCurrentLink}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="material-symbols-rounded icon-transition">{icon}</span>
            <span className="label-text">{label}</span>
          </span>

          {/* Circle Tap Effect Overlay */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 to-purple-500/20 opacity-0 group-active:opacity-100 group-active:scale-150 transition-all duration-300 pointer-events-none"></span>

          {/* Pulse Effect on Hover */}
          <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-all duration-300 scale-0 group-hover:scale-100 pointer-events-none"></span>
        </a>
      ))}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;