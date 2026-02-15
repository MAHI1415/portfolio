import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAndroid, faApple, faGithub,
  faFlutter
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowRight,
  faUser, faStar, faTimes, faExternalLinkAlt,
  faCalendar, faCode, faList, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

// Import from react-icons properly
import {
  SiFirebase, SiDart,
  SiRazorpay, SiPostman, SiGit, SiAndroidstudio,
  SiFigma
} from 'react-icons/si';

// Custom GetX icon component
const GetXIcon = ({ color, className }) => (
  <svg
    viewBox="0 0 24 24"
    fill={color || '#8E44AD'}
    className={className}
    style={{ width: '1em', height: '1em' }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width - 0.5;
    const relativeY = (e.clientY - top) / height - 0.5;
    x.set(relativeX * 40);
    y.set(relativeY * 40);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// Custom Cursor Glow Component
const CursorGlow = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="fixed w-48 h-48 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-2xl pointer-events-none"
      style={{ x: mouseX, y: mouseY }}
    />
  );
};

// Background Digital Animation Component - EXACTLY as it was working
const BackgroundDigitalAnimation = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [connections, setConnections] = useState([]);

  // Code snippets for particles
  const codeSnippets = [
    '{ }', '< />', '() =>', 'const', 'let',
    'npm', 'git', 'dev', 'react', 'flutter',
    '<div>', '</div>', '=>', '{}', '[]',
    'JSX', 'CSS', 'HTML', 'API', 'JSON',
    'useState', 'useEffect', 'props', 'state',
    'Flutter', 'Widget', 'Container', 'Row', 'Column'
  ];

  useEffect(() => {
    // Initialize particles
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 14 + Math.random() * 20,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        color: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#06b6d4',
        opacity: 0.2 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    setParticles(newParticles);

    // Animation loop
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.speedX,
        y: p.y + p.speedY,
        rotation: p.rotation + p.rotationSpeed,
        // Wrap around edges
        x: p.x > 100 ? 0 : p.x < 0 ? 100 : p.x,
        y: p.y > 100 ? 0 : p.y < 0 ? 100 : p.y
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Calculate connections between nearby particles
  useEffect(() => {
    const newConnections = [];
    const connectionDistance = 25;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          // Check if near mouse to make connection glow brighter
          let isNearMouse = false;
          if (mousePosition.x !== 0 && mousePosition.y !== 0) {
            const avgX = (p1.x + p2.x) / 2;
            const avgY = (p1.y + p2.y) / 2;
            const mouseDx = avgX - mousePosition.x;
            const mouseDy = avgY - mousePosition.y;
            const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            isNearMouse = mouseDist < 20;
          }

          newConnections.push({
            id: `${i}-${j}`,
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            opacity: isNearMouse ? 0.6 : 0.2 - (distance / connectionDistance) * 0.15,
            width: isNearMouse ? 2 : 1
          });
        }
      }
    }
    setConnections(newConnections);
  }, [particles, mousePosition]);

  // Handle mouse movement for subtle influence
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });

    // Subtle mouse influence on nearby particles
    setParticles(prev => prev.map(p => {
      const dx = p.x - x;
      const dy = p.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 15) {
        return {
          ...p,
          x: p.x + (dx > 0 ? 0.5 : -0.5) * Math.random(),
          y: p.y + (dy > 0 ? 0.5 : -0.5) * Math.random()
        };
      }
      return p;
    }));
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect width="160" height="160" fill="url(#smallGrid)" />
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(236,72,153,0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {connections.map(conn => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth={conn.width}
            strokeOpacity={conn.opacity}
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: conn.opacity }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            rotate: particle.rotation,
            opacity: particle.opacity
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.5,
            transition: { duration: 0.2 }
          }}
        >
          <span
            className="text-sm md:text-base font-mono font-bold whitespace-nowrap"
            style={{
              color: particle.color,
              textShadow: `0 0 8px ${particle.color}`,
            }}
          >
            {particle.text}
          </span>
        </motion.div>
      ))}

      {/* Central pulse effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-2xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse follower glow */}
      {mousePosition.x !== 0 && mousePosition.y !== 0 && (
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30" />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
                <motion.button
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-700 hover:border-purple-500 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-white" />
                </motion.button>
                <motion.div
                  className="relative h-56 overflow-hidden"
                  variants={itemVariants}
                >
                 <img
                   src={process.env.PUBLIC_URL + project.image}
                   alt={project.title}
                   className="w-full h-full object-cover"
                 />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <motion.div
                    className="absolute top-4 left-4 px-4 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm border border-purple-400/50"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.role}
                  </motion.div>
                </motion.div>
                <motion.div
                  className="p-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2
                    className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    variants={itemVariants}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    className="text-gray-400 mb-4"
                    variants={itemVariants}
                  >
                    {project.tagline}
                  </motion.p>
                  <motion.div
                    className="grid grid-cols-2 gap-4 mb-6"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <FontAwesomeIcon icon={faCalendar} className="text-purple-400" />
                      <span className="text-gray-300">{project.timeline}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FontAwesomeIcon icon={faCode} className="text-pink-400" />
                      <span className="text-gray-300">{project.client}</span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="mb-6"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-purple-400" />
                      <span>Overview</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.overview?.challenge}
                    </p>
                  </motion.div>
                  <motion.div
                    className="mb-8"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                      <FontAwesomeIcon icon={faList} className="text-pink-400" />
                      <span>Key Features</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features?.slice(0, 6).map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <span className="text-purple-400 mt-1">•</span>
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex justify-end space-x-3"
                    variants={itemVariants}
                  >
                    <motion.a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                      <span>View Code</span>
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-purple-600/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      <span>View Live App</span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const springConfig = { damping: 15, stiffness: 150 };
  const floatY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      floatY.set(Math.sin(Date.now() / 1000) * 10);
    }, 16);
    return () => clearInterval(interval);
  }, [floatY]);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const projectData = [
    {
      id: 1,
      title: 'VIX Digital - OTT Platform',
      tagline: 'Multi-Platform Streaming Experience',
      role: 'Lead Flutter Developer',
      client: 'I-Engage (PSPL)',
      timeline: 'Feb 2025 - Present',
      image: '/images/vixdigital.png',
      overview: {
        challenge: 'Build a scalable OTT platform that works seamlessly across Android, iOS, and Web with features like video streaming, offline downloads, and subscription management.',
        solution: 'Developed using Flutter with GetX for state management, implementing HLS/DASH streaming, offline download handling, and secure Razorpay/Stripe integration for subscriptions.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
        { icon: faApple, color: '#999999', name: 'iOS', type: 'fa' },
        { icon: SiFirebase, color: '#FFCA28', name: 'Firebase', type: 'si' },
        { icon: GetXIcon, color: '#8E44AD', name: 'GetX', type: 'custom' },
        { icon: SiRazorpay, color: '#0B245B', name: 'Razorpay', type: 'si' },
      ],
      features: [
        'Multi-platform streaming (Android, iOS, Web)',
        'HLS/DASH video streaming',
        'Offline downloads with background handling',
        'Secure payment integration (Razorpay/Stripe)',
        'Real-time search suggestions',
        'User authentication & profiles',
        'Subscription management',
        'Push notifications'
      ],
      code: 'https://github.com/mahendra-gurjar/vix-digital',
      live: 'https://play.google.com/store/apps/details?id=com.vixdigitalott&pcampaignid=web_share',
    },
    {
      id: 2,
      title: 'Brocr - Property Management',
      tagline: 'Smart Property & Leads Management Platform',
      role: 'Lead Flutter Developer',
      client: 'I-Engage (PSPL)',
      timeline: 'Aug 2025 - Present',
      image: '/images/brocr.png',
      overview: {
        challenge: 'Create a comprehensive property management app with lead unlocking system, wallet integration, and multi-user access across Android, iOS, and Web.',
        solution: 'Built 211 screens with Firebase, GetX, and REST APIs. Implemented automatic wallet deductions for lead unlocks and real-time reporting.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
        { icon: faApple, color: '#999999', name: 'iOS', type: 'fa' },
        { icon: SiFirebase, color: '#FFCA28', name: 'Firebase', type: 'si' },
        { icon: GetXIcon, color: '#8E44AD', name: 'GetX', type: 'custom' },
        { icon: SiRazorpay, color: '#0B245B', name: 'Razorpay', type: 'si' },
      ],
      features: [
        '211 screens across platforms',
        'Property & leads management',
        'Wallet system with auto-deductions',
        'Multi-user access control',
        'Real-time analytics & reports',
        'Open market property listings',
        'Push notifications',
        'Backend-uploaded leads'
      ],
      code: 'https://github.com/mahendra-gurjar/brocr',
      live: 'https://play.google.com/store/apps/details?id=com.brocr&pcampaignid=web_share',
    },
    {
      id: 3,
      title: 'CarSee - Car Selling Platform',
      tagline: 'Revolutionary Car Trading Experience',
      role: 'Flutter Developer',
      client: 'I-Engage (PSPL)',
      timeline: 'Mar 2025 - Apr 2025',
      image: '/images/carsee.png',
      overview: {
        challenge: 'Create a seamless car selling platform that works flawlessly on Android, iOS, and Web with intuitive navigation and real-time data sync.',
        solution: 'Built with Flutter using Provider and Riverpod for state management. Implemented REST APIs for dynamic data fetching and smooth user experience.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
        { icon: faApple, color: '#999999', name: 'iOS', type: 'fa' },
        { icon: SiFirebase, color: '#FFCA28', name: 'Firebase', type: 'si' },
      ],
      features: [
        'Cross-platform support (Android, iOS, Web)',
        'Bottom navigation with 5 core screens',
        'Slide-out menu with 6 sections',
        'Real-time car listings',
        'Favorites management',
        'Sell your car feature',
        'Business account options',
        'Profile management'
      ],
      code: 'https://github.com/mahendra-gurjar/carsee',
      live: 'https://play.google.com/store/apps/details?id=com.mobapp.carsee&pcampaignid=web_share',
    },
    {
      id: 4,
      title: 'Dainik Pradesh-Prakash',
      tagline: 'Digital News Platform',
      role: 'Flutter Developer',
      client: 'I-Engage (PSPL)',
      timeline: 'Feb 2025 - Mar 2025',
      image: '/images/newspaper.png',
      overview: {
        challenge: 'Build a dynamic news app with real-time category filtering and seamless API integration.',
        solution: 'Developed using GetX for efficient state management, implemented tab-based navigation with 8 news categories and real-time data fetching.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
        { icon: GetXIcon, color: '#8E44AD', name: 'GetX', type: 'custom' },
      ],
      features: [
        '8 dynamic news categories',
        'Tab-based navigation',
        'Real-time API data fetching',
        'Profile management',
        'Social media integration',
        'Responsive design'
      ],
      code: 'https://github.com/mahendra-gurjar/dainik-news',
      live: 'https://play.google.com/store/apps/details?id=com.pradeshprakash.app&pcampaignid=web_share',
    },
    {
      id: 5,
      title: 'Systos Placements',
      tagline: 'Job Placement Platform',
      role: 'Flutter Developer',
      client: 'Systos Technology',
      timeline: 'Nov 2023 - Jan 2024',
      image: '/images/shopping.png',
      overview: {
        challenge: 'Create a job placement app with dynamic job listings and easy application process.',
        solution: 'Built with Flutter featuring dynamic job feed, filtering options, and seamless application flow.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
      ],
      features: [
        'Dynamic job feed with filters',
        'Job details with requirements',
        'Direct application option',
        'Profile management',
        'Job posting for users',
        'Trending opportunities section'
      ],
      code: 'https://github.com/mahendra-gurjar/systos-placements',
      live: 'https://systosplacements.com',
    },
    {
      id: 6,
      title: 'Tender Labour',
      tagline: 'Construction Tender Management',
      role: 'Jr. Flutter Developer',
      client: 'Systos Technology',
      timeline: 'Feb 2024 - Apr 2024',
      image: '/images/tender-labour.png',
      overview: {
        challenge: 'Build a platform for construction companies to find and bid on tenders.',
        solution: 'Developed tender listing and bidding system with document attachment and notification features.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
      ],
      features: [
        'Tender listings with details',
        'Bid submission with documents',
        'Deadline tracking',
        'Eligibility criteria display',
        'Push notifications',
        'Profile & history tracking'
      ],
      code: 'https://github.com/mahendra-gurjar/tender-labour',
      live: 'https://play.google.com/store/apps/details?id=com.tenderlabour.tender_labour&pcampaignid=web_share',
    },
    {
      id: 7,
      title: 'Dial-GM Shopping Bazaar',
      tagline: 'E-Commerce Shopping Experience',
      role: 'Jr. Flutter Developer',
      client: 'Systos Technology',
      timeline: 'May 2024 - Aug 2024',
      image: '/images/shopping.png',
      overview: {
        challenge: 'Create a comprehensive shopping app with product categories, cart management, and discount features.',
        solution: 'Built with Flutter featuring product categories, search functionality, and seamless cart management with discount code application.'
      },
      technologies: [
        { icon: faFlutter, color: '#02569B', name: 'Flutter', type: 'fa' },
        { icon: SiDart, color: '#0175C2', name: 'Dart', type: 'si' },
        { icon: faAndroid, color: '#3DDC84', name: 'Android', type: 'fa' },
      ],
      features: [
        'Product categories & filtering',
        'Search functionality',
        'Product details with images',
        'Shopping cart management',
        'Discount code application',
        'Price calculation'
      ],
      code: 'https://github.com/mahendra-gurjar/dial-gm',
      live: 'https://dialgm.com',
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sidebarItems = [
    { icon: SiAndroidstudio, color: '#3DDC84', name: 'Android Studio' },
    { icon: SiPostman, color: '#FF6C37', name: 'Postman' },
    { icon: SiGit, color: '#F05032', name: 'Git' },
    { icon: SiFigma, color: '#F24E1E', name: 'Figma' },
  ];

  const renderIcon = (tech) => {
    if (tech.type === 'fa') {
      return <FontAwesomeIcon icon={tech.icon} style={{ color: tech.color }} className="text-xl" />;
    } else if (tech.type === 'custom') {
      const CustomIcon = tech.icon;
      return <CustomIcon color={tech.color} className="text-xl" />;
    } else {
      const IconComponent = tech.icon;
      return <IconComponent style={{ color: tech.color }} className="text-xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950/30 to-gray-950 text-white font-['Inter',sans-serif] relative overflow-x-hidden">
      {/* Custom Cursor Glow */}
      <CursorGlow />

      {/* Background Digital Animation - Full page background */}
      <BackgroundDigitalAnimation />

      {/* Animated Mesh Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.15),transparent_50%)] animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ y }}
        >
          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 bg-pink-600/30 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />

          {/* Hero Content */}
          <motion.div
            className="relative max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                My Creative
              </span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Universe
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Flutter Developer & Creative Technologist
            </motion.p>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <MagneticButton className="relative group">
                <div className="px-6 py-2 bg-purple-600/10 backdrop-blur-sm rounded-full border border-purple-500/50 hover:border-purple-400 transition-all duration-300 text-sm">
                  <span className="relative z-10">Lead Developer</span>
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </div>
              </MagneticButton>

              <MagneticButton className="relative group">
                <div className="px-6 py-2 bg-pink-600/10 backdrop-blur-sm rounded-full border border-pink-500/50 hover:border-pink-400 transition-all duration-300 text-sm">
                  <span className="relative z-10">UI/UX Designer</span>
                  <div className="absolute inset-0 bg-pink-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                </div>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div
                className="w-1 h-2.5 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Projects Grid */}
        <motion.section
          className="py-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projectData.map((project, index) => (
              <motion.article
                key={project.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.01, y: -3 }}
                className="group relative bg-gray-800/30 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500 rounded-xl blur opacity-0 group-hover:opacity-100" />

                <div className="relative h-56 overflow-hidden">
                  <img
                    src={process.env.PUBLIC_URL + project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                  <motion.div
                    className="absolute top-3 right-3 px-3 py-0.5 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs border border-purple-400/50"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {project.role}
                  </motion.div>
                </div>

                <div className="relative p-4">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-400/80 text-sm mb-1">{project.tagline}</p>
                  <p className="text-gray-500 text-xs mb-3">{project.timeline}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-1 px-2 py-0.5 bg-gray-700/30 rounded-full border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -1 }}
                        title={tech.name}
                      >
                        {renderIcon(tech)}
                        <span className="text-xs">{tech.name}</span>
                      </motion.div>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <motion.a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={faGithub} className="text-xl" />
                    </motion.a>

                    <motion.button
                      onClick={() => handleViewProject(project)}
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 text-sm group/link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Toolkit</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: faFlutter, name: 'Flutter', color: '#02569B', level: 95, type: 'fa' },
              { icon: SiDart, name: 'Dart', color: '#0175C2', level: 90, type: 'si' },
              { icon: SiFirebase, name: 'Firebase', color: '#FFCA28', level: 85, type: 'si' },
              { icon: GetXIcon, name: 'GetX', color: '#8E44AD', level: 90, type: 'custom' },
              { icon: SiRazorpay, name: 'Razorpay', color: '#0B245B', level: 80, type: 'si' },
              { icon: SiPostman, name: 'Postman', color: '#FF6C37', level: 85, type: 'si' },
              { icon: SiGit, name: 'Git', color: '#F05032', level: 85, type: 'si' },
              { icon: SiFigma, name: 'Figma', color: '#F24E1E', level: 75, type: 'si' },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="group relative bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    {skill.type === 'fa' ? (
                      <FontAwesomeIcon icon={skill.icon} style={{ color: skill.color }} className="text-xl group-hover:scale-110 transition-transform" />
                    ) : skill.type === 'custom' ? (
                      <skill.icon color={skill.color} className="text-xl group-hover:scale-110 transition-transform" />
                    ) : (
                      <skill.icon style={{ color: skill.color }} className="text-xl group-hover:scale-110 transition-transform" />
                    )}
                    <span className="font-medium text-sm">{skill.name}</span>
                  </div>

                  <div className="w-full bg-gray-700/50 rounded-full h-1 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

