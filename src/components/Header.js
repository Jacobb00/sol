import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Coins, Wallet } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Check wallet connection
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress('');
          setIsConnected(false);
        }
      });
    }

    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

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
            <span className="text-xl font-bold text-white">MemeCoin Hub</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-binance-yellow transition-colors">Home</a>
            <a href="#airdrop" className="text-white hover:text-binance-yellow transition-colors">Airdrop</a>
            <a href="#features" className="text-white hover:text-binance-yellow transition-colors">Features</a>
            <a href="#tokenomics" className="text-white hover:text-binance-yellow transition-colors">Tokenomics</a>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <div className="flex items-center space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-mono text-sm">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
                <Wallet className="w-4 h-4 text-green-400" />
              </div>
            ) : (
              <a href="#airdrop" className="btn-primary flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </a>
            )}
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
              <a href="#airdrop" className="text-white hover:text-binance-yellow transition-colors">Airdrop</a>
              <a href="#features" className="text-white hover:text-binance-yellow transition-colors">Features</a>
              <a href="#tokenomics" className="text-white hover:text-binance-yellow transition-colors">Tokenomics</a>
              
              {isConnected ? (
                <div className="flex items-center justify-center space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-mono text-sm">
                    {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                  </span>
                  <Wallet className="w-4 h-4 text-green-400" />
                </div>
              ) : (
                <a href="#airdrop" className="btn-primary w-full mt-4 flex items-center justify-center space-x-2">
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 