import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Twitter, Github, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/binance', color: 'hover:text-blue-400' },
    { name: 'Telegram', icon: MessageCircle, url: 'https://t.me/binanceexchange', color: 'hover:text-blue-500' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/binance', color: 'hover:text-gray-400' },
    { name: 'Email', icon: Mail, url: 'mailto:support@binance.com', color: 'hover:text-red-400' }
  ];

  const quickLinks = [
    { name: 'Home', url: '#home' },
    { name: 'Airdrop', url: '#airdrop' },
    { name: 'Features', url: '#features' },
    { name: 'Tokenomics', url: '#tokenomics' }
  ];

  const legalLinks = [
    { name: 'Terms of Service', url: 'https://www.binance.com/en/terms' },
    { name: 'Privacy Policy', url: 'https://www.binance.com/en/privacy' },
    { name: 'Risk Warning', url: 'https://www.binance.com/en/risk-warning' },
    { name: 'Whitepaper', url: 'https://www.binance.com/resources/pdf/Binance_WhitePaper_en.pdf' }
  ];

  return (
    <footer className="bg-binance-dark/95 backdrop-blur-lg border-t border-binance-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-binance-gradient rounded-full flex items-center justify-center">
                <Coins className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">MemeCoin Hub</span>
            </div>
            
            <p className="text-binance-light-gray leading-relaxed mb-6 max-w-md">
              The ultimate multi-memecoin airdrop platform powered by Binance. 
              Get 25+ different popular memecoins including DOGE, SHIB, PEPE, 
              and many more in one massive distribution event.
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 glass-effect rounded-full text-binance-light-gray transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={link.url} 
                    className="text-binance-light-gray hover:text-binance-yellow transition-colors duration-300 flex items-center"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-binance-light-gray hover:text-binance-yellow transition-colors duration-300 flex items-center"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-60" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-binance-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-binance-yellow mb-1">1M+</div>
              <div className="text-binance-light-gray text-sm">Total Supply</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-binance-yellow mb-1">50K+</div>
              <div className="text-binance-light-gray text-sm">Holders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-binance-yellow mb-1">100K+</div>
              <div className="text-binance-light-gray text-sm">Airdrop Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-binance-yellow mb-1">24/7</div>
              <div className="text-binance-light-gray text-sm">Support</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-binance-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-binance-light-gray text-sm">
              © 2025 MemeCoin Hub. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">BSC Network</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400">Audited</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-binance-yellow rounded-full animate-pulse"></div>
                <span className="text-binance-yellow">Binance Powered</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Risk Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg"
        >
          <p className="text-yellow-400 text-sm text-center">
            ⚠️ Risk Warning: Cryptocurrency investments involve high risk. 
            Only invest amounts you can afford to lose.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 