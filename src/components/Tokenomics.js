import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Lock, Zap, Gift, Coins } from 'lucide-react';

const Tokenomics = () => {
  const airdropDistribution = [
    { label: 'Premium Memecoins', percentage: 30, color: 'bg-yellow-400', amount: '30%', description: 'High-value established tokens' },
    { label: 'Trending Memecoins', percentage: 25, color: 'bg-blue-400', amount: '25%', description: 'Currently popular tokens' },
    { label: 'New Launch Memecoins', percentage: 20, color: 'bg-green-400', amount: '20%', description: 'Fresh project tokens' },
    { label: 'Community Picks', percentage: 15, color: 'bg-purple-400', amount: '15%', description: 'Community voted tokens' },
    { label: 'Surprise Drops', percentage: 10, color: 'bg-red-400', amount: '10%', description: 'Random bonus tokens' }
  ];

  const featuredMemecoins = [
    { name: 'DOGE', symbol: 'DOGE', network: 'BSC', allocation: '15%' },
    { name: 'SHIB', symbol: 'SHIB', network: 'ETH', allocation: '12%' },
    { name: 'PEPE', symbol: 'PEPE', network: 'ETH', allocation: '10%' },
    { name: 'FLOKI', symbol: 'FLOKI', network: 'BSC', allocation: '8%' },
    { name: 'BONK', symbol: 'BONK', network: 'SOL', allocation: '6%' },
    { name: 'WIF', symbol: 'WIF', network: 'SOL', allocation: '5%' }
  ];

  const roadmapItems = [
    { phase: 'Q1 2025', title: 'Platform Launch', status: 'completed' },
    { phase: 'Q2 2025', title: 'Multi-Memecoin Airdrop', status: 'active' },
    { phase: 'Q3 2025', title: 'NFT Collection Drop', status: 'upcoming' },
    { phase: 'Q4 2025', title: 'Memecoin Launchpad', status: 'upcoming' }
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-binance-yellow">Multi-Memecoin</span> Airdrop
          </h2>
          <p className="text-xl text-binance-light-gray max-w-3xl mx-auto">
            The biggest multi-memecoin airdrop event! Get various popular memecoins distributed fairly across multiple networks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-effect card-gradient rounded-xl p-8 border border-binance-border">
              <div className="flex items-center mb-6">
                <Gift className="w-6 h-6 text-binance-yellow mr-3" />
                <h3 className="text-2xl font-bold text-white">Airdrop Distribution</h3>
              </div>
              
              <div className="space-y-4">
                {airdropDistribution.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-binance-dark/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`} />
                      <div>
                        <span className="text-white font-medium block">{item.label}</span>
                        <span className="text-binance-light-gray text-xs">{item.description}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{item.percentage}%</div>
                      <div className="text-binance-light-gray text-sm">{item.amount}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-effect card-gradient rounded-xl p-6 border border-binance-border">
              <div className="flex items-center mb-4">
                <Coins className="w-6 h-6 text-green-400 mr-3" />
                <h4 className="text-xl font-bold text-white">Featured Memecoins</h4>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {featuredMemecoins.map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-binance-dark/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-binance-gradient rounded-full flex items-center justify-center text-xs font-bold">
                        {token.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="text-white font-medium block">{token.name}</span>
                        <span className="text-binance-light-gray text-xs">{token.network}</span>
                      </div>
                    </div>
                    <div className="text-binance-yellow font-medium">
                      {token.allocation}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-binance-border">
                <p className="text-binance-light-gray text-sm text-center">
                  + 20+ more memecoins in surprise drops!
                </p>
              </div>
            </div>

            <div className="glass-effect card-gradient rounded-xl p-6 border border-binance-border">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-blue-400 mr-3" />
                <h4 className="text-xl font-bold text-white">Security & Trust</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Verified Token Contracts</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Multi-Network Support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Fair Distribution Algorithm</span>
                </div>
              </div>
            </div>

            <div className="glass-effect card-gradient rounded-xl p-6 border border-binance-border">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                <h4 className="text-xl font-bold text-white">Airdrop Features</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-white">Instant Multi-Token Claims</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-white">Cross-Chain Distribution</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-white">Bonus Multipliers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-effect card-gradient rounded-xl p-8 border border-binance-border">
            <div className="flex items-center mb-8">
              <BarChart3 className="w-6 h-6 text-binance-yellow mr-3" />
              <h3 className="text-2xl font-bold text-white">Roadmap</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    item.status === 'completed' 
                      ? 'bg-green-400/10 border-green-400/30' 
                      : item.status === 'active'
                      ? 'bg-binance-yellow/10 border-binance-yellow/30 animate-pulse'
                      : 'bg-binance-gray/10 border-binance-gray/30'
                  }`}>
                    <div className={`text-sm font-medium mb-2 ${
                      item.status === 'completed' 
                        ? 'text-green-400' 
                        : item.status === 'active'
                        ? 'text-binance-yellow'
                        : 'text-binance-light-gray'
                    }`}>
                      {item.phase}
                    </div>
                    <div className="text-white font-bold">{item.title}</div>
                    <div className={`mt-3 w-4 h-4 rounded-full ${
                      item.status === 'completed' 
                        ? 'bg-green-400' 
                        : item.status === 'active'
                        ? 'bg-binance-yellow animate-pulse'
                        : 'bg-binance-gray'
                    }`}></div>
                  </div>
                  
                  {index < roadmapItems.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-binance-border"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Airdrop Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-effect card-gradient rounded-xl p-6 text-center border border-binance-border">
              <div className="text-3xl font-bold text-binance-yellow mb-2">25+</div>
              <div className="text-binance-light-gray">Different Memecoins</div>
            </div>
            <div className="glass-effect card-gradient rounded-xl p-6 text-center border border-binance-border">
              <div className="text-3xl font-bold text-binance-yellow mb-2">$100K+</div>
              <div className="text-binance-light-gray">Total Airdrop Value</div>
            </div>
            <div className="glass-effect card-gradient rounded-xl p-6 text-center border border-binance-border">
              <div className="text-3xl font-bold text-binance-yellow mb-2">5</div>
              <div className="text-binance-light-gray">Supported Networks</div>
            </div>
            <div className="glass-effect card-gradient rounded-xl p-6 text-center border border-binance-border">
              <div className="text-3xl font-bold text-binance-yellow mb-2">∞</div>
              <div className="text-binance-light-gray">Participation Limit</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics; 