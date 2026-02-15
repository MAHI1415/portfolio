import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
  faCheck,
  faTimes,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [focusedField, setFocusedField] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 2000);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      label: 'Email',
      value: 'mahigurjar201@gmail.com',
      link: 'mailto:mahigurjar201@gmail.com',
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple'
    },
    {
      icon: faPhone,
      label: 'Phone',
      value: '+91 99937 22900',
      link: 'tel:+919993722900',
      gradient: 'from-sky-500 to-blue-500',
      color: 'sky'
    },
    {
      icon: faLocationDot,
      label: 'Location',
      value: 'Indore, Madhya Pradesh, India',
      link: null,
      gradient: 'from-green-500 to-emerald-500',
      color: 'green'
    }
  ];

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/mahigurjar123', label: 'GitHub', color: '#333' },
    { icon: faLinkedin, href: 'https://linkedin.com/in/mahendra121', label: 'LinkedIn', color: '#0077b5' },
    { icon: faInstagram, href: 'https://instagram.com/m.gurjar131', label: 'Instagram', color: '#e4405f' }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-white py-20 lg:py-24 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-40 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-40 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, "-30%", "+30%", "-30%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
              Get In Touch
            </span>
          </h2>
          <div className="relative inline-block">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's collaborate and bring your ideas to life
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">

          {/* Left Column - Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInLeft}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${info.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

                <div className="relative bg-zinc-800/50 backdrop-blur-sm p-6 rounded-2xl border border-zinc-700/50 group-hover:border-transparent transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Icon with Floating Animation */}
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${info.gradient} flex items-center justify-center text-2xl shadow-lg`}
                      animate={{
                        y: [-3, 3, -3],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    >
                      <FontAwesomeIcon icon={info.icon} className="text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-zinc-500 mb-1">
                        {info.label}
                      </h3>

                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-lg font-medium text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-white">
                          {info.value}
                        </p>
                      )}

                      {/* Status Indicator */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${info.color}-400 opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 bg-${info.color}-500`}></span>
                        </span>
                        <span className="text-xs text-zinc-500">
                          {info.label === 'Email' ? 'Reply within 24h' :
                           info.label === 'Phone' ? 'Available 9am-6pm' : 'Based in India'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              variants={scaleIn}
              className="pt-4"
            >
              <h3 className="text-sm font-semibold text-zinc-500 mb-4 uppercase tracking-wider">
                Connect on Social Media
              </h3>

              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative w-12 h-12 bg-zinc-800/80 backdrop-blur-sm rounded-xl border border-zinc-700 flex items-center justify-center group-hover:border-transparent transition-all duration-300">
                      <FontAwesomeIcon
                        icon={social.icon}
                        className="text-white group-hover:text-white transition-all duration-300 text-xl"
                        style={{ color: social.color }}
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              variants={scaleIn}
              className="relative"
            >
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900 animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Available for Freelance</h4>
                    <p className="text-sm text-zinc-400">Open to new opportunities</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Form Container */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

              <div className="relative bg-zinc-800/30 backdrop-blur-sm rounded-3xl border border-zinc-700/50 p-8 lg:p-10">

                {/* Form Header */}
                <div className="mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Send a Message
                    </span>
                  </h3>
                  <p className="text-zinc-400">
                    I'll get back to you within 24 hours
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name Field */}
                  <div className="relative">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 transition-opacity duration-300 ${
                        focusedField === 'name' ? 'opacity-30' : ''
                      }`}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="Your Name"
                      className="relative w-full bg-zinc-700/50 border border-zinc-600 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                    />
                    {formData.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </motion.div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 transition-opacity duration-300 ${
                        focusedField === 'email' ? 'opacity-30' : ''
                      }`}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="Your Email"
                      className="relative w-full bg-zinc-700/50 border border-zinc-600 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                    />
                    {formData.email && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </motion.div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 transition-opacity duration-300 ${
                        focusedField === 'message' ? 'opacity-30' : ''
                      }`}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows="6"
                      placeholder="Your Message"
                      className="relative w-full bg-zinc-700/50 border border-zinc-600 rounded-xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    className="relative w-full group overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl" />

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Button Content */}
                    <div className="relative px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white">
                      {formStatus === 'submitting' ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : formStatus === 'success' ? (
                        <>
                          <FontAwesomeIcon icon={faCheck} />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FontAwesomeIcon icon={faPaperPlane} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Success/Error Messages */}
                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center"
                      >
                        Thank you for reaching out! I'll get back to you soon.
                      </motion.div>
                    )}

                    {formStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-center"
                      >
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Form Footer */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-zinc-600">
                    Your information is safe with us. We'll never share your details.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 8s ease infinite;
        }
        .bg-300\% {
          background-size: 300% 300%;
        }
      `}</style>
    </section>
  );
};

export default ContactMe;