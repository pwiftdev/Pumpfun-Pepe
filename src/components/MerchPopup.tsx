'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingBag } from 'react-icons/fa';
import Image from 'next/image';

interface MerchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MerchPopup({ isOpen, onClose }: MerchPopupProps) {
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div className="relative max-w-md w-full overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-10 p-2 backdrop-blur-xl bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <FaTimes className="w-4 h-4 text-white group-hover:text-[#00ff41]" />
              </button>

              {/* Content */}
              <div className="p-0">
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src="/merchpopup.png"
                    alt="Merch Popup"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Discount Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 sm:p-8">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-[#00ff41] mb-2 drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
                      10% Discount on ALL Items!
                    </h2>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://pfpmerch.fun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="group relative w-full px-6 py-4 backdrop-blur-xl bg-gradient-to-br from-[#00ff41]/30 via-[#00cc34]/30 to-[#00ff41]/30 border border-[#00ff41]/40 rounded-xl hover:border-[#00ff41]/60 hover:from-[#00ff41]/40 hover:via-[#00cc34]/40 hover:to-[#00ff41]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,65,0.3)] hover:shadow-[0_8px_32px_rgba(0,255,65,0.5)] flex items-center justify-center gap-3 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <FaShoppingBag className="w-5 h-5 text-[#00ff41] relative z-10" />
                    <span className="text-black font-bold text-base sm:text-lg relative z-10">Shop Now</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

