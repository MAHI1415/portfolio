import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faTwitter,
  faDribbble
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faArrowUp,
  faHeart,
  faCode
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const footerRef = useRef(null);
  const year = new Date().getFullYear();

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform values for floating image
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating animation variants
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const socialLinks = [
    {
      icon: faGithub,
      href: "https://github.com/mahigurjar123",
      color: "#333",
      hoverColor: "#fff",
      bgGradient: "from-gray-700 to-gray-900",
      label: "GitHub"
    },
    {
      icon: faLinkedin,
      href: "https://linkedin.com/in/mahendra121",
      color: "#0077b5",
      hoverColor: "#0077b5",
      bgGradient: "from-blue-600 to-blue-800",
      label: "LinkedIn"
    },
    {
      icon: faInstagram,
      href: "https://instagram.com/m.gurjar131",
      color: "#e4405f",
      hoverColor: "#e4405f",
      bgGradient: "from-pink-500 to-purple-600",
      label: "Instagram"
    },
    {
      icon: faTwitter,
      href: "https://twitter.com/mahendra121",
      color: "#1DA1F2",
      hoverColor: "#1DA1F2",
      bgGradient: "from-sky-400 to-blue-500",
      label: "Twitter"
    },
    {
      icon: faDribbble,
      href: "https://dribbble.com/mahendra121",
      color: "#ea4c89",
      hoverColor: "#ea4c89",
      bgGradient: "from-pink-400 to-rose-500",
      label: "Dribbble"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Digital Noise */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Left Column - Profile Image with Pop-out Effect */}
          <motion.div
            className="lg:col-span-4 relative"
            style={{
              rotateX,
              rotateY,
              perspective: 1000
            }}
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Image Container with Floating Animation */}
              <motion.div
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="relative w-64 h-64 mx-auto lg:mx-0"
              >
                {/* Decorative Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping-slow" />
                <div className="absolute inset-4 rounded-full border-2 border-sky-500/20 animate-pulse" />

                {/* Profile Image Placeholder - Replace with your image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-20" />
                  <img
                      src={process.env.PUBLIC_URL + '/images/mahendra2.png'}
                    alt="Mahendra Gurjar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300/2d2d2d/ffffff?text=MG";
                    }}
                  />

                  {/* Animated Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 shadow-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FontAwesomeIcon icon={faCode} className="text-white text-xl" />
                </motion.div>
              </motion.div>

              {/* Creative Title */}
              <motion.h3
                className="text-3xl lg:text-4xl font-bold mt-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let's Create
                </span>
                <br />
                <span className="text-white">Together</span>
              </motion.h3>

              <motion.p
                className="text-zinc-400 mt-2 text-center lg:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Turning ideas into digital reality
              </motion.p>
            </div>
          </motion.div>

          {/* Middle Column - Quick Links & Contact Info */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Quick Links
            </h4>

            <ul className="space-y-3 mb-8">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-pink-500 transition-colors" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <h4 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Contact Info
            </h4>

            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="text-purple-400 text-sm" />
                </div>
                <a href="mailto:mahigurjar201@gmail.com" className="text-zinc-400 hover:text-white transition-colors text-sm break-all">
                  mahigurjar201@gmail.com
                </a>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="w-8 h-8 rounded-full bg-pink-600/20 flex items-center justify-center group-hover:bg-pink-600/30 transition-colors">
                  <FontAwesomeIcon icon={faPhone} className="text-pink-400 text-sm" />
                </div>
                <a href="tel:+919993722900" className="text-zinc-400 hover:text-white transition-colors text-sm">
                  +91 99937 22900
                </a>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-8 h-8 rounded-full bg-sky-600/20 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sky-400 text-sm" />
                </div>
                <span className="text-zinc-400 text-sm">
                  Indore, Madhya Pradesh, India
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Social & Newsletter */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Connect With Me
            </h4>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.bgGradient} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                  <div className="relative w-10 h-10 bg-zinc-800/80 backdrop-blur-sm rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-transparent transition-all duration-300">
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="text-white group-hover:text-white transition-all duration-300 text-lg"
                      style={{ color: social.hoverColor }}
                    />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50">
              <h5 className="text-lg font-semibold mb-2 text-white">Stay Updated</h5>
              <p className="text-sm text-zinc-400 mb-4">
                Get notified about my latest projects and articles
              </p>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-1 top-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 rounded-lg text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join
                  </motion.button>
                </div>
              </form>

              <p className="text-xs text-zinc-600 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-zinc-800/50 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-zinc-500 text-sm order-2 md:order-1">
              © {year} Mahendra Gurjar.
              <span className="inline-flex items-center gap-1 ml-1">
                Made with <FontAwesomeIcon icon={faHeart} className="text-pink-500 mx-1 animate-pulse" />
                using <span className="text-purple-400">React</span>
              </span>
            </p>

            {/* Made with pride */}
            <div className="flex items-center gap-4 order-1 md:order-2">
              <span className="text-xs text-zinc-600">
                v2.0.0
              </span>

              {/* Back to top button */}
              <motion.button
                onClick={scrollToTop}
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-10 h-10 bg-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-transparent transition-all duration-300">
                  <FontAwesomeIcon icon={faArrowUp} className="text-white text-sm" />
                </div>
              </motion.button>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex gap-2 order-3">
              <span className="px-2 py-1 bg-zinc-800/50 rounded-md text-xs text-zinc-500 border border-zinc-700/50">
                Flutter
              </span>
              <span className="px-2 py-1 bg-zinc-800/50 rounded-md text-xs text-zinc-500 border border-zinc-700/50">
                React
              </span>
              <span className="px-2 py-1 bg-zinc-800/50 rounded-md text-xs text-zinc-500 border border-zinc-700/50">
                Firebase
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;