{/* Tools Sidebar - Compact Version */}
<motion.div
  className="fixed left-4 top-32 z-50 hidden lg:block w-32" // Reduced width from w-56 to w-32
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
>
  <motion.div
    className="relative group"
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />

    <div className="relative bg-gray-900/80 backdrop-blur-xl p-2.5 rounded-xl border border-gray-700/50 overflow-hidden"> {/* Reduced padding */}
      <motion.h3
        className="text-[10px] uppercase tracking-wider font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Tools
      </motion.h3>

      <div className="flex flex-col gap-1.5 mb-2"> {/* Changed to flex-col for a slimmer profile */}
        {sidebarItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative group/item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative bg-gray-800/50 rounded-lg p-1.5 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                className="flex-shrink-0"
              >
                <item.icon
                  style={{ color: item.color }}
                  className="text-sm group-hover/item:scale-110 transition-transform duration-300"
                />
              </motion.div>
              <p className="text-[9px] font-medium text-gray-400 group-hover/item:text-white transition-colors truncate">
                {item.name.split(' ')[0]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-1 pt-2 border-t border-gray-700/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex flex-col items-center gap-1 text-[8px]">
          <div className="flex items-center space-x-1">
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
            </span>
            <span className="text-gray-400">2022 - Now</span>
          </div>

          <div className="w-full mt-1">
            <div className="w-full bg-gray-700/50 rounded-full h-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: '85%' }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</motion.div>

        {/* Social Links */}
        <div className="fixed bottom-6 right-6 z-50 flex space-x-3">
          <motion.a
            href="https://github.com/mahigurjar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faGithub} className="text-gray-400 hover:text-white transition-colors text-lg" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faUser} className="text-gray-400 hover:text-blue-400 transition-colors text-lg" />
          </motion.a>
          <motion.a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faStar} className="text-gray-400 hover:text-pink-400 transition-colors text-lg" />
          </motion.a>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Projects;