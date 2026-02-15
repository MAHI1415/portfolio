import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Icons
import {
  FaSchool,
  FaUniversity
} from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';

const About = () => {
  // Refs for each section
  const refs = {
    edu3: useRef(null), // 10th (2016)
    edu2: useRef(null), // 12th (2018)
    edu1: useRef(null), // B.Tech (2022)
    job1: useRef(null), // First Job (2023)
    job2: useRef(null), // Second Job (2025)
  };

  // Check if each section is in view
  const edu3InView = useInView(refs.edu3, { once: false, amount: 0.3 });
  const edu2InView = useInView(refs.edu2, { once: false, amount: 0.3 });
  const edu1InView = useInView(refs.edu1, { once: false, amount: 0.3 });
  const job1InView = useInView(refs.job1, { once: false, amount: 0.3 });
  const job2InView = useInView(refs.job2, { once: false, amount: 0.3 });

  // Animation variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Calculate line height based on scroll
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('timeline-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollPercent = Math.min(1, Math.max(0,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        ));
        setLineHeight(scrollPercent * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-zinc-50 py-20 lg:py-24 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-sky-400 bg-clip-text text-transparent bg-300% animate-gradient">
              My Journey
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-sky-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Timeline Container */}
        <div id="timeline-container" className="relative max-w-6xl mx-auto">
          {/* Central Glowing Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-sky-500 via-purple-500 to-purple-500 rounded-full"
              style={{ height: `${lineHeight}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full blur-md"></div>
            </motion.div>
          </div>

          {/* Timeline Items - Staggered Layout */}
          <div className="relative flex flex-col items-center">

            {/* 2016 - RIGHT SIDE (with top offset) */}
            <div className="relative w-full flex justify-end mb-24 lg:mb-32">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pl-12">
                <motion.div
                  ref={refs.edu3}
                  initial="hidden"
                  animate={edu3InView ? "visible" : "hidden"}
                  variants={fadeInRight}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="absolute left-0 top-12 transform -translate-x-1/2 lg:left-[-32px] w-4 h-4 z-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 ${
                      edu3InView ? 'animate-ping' : ''
                    }`}></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  </div>

                  {/* Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-blue-500/30 hover:border-opacity-100 transition-all duration-300">
                      {/* Year Badge */}
                      <div className="absolute -top-4 left-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-sm font-bold shadow-lg">
                        2016
                      </div>

                      {/* Icon */}
                      <div className="absolute -left-4 top-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <FaSchool className="text-2xl" />
                      </div>

                      {/* Content */}
                      <div className="ml-8">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-xl lg:text-2xl font-bold">Secondary (10th Class)</h3>
                          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold">82%</span>
                        </div>
                        <p className="text-blue-400 mb-3">Govt. High Secondary School, Warla</p>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">Foundation years with strong academic performance.</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
                            <span>Science stream foundation</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
                            <span>Active in extracurricular activities</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2018 - LEFT SIDE */}
            <div className="relative w-full flex justify-start mb-24 lg:mb-32">
              <div className="w-full lg:w-1/2 lg:mr-auto lg:pr-12">
                <motion.div
                  ref={refs.edu2}
                  initial="hidden"
                  animate={edu2InView ? "visible" : "hidden"}
                  variants={fadeInLeft}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="absolute right-0 top-12 transform translate-x-1/2 lg:right-[-32px] w-4 h-4 z-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 ${
                      edu2InView ? 'animate-ping' : ''
                    }`}></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                  </div>

                  {/* Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-yellow-500/30 hover:border-opacity-100 transition-all duration-300">
                      {/* Year Badge */}
                      <div className="absolute -top-4 left-6 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-sm font-bold shadow-lg">
                        2018
                      </div>

                      {/* Icon */}
                      <div className="absolute -left-4 top-8 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <FaSchool className="text-2xl" />
                      </div>

                      {/* Content */}
                      <div className="ml-8">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-xl lg:text-2xl font-bold">Higher Secondary (12th Class)</h3>
                          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-semibold">89%</span>
                        </div>
                        <p className="text-yellow-400 mb-3">Govt. Higher Secondary School, Warla</p>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">Mathematics stream with focus on Computer Science.</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2"></span>
                            <span>Mathematics stream</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2"></span>
                            <span>Computer Science specialization</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2022 - RIGHT SIDE */}
            <div className="relative w-full flex justify-end mb-24 lg:mb-32">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pl-12">
                <motion.div
                  ref={refs.edu1}
                  initial="hidden"
                  animate={edu1InView ? "visible" : "hidden"}
                  variants={fadeInRight}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="absolute left-0 top-12 transform -translate-x-1/2 lg:left-[-32px] w-4 h-4 z-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 ${
                      edu1InView ? 'animate-ping' : ''
                    }`}></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  </div>

                  {/* Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-green-500/30 hover:border-opacity-100 transition-all duration-300">
                      {/* Year Badge */}
                      <div className="absolute -top-4 left-6 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-sm font-bold shadow-lg">
                        2022
                      </div>

                      {/* Icon */}
                      <div className="absolute -left-4 top-8 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <FaUniversity className="text-2xl" />
                      </div>

                      {/* Content */}
                      <div className="ml-8">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-xl lg:text-2xl font-bold">B.Tech Computer Science</h3>
                          <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-semibold">8.2 CGPA</span>
                        </div>
                        <p className="text-green-400 mb-3">IPS Academy Indore</p>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">Graduated with specialization in Computer Science and Engineering.</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></span>
                            <span>Major Project: AI-based Recruitment Platform</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></span>
                            <span>Active member of Coding Club</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2023 - LEFT SIDE */}
            <div className="relative w-full flex justify-start mb-24 lg:mb-32">
              <div className="w-full lg:w-1/2 lg:mr-auto lg:pr-12">
                <motion.div
                  ref={refs.job1}
                  initial="hidden"
                  animate={job1InView ? "visible" : "hidden"}
                  variants={fadeInLeft}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="absolute right-0 top-12 transform translate-x-1/2 lg:right-[-32px] w-4 h-4 z-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ${
                      job1InView ? 'animate-ping' : ''
                    }`}></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  </div>

                  {/* Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-purple-500/30 hover:border-opacity-100 transition-all duration-300">
                      {/* Year Badge */}
                      <div className="absolute -top-4 left-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-bold shadow-lg">
                        2023 - 2025
                      </div>

                      {/* Icon */}
                      <div className="absolute -left-4 top-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <SiFlutter className="text-2xl" />
                      </div>

                      {/* Content */}
                      <div className="ml-8">
                        <h3 className="text-xl lg:text-2xl font-bold mb-1">Flutter Developer</h3>
                        <p className="text-purple-400 mb-3">Systos Technology Indore M.P.</p>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">Started as intern, worked on multiple projects. Promoted to full-time role.</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                            <span>Systos Placements - Job platform</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                            <span>Tender Labour - Construction app</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                            <span>Dial-GM Shopping - E-commerce app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* 2025 - RIGHT SIDE */}
            <div className="relative w-full flex justify-end">
              <div className="w-full lg:w-1/2 lg:ml-auto lg:pl-12">
                <motion.div
                  ref={refs.job2}
                  initial="hidden"
                  animate={job2InView ? "visible" : "hidden"}
                  variants={fadeInRight}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <div className="absolute left-0 top-12 transform -translate-x-1/2 lg:left-[-32px] w-4 h-4 z-20">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 ${
                      job2InView ? 'animate-ping' : ''
                    }`}></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-sky-500 to-purple-500"></div>
                  </div>

                  {/* Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-sky-500/30 hover:border-opacity-100 transition-all duration-300">
                      {/* Year Badge */}
                      <div className="absolute -top-4 left-6 px-4 py-2 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full text-sm font-bold shadow-lg">
                        2025 - Present
                      </div>

                      {/* Icon */}
                      <div className="absolute -left-4 top-8 w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <SiFlutter className="text-2xl" />
                      </div>

                      {/* Content */}
                      <div className="ml-8">
                        <h3 className="text-xl lg:text-2xl font-bold mb-1">Sr. Flutter Developer</h3>
                        <p className="text-sky-400 mb-3">I-Engage (PSPL Advertising Private Limited)</p>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-4">Leading Flutter development for OTT platforms and news applications.</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2"></span>
                            <span>VIX Digital - OTT Platform with 50K+ users</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2"></span>
                            <span>CarSee - Car selling platform</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2"></span>
                            <span>Brocr - Property management app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-32"></div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none"/>
            <circle cx="32" cy="32" r="28" stroke="url(#gradient)" strokeWidth="4" fill="none" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - lineHeight / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s' }}
            />
          </svg>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            {Math.round(lineHeight)}%
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
