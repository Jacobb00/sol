import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Coins } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-binance-gradient rounded-full flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Binance Earning</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-binance-yellow transition-colors">Home</a>
            <a href="#airdrop" className="text-white hover:text-binance-yellow transition-colors">Earning</a>
            <a href="#features" className="text-white hover:text-binance-yellow transition-colors">Features</a>
            <a href="#tokenomics" className="text-white hover:text-binance-yellow transition-colors">About</a>
          </nav>

          {/* Start Earning Button */}
          <div className="hidden md:block">
            <a href="#airdrop" className="btn-primary">
              <span>Start Earning</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden mt-4 py-4 border-t border-binance-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-white hover:text-binance-yellow transition-colors">Home</a>
              <a href="#airdrop" className="text-white hover:text-binance-yellow transition-colors">Earning</a>
              <a href="#features" className="text-white hover:text-binance-yellow transition-colors">Features</a>
              <a href="#tokenomics" className="text-white hover:text-binance-yellow transition-colors">About</a>
              
              <a href="#airdrop" className="btn-primary w-full mt-4">
                <span>Start Earning</span>
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 