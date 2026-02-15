import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiAndroidstudio,
  SiPostman,
  SiGit
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from 'react-icons/fa';

const Skills = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
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
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Skills data based on your resume
  const skillCategories = [
    {
      title: "Languages",
      icon: "💻",
      gradient: "from-sky-400 to-blue-500",
      skills: [
        { name: "Dart", icon: SiDart, level: 95, color: "text-sky-400" },
        { name: "C", icon: null, level: 75, color: "text-blue-400" },
        { name: "JavaScript", icon: FaJsSquare, level: 85, color: "text-yellow-500" },
        { name: "C++", icon: null, level: 75, color: "text-blue-600" },
      ]
    },
    {
      title: "Mobile Development",
      icon: "📱",
      gradient: "from-purple-400 to-pink-500",
      skills: [
        { name: "Flutter", icon: SiFlutter, level: 98, color: "text-sky-400" },
        { name: "Dart", icon: SiDart, level: 95, color: "text-sky-400" },
        { name: "Android Studio", icon: SiAndroidstudio, level: 92, color: "text-green-500" },
        { name: "Firebase", icon: SiFirebase, level: 90, color: "text-yellow-500" }
      ]
    },
    {
      title: "State Management",
      icon: "⚙️",
      gradient: "from-green-400 to-emerald-500",
      skills: [
        { name: "BLoC", icon: null, level: 98, color: "text-blue-400" },
        { name: "GetX", icon: null, level: 98, color: "text-blue-400" },
        { name: "Provider", icon: null, level: 92, color: "text-purple-400" },
        { name: "Riverpod", icon: null, level: 88, color: "text-pink-400" }
      ]
    },
    {
      title: "Backend & APIs",
      icon: "🔌",
      gradient: "from-yellow-400 to-orange-500",
      skills: [
        { name: "REST APIs", icon: TbApi, level: 95, color: "text-purple-400" },
        { name: "Firebase", icon: SiFirebase, level: 90, color: "text-yellow-500" },
      ]
    },
    {
      title: "Web Technologies",
      icon: "🌐",
      gradient: "from-red-400 to-rose-500",
      skills: [
        { name: "HTML5", icon: FaHtml5, level: 85, color: "text-orange-500" },
        { name: "CSS3", icon: FaCss3Alt, level: 85, color: "text-blue-500" },
        { name: "JavaScript", icon: FaJsSquare, level: 85, color: "text-yellow-500" },
        { name: "React", icon: FaReact, level: 75, color: "text-sky-400" }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: "🛠️",
      gradient: "from-indigo-400 to-purple-500",
      skills: [
        { name: "VS Code", icon: null, level: 95, color: "text-blue-400" },
        { name: "Android Studio", icon: SiAndroidstudio, level: 92, color: "text-green-500" },
        { name: "Git", icon: SiGit, level: 90, color: "text-orange-500" },
        { name: "Postman", icon: SiPostman, level: 92, color: "text-orange-500" },
        { name: "Windows", icon: null, level: 95, color: "text-blue-400" }
      ]
    }
  ];

  // Proficiency indicator component
  const ProficiencyIndicator = ({ level }) => {
    const dots = 5;
    const filledDots = Math.round(level / 20);

    return (
      <div className="flex gap-1 mt-3 justify-center">
        {[...Array(dots)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              i < filledDots
                ? 'bg-gradient-to-r from-sky-400 to-purple-400'
                : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-zinc-50 py-20 lg:py-24 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-40 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-sky-400 bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
              My Skills
            </span>
          </h2>
          <div className="relative inline-block">
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-purple-500 mx-auto rounded-full"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {skillCategories.map((category, categoryIdx) => (
            <motion.div
              key={categoryIdx}
              variants={fadeInUp}
              className="relative"
            >
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  <span>{category.icon}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold">
                  <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                    {category.title}
                  </span>
                </h3>
                <div className={`flex-1 h-0.5 bg-gradient-to-r ${category.gradient} opacity-30`}></div>
              </div>

              {/* Skills Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={scaleIn}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>

                    {/* Card */}
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm p-5 lg:p-6 rounded-xl border border-white/5 group-hover:border-white/10 transition-all duration-300">
                      {/* Icon Container with Floating Animation */}
                      <div className="relative mb-3">
                        <div className={`absolute inset-0 ${skill.color} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300`}></div>
                        <div className={`flex items-center justify-center text-3xl lg:text-4xl ${skill.color} group-hover:scale-110 transition-transform duration-300 animate-float`}>
                          {skill.icon ? (
                            <skill.icon />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold">
                              {skill.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skill Name */}
                      <h4 className="text-sm lg:text-base font-semibold text-center text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {skill.name}
                      </h4>

                      {/* Proficiency Indicator */}
                      <ProficiencyIndicator level={skill.level} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Spacer */}
        <div className="h-20"></div>
      </div>

      {/* Floating Particles for Premium Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-sky-500/30 to-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 30, -30, 30],
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;