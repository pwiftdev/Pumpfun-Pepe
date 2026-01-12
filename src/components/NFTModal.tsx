'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRocket } from 'react-icons/fa';

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NFTModal({ isOpen, onClose }: NFTModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17] rounded-2xl border-2 border-[#00ff41] shadow-[0_0_50px_rgba(0,255,65,0.3)] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-[#00ff41]" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Header */}
                <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-8">
                  NFT Collections
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* PFP GEN2 Card */}
                  <motion.a
                    href="https://magiceden.io/marketplace/pfp_gen2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative border-2 border-[#00ff41]/40 rounded-xl p-6 hover:border-[#00ff41] transition-all duration-300 hover:scale-105 overflow-hidden min-h-[280px]"
                    style={{
                      backgroundImage: 'url(/pfpgen2.jpeg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/60 transition-all duration-300" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/10 to-[#00ff41]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-black text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">PFP GEN2</h3>
                          <FaRocket className="w-6 h-6 text-[#00ff41] group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                        </div>
                        <p className="text-gray-200 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          The next generation of PFP NFTs
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[#00ff41] font-bold drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
                        <span>Trade Now</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff41] opacity-10 blur-[60px] rounded-full pointer-events-none" />
                  </motion.a>

                  {/* PFP OG Card */}
                  <motion.a
                    href="https://magiceden.io/marketplace/pumpfun_pepe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative border-2 border-[#00ff41]/40 rounded-xl p-6 hover:border-[#00ff41] transition-all duration-300 hover:scale-105 overflow-hidden min-h-[280px]"
                    style={{
                      backgroundImage: 'url(/pfpog.avif)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/60 transition-all duration-300" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/10 to-[#00ff41]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-black text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">PFP OG</h3>
                          <FaRocket className="w-6 h-6 text-[#00ff41] group-hover:translate-x-1 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
                        </div>
                        <p className="text-gray-200 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          The original Pumpfun Pepe collection
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[#00ff41] font-bold drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
                        <span>Trade Now</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ff41] opacity-10 blur-[60px] rounded-full pointer-events-none" />
                  </motion.a>
                </div>
              </div>

              {/* Decorative glow effects */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00ff41] opacity-20 blur-[100px] rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
