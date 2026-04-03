import React, { Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SiGithub, SiDart } from 'react-icons/si';
import { FaExternalLinkAlt, FaRocket, FaShieldAlt, FaPlay, FaLayerGroup } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, RoundedBox } from '@react-three/drei';

// Mini 3D Animation for Card Background
const Card3DBackground = ({ color }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[1, 32, 32]} scale={1.5}>
              <MeshDistortMaterial
                color={color}
                speed={3}
                distort={0.4}
                radius={1}
                transparent
                opacity={0.6}
              />
            </Sphere>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

const packages = [
  {
    name: "Bharat Pay Kit",
    description: "A secure, unified payment gateway SDK for Indian merchants. Integrated with UPI, NetBanking, and Card payments with high-level encryption.",
    github: "https://github.com/mahigurjar123/bharat_pay_kit.git",
    pub: "https://pub.dev/packages/bharat_pay_kit",
    icon: FaShieldAlt,
    color: "#38bdf8", // sky-400
    colorName: "from-blue-500 to-cyan-400",
    features: ["Biometric Auth", "UPI Deep-link", "Fraud Detection"]
  },
  {
    name: "OTT Stream Kit",
    description: "High-performance media reproduction engine for Flutter. Supports HLS, Dash, and adaptive bitrate streaming with a customizable player.",
    github: "https://github.com/mahigurjar123/package_ott_stream_kit.git",
    pub: "https://pub.dev/packages/ott_stream_kit",
    icon: FaPlay,
    color: "#a855f7", // purple-500
    colorName: "from-purple-600 to-pink-500",
    features: ["4K Support", "PIP Mode", "DRM Protection"]
  },
  {
    name: "Aura UI Flutter",
    description: "Premium design-oriented UI library with advanced glassmorphism components, layout builders, and hardware-accelerated animations.",
    github: "https://github.com/mahigurjar123/package_aura_ui.git",
    pub: "https://pub.dev/packages/aura_ui_flutter",
    icon: FaLayerGroup,
    color: "#f59e0b", // amber-500
    colorName: "from-amber-500 to-orange-400",
    features: ["Dynamic Themes", "Aura Particles", "Responsive"]
  }
];

const PackageCard = ({ pkg, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(useSpring(y, { stiffness: 100, damping: 20 }), [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 100, damping: 20 }), [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative h-[480px] w-full group"
    >
      {/* 3D Glass Surface Card */}
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 rounded-[40px] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-sky-500/50"
      >
        {/* Dynamic 3D Background */}
        <Card3DBackground color={pkg.color} />

        {/* Content Container */}
        <div style={{ transform: "translateZ(80px)" }} className="relative z-10 p-8 h-full flex flex-col">
          
          {/* Custom Logo/Icon with Glow */}
          <div className="flex justify-between items-start mb-8">
            <div className={`relative px-5 py-5 rounded-3xl bg-gradient-to-br ${pkg.colorName} shadow-2xl shadow-sky-500/20 group-hover:scale-110 transition-transform duration-500`}>
              <pkg.icon className="text-4xl text-white animate-pulse" />
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-zinc-300 uppercase tracking-widest">
                <SiDart className="text-sky-400" />
                Live SDK
              </div>
            </div>
          </div>

          {/* Title & Info */}
          <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-purple-400 transition-all duration-300">
            {pkg.name}
          </h3>
          <div className="h-1 w-12 bg-sky-500 rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
          
          <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-6">
            {pkg.description}
          </p>

          {/* Features Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {pkg.features.map((feat, i) => (
              <span key={i} className="px-3 py-1 rounded-xl bg-zinc-800/80 border border-white/5 text-[10px] font-bold text-zinc-400 group-hover:text-sky-300 transition-colors">
                {feat}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-auto">
            <a 
              href={pkg.pub}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xs shadow-lg hover:shadow-sky-500/30 transition-all active:scale-95"
            >
              <FaExternalLinkAlt size={12} />
              GET PACKAGE
            </a>
            <a 
              href={pkg.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-800 border border-white/10 text-white hover:border-sky-500/50 transition-all active:scale-95 transform hover:rotate-12"
            >
              <SiGithub size={24} />
            </a>
          </div>
        </div>

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
    </motion.div>
  );
};

const Packages = () => {
  return (
    <section id="packages" className="py-32 bg-transparent relative overflow-hidden">
      {/* Background Animated Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            <FaRocket className="animate-bounce" />
            <span>Premium Dev Resources</span>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
            <span className="bg-gradient-to-r from-white via-sky-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
              Open Source
            </span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Highly optimized, production-ready Flutter packages designed for performance, stability, and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Packages;
