'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGamepad, FaFileAlt, FaExternalLinkAlt, FaBullhorn, FaCoins } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { CONTRACT_ADDRESS, JUPITER_LINK, DEXTOOLS_LINK, DEXSCREENER_LINK } from '@/lib/config';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  const exchanges = [
    {
      name: 'MEXC',
      href: 'https://www.mexc.com/exchange/PFP_USDT',
      icon: '/mexclogo.png',
      iconType: 'image' as const,
    },
    {
      name: 'Moonshot',
      href: 'https://moonshot.com/5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump',
      icon: '/moonshot_light.png',
      iconType: 'image' as const,
    },
    {
      name: 'Jupiter',
      href: JUPITER_LINK,
      icon: '/jupiterlogo.png',
      iconType: 'image' as const,
    },
  ];

  const screeners = [
    {
      name: 'DexScreener',
      href: DEXSCREENER_LINK,
      icon: '/dexlogo.jpg',
      iconType: 'image' as const,
    },
    {
      name: 'DexTools',
      href: DEXTOOLS_LINK,
      icon: '/dextoolslogo.svg',
      iconType: 'image' as const,
    },
    {
      name: 'CoinMarketCap',
      href: 'https://dex.coinmarketcap.com/token/solana/5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump/',
      icon: '/cmclogo.jpeg',
      iconType: 'image' as const,
    },
    {
      name: 'CoinGecko',
      href: 'https://www.coingecko.com/en/coins/pumpfun-pepe',
      icon: '/coingeckologo.png',
      iconType: 'image' as const,
    },
  ];

  const memes = [
    {
      name: 'Meme Depot',
      href: 'https://memedepot.com/d/pumpfun-pepe',
      icon: null,
      iconType: 'svg' as const,
    },
  ];

  const links = [
    {
      name: 'Bagwork',
      href: 'https://t.co/Z2FJd40QMQ',
      icon: 'bullhorn' as const,
    },
    {
      name: 'Staking',
      href: 'https://www.solsuite.io/pumpfunpepe',
      icon: 'coins' as const,
    },
    {
      name: 'Staking GEN2',
      href: 'https://t.co/XB5L04rCYK',
      icon: 'coins' as const,
    },
  ];

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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 sm:w-96 backdrop-blur-2xl bg-gradient-to-b from-[#0a0e17]/25 via-[#15202b]/25 to-[#0a0e17]/25 border-r border-[#00ff41]/20 shadow-[0_8px_32px_rgba(0,255,65,0.15)] z-[101] overflow-y-auto custom-scrollbar"
            >
              {/* Header */}
              <div className="sticky top-0 backdrop-blur-xl bg-gradient-to-r from-[#0a0e17]/30 via-[#15202b]/30 to-[#0a0e17]/30 border-b border-[#00ff41]/15 p-4 flex items-center justify-between">
                <h2 className="text-xl font-black text-white">Quick Links</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#00ff41]/10 rounded-lg transition-all duration-200 hover:rotate-90"
                >
                  <FaTimes className="w-5 h-5 text-gray-400 hover:text-[#00ff41]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Quick Actions */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h3>
                  
                  <Link
                    href="/pacman"
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl hover:border-[#00ff41]/40 hover:bg-gradient-to-br hover:from-[#00ff41]/8 hover:to-[#00cc34]/8 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,255,65,0.08)] hover:shadow-[0_4px_16px_rgba(0,255,65,0.25)] relative overflow-hidden"
                  >
                    <FaGamepad className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-white font-semibold">Play Game</span>
                  </Link>

                  <a
                    href="/Pfp Whitepaper.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl hover:border-[#00ff41]/40 hover:bg-gradient-to-br hover:from-[#00ff41]/8 hover:to-[#00cc34]/8 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,255,65,0.08)] hover:shadow-[0_4px_16px_rgba(0,255,65,0.25)] relative overflow-hidden"
                  >
                    <FaFileAlt className="w-5 h-5 text-[#00ff41] group-hover:text-[#00cc34]" />
                    <span className="text-white font-semibold">Whitepaper</span>
                    <FaExternalLinkAlt className="w-3 h-3 text-gray-500 ml-auto" />
                  </a>
                </div>

                {/* Links */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Links</h3>
                  
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl hover:border-[#00ff41]/40 hover:bg-gradient-to-br hover:from-[#00ff41]/8 hover:to-[#00cc34]/8 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,255,65,0.08)] hover:shadow-[0_4px_16px_rgba(0,255,65,0.25)] relative overflow-hidden"
                    >
                      {link.icon === 'bullhorn' ? (
                        <FaBullhorn className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                      ) : link.icon === 'coins' ? (
                        <FaCoins className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                      ) : null}
                      <span className="text-white font-semibold">{link.name}</span>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-500 ml-auto" />
                    </a>
                  ))}
                </div>

                {/* Exchanges */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Exchanges</h3>
                  
                  {exchanges.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/40 to-[#15202b]/40 border border-[#00ff41]/20 rounded-xl hover:border-[#00ff41]/50 hover:bg-gradient-to-br hover:from-[#00ff41]/10 hover:to-[#00cc34]/10 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,255,65,0.1)] hover:shadow-[0_4px_16px_rgba(0,255,65,0.3)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      {link.iconType === 'image' && link.icon ? (
                        <div className="relative w-6 h-6 flex-shrink-0 z-10">
                          <Image
                            src={link.icon}
                            alt={link.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : null}
                      <span className="text-white font-semibold flex-1 z-10">{link.name}</span>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-500 group-hover:text-[#00ff41] z-10" />
                    </a>
                  ))}
                </div>

                {/* Screeners */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Screeners</h3>
                  
                  {screeners.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/40 to-[#15202b]/40 border border-[#00ff41]/20 rounded-xl hover:border-[#00ff41]/50 hover:bg-gradient-to-br hover:from-[#00ff41]/10 hover:to-[#00cc34]/10 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,255,65,0.1)] hover:shadow-[0_4px_16px_rgba(0,255,65,0.3)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      {link.iconType === 'image' && link.icon ? (
                        <div className="relative w-6 h-6 flex-shrink-0 z-10">
                          <Image
                            src={link.icon}
                            alt={link.name}
                            fill
                            className={link.name === 'DexScreener' ? 'object-contain rounded' : 'object-contain'}
                          />
                        </div>
                      ) : null}
                      <span className="text-white font-semibold flex-1 z-10">{link.name}</span>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-500 group-hover:text-[#00ff41] z-10" />
                    </a>
                  ))}
                </div>

                {/* Memes */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Memes</h3>
                  
                  {memes.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/40 to-[#15202b]/40 border border-[#00ff41]/20 rounded-xl hover:border-[#00ff41]/50 hover:bg-gradient-to-br hover:from-[#00ff41]/10 hover:to-[#00cc34]/10 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,255,65,0.1)] hover:shadow-[0_4px_16px_rgba(0,255,65,0.3)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      {link.iconType === 'svg' ? (
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center z-10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-400 group-hover:text-[#00ff41]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                      ) : null}
                      <span className="text-white font-semibold flex-1 z-10">{link.name}</span>
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-500 group-hover:text-[#00ff41] z-10" />
                    </a>
                  ))}
                </div>

                {/* Contract Address */}
                <div className="mt-6 p-4 backdrop-blur-xl bg-gradient-to-br from-[#0a0e17]/20 to-[#15202b]/20 border border-[#00ff41]/15 rounded-xl shadow-[0_4px_16px_rgba(0,255,65,0.08)]">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Contract Address</p>
                  <p className="text-white font-mono text-xs break-all">{CONTRACT_ADDRESS}</p>
                </div>
              </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

