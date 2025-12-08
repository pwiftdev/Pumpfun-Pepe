'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes, FaChartLine, FaDollarSign, FaUsers, FaExchangeAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { CONTRACT_ADDRESS } from '@/lib/config';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TokenStats {
  price: number;
  priceChange24h: number;
  priceChange5m: number;
  priceChange1h: number;
  priceChange6h: number;
  marketCap: number;
  fdv: number;
  volume24h: number;
  volume5m: number;
  volume1h: number;
  volume6h: number;
  liquidity: number;
  pairCreatedAt: number;
  txns24h: {
    buys: number;
    sells: number;
  };
  dexId: string;
  pairAddress: string;
}

export default function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
        );
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setStats({
            price: parseFloat(pair.priceUsd || 0),
            priceChange24h: parseFloat(pair.priceChange?.h24 || pair.priceChange24h || 0),
            priceChange5m: parseFloat(pair.priceChange?.m5 || 0),
            priceChange1h: parseFloat(pair.priceChange?.h1 || 0),
            priceChange6h: parseFloat(pair.priceChange?.h6 || 0),
            marketCap: parseFloat(pair.marketCap || pair.fdv || 0),
            fdv: parseFloat(pair.fdv || pair.marketCap || 0),
            volume24h: parseFloat(pair.volume?.h24 || 0),
            volume5m: parseFloat(pair.volume?.m5 || 0),
            volume1h: parseFloat(pair.volume?.h1 || 0),
            volume6h: parseFloat(pair.volume?.h6 || 0),
            liquidity: parseFloat(pair.liquidity?.usd || 0),
            pairCreatedAt: pair.pairCreatedAt || 0,
            txns24h: {
              buys: pair.txns?.h24?.buys || 0,
              sells: pair.txns?.h24?.sells || 0,
            },
            dexId: pair.dexId || 'Unknown',
            pairAddress: pair.pairAddress || '',
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isOpen]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toFixed(0);
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 md:w-[500px] lg:w-[600px] backdrop-blur-2xl bg-gradient-to-b from-[#0a0e17]/25 via-[#15202b]/25 to-[#0a0e17]/25 border-l border-[#00ff41]/20 shadow-[0_8px_32px_rgba(0,255,65,0.15)] z-[101] overflow-y-auto custom-scrollbar"
          >
              {/* Header */}
              <div className="sticky top-0 backdrop-blur-xl bg-gradient-to-r from-[#0a0e17]/30 via-[#15202b]/30 to-[#0a0e17]/30 border-b border-[#00ff41]/15 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-[#00ff41]" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Token <span className="text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">Stats</span>
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#00ff41]/10 rounded-lg transition-all duration-200 hover:rotate-90"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 hover:text-[#00ff41]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-[#00ff41]/30 border-t-[#00ff41] rounded-full animate-spin" />
                  </div>
                ) : stats ? (
                  <div className="space-y-4">
                    {/* Price Section */}
                    <div className="backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl p-4">
                      <h3 className="text-base sm:text-lg font-bold text-[#00ff41] mb-3 flex items-center gap-2">
                        <FaDollarSign className="w-4 h-4" />
                        Price Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Current Price</p>
                          <p className="text-white text-lg sm:text-xl font-bold">
                            ${stats.price.toFixed(8)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">24h Change</p>
                          <div className={`flex items-center gap-2 ${stats.priceChange24h >= 0 ? 'text-[#00ff41]' : 'text-red-500'}`}>
                            {stats.priceChange24h >= 0 ? (
                              <FaArrowUp className="w-4 h-4" />
                            ) : (
                              <FaArrowDown className="w-4 h-4" />
                            )}
                            <p className="text-lg sm:text-xl font-bold">
                              {stats.priceChange24h >= 0 ? '+' : ''}{stats.priceChange24h.toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-[#00ff41]/10">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">5m</p>
                          <p className={`text-sm font-semibold ${stats.priceChange5m >= 0 ? 'text-[#00ff41]' : 'text-red-500'}`}>
                            {stats.priceChange5m >= 0 ? '+' : ''}{stats.priceChange5m.toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">1h</p>
                          <p className={`text-sm font-semibold ${stats.priceChange1h >= 0 ? 'text-[#00ff41]' : 'text-red-500'}`}>
                            {stats.priceChange1h >= 0 ? '+' : ''}{stats.priceChange1h.toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">6h</p>
                          <p className={`text-sm font-semibold ${stats.priceChange6h >= 0 ? 'text-[#00ff41]' : 'text-red-500'}`}>
                            {stats.priceChange6h >= 0 ? '+' : ''}{stats.priceChange6h.toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">24h</p>
                          <p className={`text-sm font-semibold ${stats.priceChange24h >= 0 ? 'text-[#00ff41]' : 'text-red-500'}`}>
                            {stats.priceChange24h >= 0 ? '+' : ''}{stats.priceChange24h.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Market Cap & Volume */}
                    <div className="space-y-4">
                      <div className="backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl p-4">
                        <h3 className="text-base sm:text-lg font-bold text-[#00ff41] mb-3 flex items-center gap-2">
                          <FaUsers className="w-4 h-4" />
                          Market Data
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">Market Cap</span>
                            <span className="text-white text-sm font-bold">
                              {formatCurrency(stats.marketCap)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">FDV</span>
                            <span className="text-white text-sm font-bold">
                              {formatCurrency(stats.fdv)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">Liquidity</span>
                            <span className="text-white text-sm font-bold">
                              {formatCurrency(stats.liquidity)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl p-4">
                        <h3 className="text-base sm:text-lg font-bold text-[#00ff41] mb-3 flex items-center gap-2">
                          <FaExchangeAlt className="w-4 h-4" />
                          Volume
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">24h Volume</span>
                            <span className="text-white text-sm font-bold">
                              {formatCurrency(stats.volume24h)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">1h Volume</span>
                            <span className="text-white text-xs font-semibold">
                              {formatCurrency(stats.volume1h)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">6h Volume</span>
                            <span className="text-white text-xs font-semibold">
                              {formatCurrency(stats.volume6h)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transactions & Info */}
                    <div className="space-y-4">
                      <div className="backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl p-4">
                        <h3 className="text-base sm:text-lg font-bold text-[#00ff41] mb-3">24h Transactions</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">Buys</span>
                            <span className="text-[#00ff41] font-bold text-sm">
                              {formatNumber(stats.txns24h.buys)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">Sells</span>
                            <span className="text-red-500 font-bold text-sm">
                              {formatNumber(stats.txns24h.sells)}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-[#00ff41]/10">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 text-xs font-semibold">Total</span>
                              <span className="text-white font-bold text-sm">
                                {formatNumber(stats.txns24h.buys + stats.txns24h.sells)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl p-4">
                        <h3 className="text-base sm:text-lg font-bold text-[#00ff41] mb-3">Pair Information</h3>
                        <div className="space-y-2">
                          <div>
                            <p className="text-gray-400 text-xs mb-1">DEX</p>
                            <p className="text-white text-xs font-semibold capitalize">
                              {stats.dexId}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Created</p>
                            <p className="text-white text-xs font-semibold">
                              {formatDate(stats.pairCreatedAt)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs mb-1">Pair Address</p>
                            <p className="text-white text-[10px] font-mono break-all">
                              {stats.pairAddress || CONTRACT_ADDRESS}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">Unable to load statistics</p>
                  </div>
                )}
              </div>

              {/* Decorative glow effects */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#00ff41] opacity-10 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#00ff41] opacity-10 blur-[100px] rounded-full pointer-events-none" />
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

