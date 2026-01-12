'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { PROJECT_NAME, TICKER, CONTRACT_ADDRESS } from '@/lib/config';
import StatsModal from './StatsModal';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStatsModal, setShowStatsModal] = useState(false);

  useEffect(() => {
    const fetchPriceChange = async () => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
        );
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          // Try different possible fields for price change percentage
          const change = parseFloat(
            pair.priceChange?.h24 || 
            pair.priceChange24h || 
            pair.priceChange?.percentage24h ||
            '0'
          );
          setPriceChange(change);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching price change:', error);
        setLoading(false);
      }
    };

    fetchPriceChange();
    const interval = setInterval(fetchPriceChange, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPriceChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <>
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-[40px] sm:top-[48px] left-0 right-0 z-[55] backdrop-blur-2xl bg-gradient-to-r from-[#0a0e17]/40 via-[#15202b]/40 to-[#0a0e17]/40 border-b border-[#00ff41]/20 shadow-[0_8px_32px_rgba(0,255,65,0.1)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden backdrop-blur-xl bg-gradient-to-br from-[#00ff41]/20 to-[#00cc34]/20 border border-[#00ff41]/40 shadow-[0_8px_32px_rgba(0,255,65,0.3)] ring-1 ring-[#00ff41]/20">
              <Image
                src="/pepeimage.png"
                alt="Pumpfun Pepe Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight">
                {PROJECT_NAME}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm font-bold text-[#00ff41] leading-tight">
                  {TICKER}
                </p>
                {!loading && priceChange !== null && (
                  <span
                    className={`text-xs sm:text-sm font-bold leading-tight ${
                      priceChange >= 0 ? 'text-[#00ff41]' : 'text-red-500'
                    }`}
                  >
                    {formatPriceChange(priceChange)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stats Button */}
            <button
              onClick={() => setShowStatsModal(true)}
              className="px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-xl bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-500/10 border border-red-500/30 rounded-xl hover:border-red-500/60 hover:bg-gradient-to-br hover:from-red-500/20 hover:via-red-600/20 hover:to-red-500/20 transition-all duration-300 hover:scale-110 shadow-[0_8px_32px_rgba(255,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(255,0,0,0.4)] relative overflow-hidden group"
              aria-label="View statistics"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="text-xs sm:text-sm font-black text-red-500 relative z-10 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] whitespace-nowrap">TOKEN STATS</span>
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={onMenuClick}
              className="p-2 sm:p-3 backdrop-blur-xl bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-500/10 border border-red-500/30 rounded-xl hover:border-red-500/60 hover:bg-gradient-to-br hover:from-red-500/20 hover:via-red-600/20 hover:to-red-500/20 transition-all duration-300 hover:scale-110 shadow-[0_8px_32px_rgba(255,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(255,0,0,0.4)] relative overflow-hidden group"
              aria-label="Toggle sidebar"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <FaBars className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 relative z-10 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>

    {/* Stats Modal - rendered outside header to avoid positioning constraints */}
    <StatsModal isOpen={showStatsModal} onClose={() => setShowStatsModal(false)} />
  </>
  );
}

