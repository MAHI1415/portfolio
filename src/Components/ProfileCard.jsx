import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaAndroid, FaApple } from 'react-icons/fa';
import { SiFlutter, SiReact } from 'react-icons/si';

const ProfileCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 sm:p-8 border border-white/10 shadow-2xl">

        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <img
             src={process.env.PUBLIC_URL + '/images/mahendra31.png'}
            alt="Mahendra Gurjar"
            className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto object-cover border-4 border-white/10 ring-2 ring-sky-500/50"
          />
        </div>

        {/* Name & Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Mahendra Gurjar
          </h2>
          <p className="text-sky-400 font-medium text-sm sm:text-base uppercase tracking-wider">
            Cross-Platform Expert
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-sky-500/10 rounded-lg p-3 flex items-center gap-2 border border-white/5 hover:border-sky-500/50 transition-all duration-300">
            <SiFlutter className="text-sky-400 text-lg" />
            <span className="text-sm text-zinc-300">Flutter</span>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-3 flex items-center gap-2 border border-white/5 hover:border-purple-500/50 transition-all duration-300">
            <SiReact className="text-purple-400 text-lg" />
            <span className="text-sm text-zinc-300">React Native</span>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 flex items-center gap-2 border border-white/5 hover:border-green-500/50 transition-all duration-300">
            <FaAndroid className="text-green-400 text-lg" />
            <span className="text-sm text-zinc-300">Android</span>
          </div>
          <div className="bg-gray-500/10 rounded-lg p-3 flex items-center gap-2 border border-white/5 hover:border-gray-400/50 transition-all duration-300">
            <FaApple className="text-gray-400 text-lg" />
            <span className="text-sm text-zinc-300">iOS</span>
          </div>
        </div>

        {/* Quote */}
        <div className="relative mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="absolute -top-2 left-4 text-3xl text-sky-500/30">"</div>
          <p className="text-sm sm:text-base text-zinc-300 italic text-center">
            Transforming ideas into seamless experiences across every platform
          </p>
          <div className="absolute -bottom-2 right-4 text-3xl text-purple-500/30 rotate-180">"</div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3">
          <a href="https://github.com/mahigurjar123" target="_blank" rel="noreferrer"
             className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
            <FaGithub className="w-4 h-4 text-zinc-400 hover:text-white" />
          </a>
          <a href="https://linkedin.com/in/mahendra121" target="_blank" rel="noreferrer"
             className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
            <FaLinkedin className="w-4 h-4 text-zinc-400 hover:text-blue-500" />
          </a>
          <a href="https://instagram.com/m.gurjar131" target="_blank" rel="noreferrer"
             className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
            <FaInstagram className="w-4 h-4 text-zinc-400 hover:text-pink-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"
             className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
            <FaTwitter className="w-4 h-4 text-zinc-400 hover:text-blue-400" />
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default ProfileCard;