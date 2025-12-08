'use client';

import FloatingComment from '@/components/FloatingComment';
import Hero from '@/components/Hero';
import CursorTrail from '@/components/CursorTrail';
import Loader from '@/components/Loader';
import MarketCapTracker from '@/components/MarketCapTracker';
import NFTModal from '@/components/NFTModal';
import TeamModal from '@/components/TeamModal';
import MerchPopup from '@/components/MerchPopup';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useMemo, useState, useEffect } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const normieComments = [
  "This sends",
  "dex not paid",
  "farm",
  "dev will rug",
  "next PEPE",
  "HODL",
  "100 mil is possible",
  "Programmed by pumpfun fyi",
  "bond it",
  "70% bundle",
  "SEND IT",
  "4 % trim",
  "Let's go guys",
  "gud tek tbh",
  "Sendor",
  "higher",
  "Rug?",
  "This is bullish and alon posted",
  "FARM",
  "dex paid ?",
  "to the moon",
  "wen lambo",
];

// Generate random 6-character alphanumeric string (like SOL address start)
const generateRandomAddress = () => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate random likes count
const generateRandomLikes = () => {
  return Math.floor(Math.random() * 50) + 1; // 1-50 likes
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showMerchPopup, setShowMerchPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hide loader after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Set mounted state to true only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show merch popup 10 seconds after page loads
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowMerchPopup(true);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Generate comment props once on mount to avoid hydration issues
  const comments = useMemo(() => {
    // Only generate comments on client side
    if (!mounted) return [];
    
    // Show fewer comments on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const commentsToShow = isMobile ? normieComments.slice(0, 10) : normieComments;
    
    return commentsToShow.map((comment, index) => ({
      text: comment,
      username: generateRandomAddress(),
      likes: generateRandomLikes(),
      delay: (index * 1.5) % 15, // Stagger delays
      duration: 8 + Math.random() * 4, // Random duration between 8-12s
      startX: Math.random() * 80 + 5, // Random X position (5-85%)
      startY: Math.random() * 80 + 5, // Random Y position (5-85%)
    }));
  }, [mounted]);

  return (
    <>
      <Loader isLoading={isLoading} />
      
      {/* NFT Collection Modal */}
      <NFTModal isOpen={showNFTModal} onClose={() => setShowNFTModal(false)} />
      
      {/* Team Modal */}
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />

      {/* Merch Popup */}
      <MerchPopup isOpen={showMerchPopup} onClose={() => setShowMerchPopup(false)} />
      
      {/* PFP Merch Banner - Fixed at Top */}
      <a
        href="https://pfpmerch.fun/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60 }}
        className="py-2 sm:py-3 px-4 text-center flex items-center justify-center gap-2 backdrop-blur-xl bg-gradient-to-r from-[#00ff41]/20 via-[#00cc34]/20 to-[#00ff41]/20 border-b border-[#00ff41]/30 shadow-[0_8px_32px_rgba(0,255,65,0.2)] hover:shadow-[0_8px_32px_rgba(0,255,65,0.4)] transition-all duration-300 relative overflow-hidden group"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/30 to-[#00ff41]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <span className="relative z-10 text-[#00ff41] font-black text-sm sm:text-base drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">
          <FaShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse inline-block mr-2" />
          PFP Merch - Get Yours Now
          <span className="hidden sm:inline ml-2">→</span>
        </span>
      </a>

      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Floating Market Cap Tracker */}
      <MarketCapTracker />

      {/* Fixed Team Button - Bottom Left */}
      <button
        onClick={() => setShowTeamModal(true)}
        className="fixed bottom-6 left-6 z-50 group"
        title="Meet the Team"
      >
        <div className="relative px-5 py-3 backdrop-blur-xl bg-gradient-to-br from-[#ff00ff]/30 via-[#cc00cc]/30 to-[#ff00ff]/30 border border-[#ff00ff]/40 rounded-full shadow-[0_8px_32px_rgba(255,0,255,0.3)] hover:shadow-[0_8px_32px_rgba(255,0,255,0.5)] transition-all duration-300 hover:scale-110 hover:border-[#ff00ff]/60 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative z-10 text-white font-black text-lg drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">Team</span>
        </div>
      </button>

      {/* Fixed NFT Collection Button - Bottom Right */}
      <a
        href="https://magiceden.io/marketplace/pumpfun_pepe"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        title="View NFT Collection"
      >
        <div className="relative px-5 py-3 backdrop-blur-xl bg-gradient-to-br from-[#00ff41]/30 via-[#00cc34]/30 to-[#00ff41]/30 border border-[#00ff41]/40 rounded-full shadow-[0_8px_32px_rgba(0,255,65,0.3)] hover:shadow-[0_8px_32px_rgba(0,255,65,0.5)] transition-all duration-300 hover:scale-110 hover:border-[#00ff41]/60 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative z-10 text-[#00ff41] font-black text-lg drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]">NFTs</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0e17] animate-bounce z-20" />
        </div>
      </a>

    <main className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#0a0e17] via-[#15202b] to-[#0a0e17]">
      {/* Cursor Trail Effect - Hide on mobile */}
      <div className="hidden md:block">
        <CursorTrail />
      </div>
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:50px_50px] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating Comments Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {comments.map((comment, index) => (
          <FloatingComment
            key={index}
            text={comment.text}
            username={comment.username}
            likes={comment.likes}
            delay={comment.delay}
            duration={comment.duration}
            startX={comment.startX}
            startY={comment.startY}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-8 pt-32 sm:pt-40">
        <Hero />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#00ff41] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#00ff41] opacity-10 blur-[120px] rounded-full pointer-events-none" />
    </main>
    </>
  );
}
