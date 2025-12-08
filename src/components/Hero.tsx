'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaXTwitter, FaCopy, FaCheck, FaImage } from 'react-icons/fa6';
import { useState } from 'react';
import { CONTRACT_ADDRESS, TICKER, PROJECT_NAME, X_COMMUNITY_LINK } from '@/lib/config';
import PFPGenerator from './PFPGenerator';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [showPFPGenerator, setShowPFPGenerator] = useState(false);

  const handleCopyCA = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 md:gap-8 max-w-6xl mx-auto">
      {/* Logo/Image */}
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#00ff41] shadow-[0_0_40px_rgba(0,255,65,0.3)]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image 
          src="/pepeimage.png" 
          alt="Pumpfun Pepe" 
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-2 tracking-tight">
          {PROJECT_NAME}
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00ff41] tracking-wider">
          {TICKER}
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white max-w-3xl text-center px-4 font-light leading-relaxed relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {/* Gradient background behind text */}
        <span className="relative z-10">
          Every normie who makes an account starts here. <br className="hidden sm:block" />
          <span className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl">The blank slate. The face of every beginning.</span>
        </span>
        <span 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40 blur-2xl -z-10"
          aria-hidden="true"
        />
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col gap-3 md:gap-4 mt-2 md:mt-4 w-full max-w-2xl px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {/* Top Row - Main Actions */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
          <button
            onClick={handleCopyCA}
            className="group relative px-6 sm:px-8 py-5 sm:py-6 backdrop-blur-2xl bg-gradient-to-br from-[#0a0e17]/50 via-[#15202b]/40 to-[#0a0e17]/50 border border-[#00ff41]/20 rounded-2xl hover:border-[#00ff41]/40 hover:from-[#0a0e17]/70 hover:via-[#15202b]/60 hover:to-[#0a0e17]/70 transition-all duration-500 shadow-[0_0_0_1px_rgba(0,255,65,0.1),0_4px_24px_rgba(0,255,65,0.1)] hover:shadow-[0_0_0_1px_rgba(0,255,65,0.2),0_8px_32px_rgba(0,255,65,0.25)] flex items-center justify-center gap-3 flex-1 overflow-hidden hover:scale-[1.02]"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00ff41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10 flex items-center justify-center gap-3">
              {copied ? (
                <>
                  <div className="p-2 rounded-lg bg-[#00ff41]/10">
                    <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff41]" />
                  </div>
                  <span className="text-[#00ff41] font-semibold text-sm sm:text-base">Copied!</span>
                </>
              ) : (
                <>
                  <div className="p-2 rounded-lg bg-[#00ff41]/10 group-hover:bg-[#00ff41]/20 transition-colors duration-300">
                    <FaCopy className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff41]" />
                  </div>
                  <span className="text-white font-semibold text-sm sm:text-base">Copy Contract</span>
                </>
              )}
            </div>
          </button>

          <button
            onClick={() => setShowPFPGenerator(true)}
            className="group relative px-6 sm:px-8 py-5 sm:py-6 backdrop-blur-2xl bg-gradient-to-br from-[#0a0e17]/50 via-[#15202b]/40 to-[#0a0e17]/50 border border-[#00ff41]/20 rounded-2xl hover:border-[#00ff41]/40 hover:from-[#0a0e17]/70 hover:via-[#15202b]/60 hover:to-[#0a0e17]/70 transition-all duration-500 shadow-[0_0_0_1px_rgba(0,255,65,0.1),0_4px_24px_rgba(0,255,65,0.1)] hover:shadow-[0_0_0_1px_rgba(0,255,65,0.2),0_8px_32px_rgba(0,255,65,0.25)] flex items-center justify-center gap-3 flex-1 overflow-hidden hover:scale-[1.02]"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00ff41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10 flex items-center justify-center gap-3">
              <div className="p-2 rounded-lg bg-[#00ff41]/10 group-hover:bg-[#00ff41]/20 transition-colors duration-300">
                <FaImage className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff41]" />
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">PFP Generator</span>
            </div>
          </button>

          <a
            href={X_COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 sm:px-8 py-5 sm:py-6 backdrop-blur-2xl bg-gradient-to-br from-[#0a0e17]/50 via-[#15202b]/40 to-[#0a0e17]/50 border border-[#00ff41]/20 rounded-2xl hover:border-[#00ff41]/40 hover:from-[#0a0e17]/70 hover:via-[#15202b]/60 hover:to-[#0a0e17]/70 transition-all duration-500 shadow-[0_0_0_1px_rgba(0,255,65,0.1),0_4px_24px_rgba(0,255,65,0.1)] hover:shadow-[0_0_0_1px_rgba(0,255,65,0.2),0_8px_32px_rgba(0,255,65,0.25)] flex items-center justify-center gap-3 flex-1 overflow-hidden hover:scale-[1.02]"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00ff41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10 flex items-center justify-center gap-3">
              <div className="p-2 rounded-lg bg-[#00ff41]/10 group-hover:bg-[#00ff41]/20 transition-colors duration-300">
                <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff41]" />
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">Join Community</span>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Contract Address Display */}
      <motion.div
        className="mt-6 md:mt-10 px-6 sm:px-8 py-4 sm:py-5 backdrop-blur-2xl bg-gradient-to-br from-[#0a0e17]/50 via-[#15202b]/50 to-[#0a0e17]/50 border border-[#00ff41]/20 rounded-2xl shadow-[0_4px_20px_rgba(0,255,65,0.1)] max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-[#00ff41]/70 text-xs uppercase tracking-widest mb-3 text-center font-semibold">Contract Address</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-white font-mono text-xs sm:text-sm md:text-base break-all text-center select-all">
            {CONTRACT_ADDRESS}
          </p>
        </div>
      </motion.div>

      {/* PFP Generator Modal */}
      {showPFPGenerator && (
        <PFPGenerator onClose={() => setShowPFPGenerator(false)} />
      )}
    </div>
  );
}

