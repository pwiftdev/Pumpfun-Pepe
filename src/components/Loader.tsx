'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface LoaderProps {
  isLoading: boolean;
  onSkip?: () => void;
}

export default function Loader({ isLoading, onSkip }: LoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isLoading && videoRef.current) {
      // Ensure video plays when loader is shown
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  }, [isLoading]);

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const handleVideoEnd = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Video Container - Full Viewport */}
            <div className="absolute inset-0 w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                onLoadedData={handleVideoLoaded}
              >
                <source src="/PFP_NFT.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Dim overlay */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Center Bottom Overlay */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-center">
              <motion.p
                className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                One step closer to The <span className="text-[#00ff41] font-bold">$PFP Legacy</span>.
              </motion.p>
              <motion.p
                className="text-[#00ff41] text-2xl sm:text-3xl md:text-4xl font-black tracking-wider drop-shadow-[0_0_12px_rgba(0,255,65,0.8)] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                PFP GEN 2
              </motion.p>
              
              {/* Trade Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                <a
                  href="https://magiceden.io/marketplace/pfp_gen2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 backdrop-blur-xl bg-gradient-to-br from-[#00ff41]/30 via-[#00cc34]/30 to-[#00ff41]/30 border border-[#00ff41]/40 rounded-lg transition-all duration-300 hover:scale-105 hover:border-[#00ff41]/60 overflow-hidden shadow-[0_8px_32px_rgba(0,255,65,0.3)] hover:shadow-[0_8px_32px_rgba(0,255,65,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 text-[#00ff41] font-black text-base sm:text-lg drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
                    Trade GEN2
                  </span>
                </a>
                <a
                  href="https://magiceden.io/marketplace/pumpfun_pepe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 backdrop-blur-xl bg-gradient-to-br from-[#00ff41]/30 via-[#00cc34]/30 to-[#00ff41]/30 border border-[#00ff41]/40 rounded-lg transition-all duration-300 hover:scale-105 hover:border-[#00ff41]/60 overflow-hidden shadow-[0_8px_32px_rgba(0,255,65,0.3)] hover:shadow-[0_8px_32px_rgba(0,255,65,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 text-[#00ff41] font-black text-base sm:text-lg drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
                    Trade OG
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Trailer Button - Top Right - Outside container for proper positioning */}
      {isLoading && (
        <motion.button
          onClick={handleSkip}
          style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 10000 }}
          className="px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl bg-gradient-to-br from-[#00ff41]/20 via-[#00cc34]/20 to-[#00ff41]/20 border border-[#00ff41]/40 hover:border-[#00ff41]/60 rounded-lg transition-all duration-300 hover:scale-105 group shadow-[0_8px_32px_rgba(0,255,65,0.3)] hover:shadow-[0_8px_32px_rgba(0,255,65,0.5)] relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <div className="flex items-center gap-2 relative z-10">
            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff41] group-hover:text-[#00cc34] transition-colors duration-300" />
            <span className="text-white font-semibold text-sm sm:text-base group-hover:text-[#00ff41] transition-colors duration-300">
              Skip Trailer
            </span>
          </div>
        </motion.button>
      )}
    </>
  );
}

