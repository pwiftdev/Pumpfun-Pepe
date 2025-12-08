'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CONTRACT_ADDRESS } from '@/lib/config';

interface TokenData {
  price: number;
  marketCap: number;
}

export default function MarketCapTracker() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
        );
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setTokenData({
            price: parseFloat(pair.priceUsd),
            marketCap: parseFloat(pair.marketCap || pair.fdv || 0),
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching token data:', error);
        setLoading(false);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  if (loading || !tokenData) {
    return null;
  }

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#00ff41]/20 to-[#00cc34]/20 border-2 border-[#00ff41] backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,65,0.5)] flex items-center justify-center"
        initial={{ 
          x: '10vw', 
          y: '20vh' 
        }}
        animate={{
          x: [
            '10vw', '85vw', '15vw', '75vw', '25vw', '80vw', '20vw', '70vw', '10vw'
          ],
          y: [
            '20vh', '15vh', '80vh', '25vh', '75vh', '30vh', '70vh', '35vh', '20vh'
          ],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#00ff41] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-2">
          <p className="text-[#00ff41] font-black text-xs sm:text-sm md:text-base leading-tight">
            {formatMarketCap(tokenData.marketCap)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

