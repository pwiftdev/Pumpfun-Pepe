'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTwitter, FaCode, FaRocket, FaPalette, FaStar, FaUserTie, FaCrown } from 'react-icons/fa';
import Image from 'next/image';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  twitter: string;
  icon: any;
  color: string;
  isHighlighted?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Bakardi',
    role: 'Web Developer',
    twitter: 'https://x.com/bakardii01',
    icon: FaCode,
    color: '#00ff41'
  },
  {
    name: 'Bankai',
    role: 'CTO Lead',
    twitter: 'https://x.com/thesnowman_144',
    icon: FaPalette,
    color: '#00d4ff'
  },
  {
    name: 'LOL',
    role: 'CTO Lead',
    twitter: 'https://x.com/lolguyctoX',
    icon: FaCode,
    color: '#ff6b00'
  },
  {
    name: 'Return',
    role: 'CTO Lead',
    twitter: 'https://x.com/BronzeAgePFP',
    icon: FaUserTie,
    color: '#9b59b6'
  }
];

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4"
          >
            <div className="relative w-full max-w-3xl backdrop-blur-2xl bg-gradient-to-br from-[#0a0e17]/60 via-[#15202b]/60 to-[#0a0e17]/60 rounded-2xl border border-[#00ff41]/30 shadow-[0_8px_32px_rgba(0,255,65,0.2)] overflow-hidden max-h-[95vh] overflow-y-auto custom-scrollbar">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 backdrop-blur-xl bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-[#00ff41]" />
              </button>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                    Meet The <span className="text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">Team</span>
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                    The minds behind Pumpfun Pepe
                  </p>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
                  {teamMembers.map((member, index) => {
                    const Icon = member.icon;
                    const isHighlighted = member.isHighlighted;
                    const isCTOLead = member.role === 'CTO Lead';
                    return (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        {/* Highlighted Badge */}
                        {isHighlighted && (
                          <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-1 px-2 sm:px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg">
                            <FaStar className="w-2 h-2 sm:w-3 sm:h-3 text-white animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-bold text-white">LEAD</span>
                            <FaStar className="w-2 h-2 sm:w-3 sm:h-3 text-white animate-pulse" />
                          </div>
                        )}
                        
                        <div 
                          className={`backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/40 to-[#15202b]/40 border rounded-2xl p-4 sm:p-6 transition-all duration-300 h-full flex flex-col relative overflow-hidden group/card ${
                            isHighlighted 
                              ? 'border-yellow-500/40 shadow-[0_4px_20px_rgba(255,215,0,0.2)] hover:border-yellow-500/60 hover:shadow-[0_8px_32px_rgba(255,215,0,0.4)] md:scale-105' 
                              : 'border-[#00ff41]/20 hover:border-[#00ff41]/40 hover:shadow-[0_4px_20px_rgba(0,255,65,0.15)]'
                          }`}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-700" />
                          {/* Profile Picture */}
                          <div className="flex justify-center mb-3 sm:mb-4 relative z-10">
                            <div 
                              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110 backdrop-blur-xl ${
                                isHighlighted 
                                  ? 'ring-2 ring-yellow-500/50 shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
                                  : 'ring-1 ring-[#00ff41]/30 shadow-[0_0_10px_rgba(0,255,65,0.2)]'
                              }`}
                            >
                              <Image 
                                src="/pepeimage.png" 
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                              {/* Icon Badge */}
                              <div 
                                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 p-1.5 sm:p-2 rounded-full transition-all duration-300"
                                style={{ 
                                  backgroundColor: `${member.color}`,
                                  boxShadow: `0 0 10px ${member.color}`
                                }}
                              >
                                <Icon 
                                  className="w-3 h-3 sm:w-4 sm:h-4" 
                                  style={{ color: 'black' }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Name */}
                          <h3 className={`text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2 relative z-10 ${
                            isHighlighted ? 'text-yellow-400' : isCTOLead ? 'text-white' : 'text-white'
                          }`}>
                            {member.name}
                          </h3>

                          {/* Role */}
                          <div className="mb-3 sm:mb-4 flex-grow relative z-10 flex justify-center items-center min-h-[2rem]">
                            {!isCTOLead ? (
                              <p className="text-gray-300 text-center text-xs sm:text-sm">
                                {member.role}
                              </p>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-yellow-500/40 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                                <FaCrown className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs sm:text-sm font-bold text-yellow-400">
                                  CTO LEAD
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Twitter Link */}
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group/btn relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base overflow-hidden ${
                              isHighlighted 
                                ? 'backdrop-blur-xl bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 border border-yellow-500/40 hover:border-yellow-500/60 hover:from-yellow-400/40 hover:to-yellow-600/40 text-yellow-200 shadow-[0_4px_16px_rgba(255,215,0,0.2)]'
                                : 'backdrop-blur-xl bg-gradient-to-br from-[#1DA1F2]/30 to-[#1a8cd8]/30 border border-[#1DA1F2]/40 hover:border-[#1DA1F2]/60 hover:from-[#1DA1F2]/40 hover:to-[#1a8cd8]/40 text-white shadow-[0_4px_16px_rgba(29,161,242,0.2)]'
                            }`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                            <FaTwitter className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
                            <span className="relative z-10">Follow</span>
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="text-center mt-6 sm:mt-8">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Join us in building the future of PFP culture
                  </p>
                </div>
              </div>

              {/* Decorative glow effects */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff41] opacity-10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-[100px] rounded-full pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
