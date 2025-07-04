import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp, Lock, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure',
      description: 'Secure smart contract structure audited by Binance.',
      color: 'text-green-400'
    },
    {
      icon: Zap,
      title: 'Fast Transactions',
      description: 'Instant token transfers with low gas fees.',
      color: 'text-blue-400'
    },
    {
      icon: Users,
      title: 'Strong Community',
      description: 'Growing community ecosystem with 50,000+ active members.',
      color: 'text-purple-400'
    },
    {
      icon: TrendingUp,
      title: 'High Potential',
      description: 'Token with moon potential backed by Binance support.',
      color: 'text-yellow-400'
    },
    {
      icon: Lock,
      title: 'Liquidity Lock',
      description: 'Guaranteed liquidity pool locked for 2 years.',
      color: 'text-red-400'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Worldwide accessible DeFi platform 24/7.',
      color: 'text-cyan-400'
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why <span className="text-binance-yellow">MemeCoin</span>?
          </h2>
          <p className="text-xl text-binance-light-gray max-w-3xl mx-auto">
            A next-generation meme token project growing with Binance's powerful 
            infrastructure and community support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="glass-effect card-gradient rounded-xl p-6 h-full border border-binance-border hover:border-binance-yellow/50 transition-all duration-300">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${feature.color} bg-opacity-10`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-binance-light-gray text-center leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="absolute inset-0 bg-binance-gradient opacity-0 rounded-xl"
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="glass-effect card-gradient rounded-2xl p-8 border border-binance-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Take Your Place in Binance Ecosystem
                </h3>
                <p className="text-binance-light-gray mb-6 leading-relaxed">
                  MemeCoin is a community-focused meme token project built on 
                  Binance's powerful infrastructure. With reliable smart 
                  contracts and transparent tokenomics, it's preparing to take 
                  its place in the future DeFi ecosystem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-binance-yellow/10 border border-binance-yellow/20 rounded-full text-binance-yellow text-sm">
                    BSC Network
                  </span>
                  <span className="px-4 py-2 bg-green-400/10 border border-green-400/20 rounded-full text-green-400 text-sm">
                    Audited Contract
                  </span>
                  <span className="px-4 py-2 bg-blue-400/10 border border-blue-400/20 rounded-full text-blue-400 text-sm">
                    Community Driven
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <motion.div
                  className="w-full h-64 bg-binance-gradient rounded-xl flex items-center justify-center relative overflow-hidden"
                  animate={{ 
                    background: [
                      'linear-gradient(135deg, #F0B90B 0%, #FF6B6B 100%)',
                      'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                      'linear-gradient(135deg, #4ECDC4 0%, #F0B90B 100%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    🚀
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-4 left-4 text-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💎
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 text-2xl"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🌙
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 