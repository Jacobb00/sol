import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Gift } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-binance-gradient rounded-full text-sm font-medium mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Gift className="w-4 h-4 mr-2" />
            🔥 OFFICIAL BINANCE AIRDROP LIVE!
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-binance-gradient">
            MemeCoin Hub
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
            The Ultimate Multi-Memecoin Airdrop by <span className="text-binance-yellow">Binance</span>
          </h2>
          
          <p className="text-lg md:text-xl text-binance-light-gray max-w-3xl mx-auto">
            Official Binance-powered airdrop featuring 25+ premium memecoins! 
            Get DOGE, SHIB, PEPE, BONK, FLOKI and exclusive tokens distributed 
            directly through Binance's secure infrastructure.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="card-gradient glass-effect rounded-xl p-6">
            <div className="text-3xl font-bold text-binance-yellow mb-2">25+</div>
            <div className="text-binance-light-gray">Different Memecoins</div>
          </div>
          
          <div className="card-gradient glass-effect rounded-xl p-6">
            <div className="text-3xl font-bold text-binance-yellow mb-2">$100K+</div>
            <div className="text-binance-light-gray">Total Airdrop Value</div>
          </div>
          
          <div className="card-gradient glass-effect rounded-xl p-6">
            <div className="text-3xl font-bold text-binance-yellow mb-2">50,000+</div>
            <div className="text-binance-light-gray">Active Participants</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center"
        >
          <motion.a
            href="#airdrop"
            className="btn-primary flex items-center space-x-2 text-lg px-10 py-5 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="w-5 h-5" />
            <span>Join Binance Airdrop</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Floating Token Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-binance-gradient rounded-full flex items-center justify-center opacity-20"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <span className="text-2xl">🚀</span>
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 right-1/4 w-12 h-12 bg-binance-gradient rounded-full flex items-center justify-center opacity-20"
            animate={{ y: [0, 15, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <span className="text-xl">💎</span>
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-binance-gradient rounded-full flex items-center justify-center opacity-20"
            animate={{ y: [0, -25, 0], rotate: [0, 90, 180] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <span className="text-3xl">🌙</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 