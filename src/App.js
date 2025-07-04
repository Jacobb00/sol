import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import AirdropSection from './components/AirdropSection';
import Features from './components/Features';
import Tokenomics from './components/Tokenomics';
import Footer from './components/Footer';
import Background from './components/Background';

function App() {
  return (
    <div className="min-h-screen bg-binance-dark relative overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <AirdropSection />
          <Features />
          <Tokenomics />
        </motion.main>
        <Footer />
      </div>
    </div>
  );
}

export default App; 