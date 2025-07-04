# MemeCoin Airdrop Site 🚀

A professional meme coin airdrop site powered by Binance. Built with modern React application, featuring Binance's design language with an attractive and user-friendly interface.

## ✨ Features

- **Modern Design**: Sleek interface mimicking Binance's professional design language
- **Responsive**: Perfect appearance on all devices
- **Animations**: Smooth animations with Framer Motion
- **Wallet Integration**: MetaMask wallet connection simulation
- **Airdrop System**: Token claim functionality
- **Tokenomics**: Detailed token distribution and roadmap
- **Glass Effect**: Elegant design with modern glass effects
- **Toast Notifications**: Notifications for user interactions

## 🛠️ Technologies

- **React 18** - Modern React library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Modern icons
- **React Hot Toast** - Notification system
- **React Router** - Page routing

## 🚀 Installation

1. **Clone the project**
```bash
git clone <repository-url>
cd binance-airdrop-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── Hero.js            # Main hero section
│   ├── AirdropSection.js  # Airdrop claim form
│   ├── Features.js        # Token features
│   ├── Tokenomics.js      # Token economics
│   ├── Footer.js          # Page footer
│   └── Background.js      # Animated background
├── App.js                 # Main application component
├── index.js              # React DOM render
└── index.css             # Global styles
```

## 🎨 Design System

### Colors
- **Binance Yellow**: `#F0B90B` - Primary brand color
- **Dark Theme**: `#0B1426` - Background color
- **Gray Tones**: `#2B3139`, `#848E9C` - Supporting colors
- **Gradient**: Yellow-red transition

### Typography
- **Font**: Inter (Google Fonts)
- **Headers**: 4xl-7xl sizes
- **Text**: lg-xl sizes

### Effects
- **Glass Effect**: Blur and transparency
- **Hover Animations**: Scale and color transitions
- **Loading States**: Spinner animations

## 📱 Components

### Header
- Responsive navigation
- Logo and brand name
- Wallet connect button
- Mobile menu

### Hero Section
- Large title and description
- Statistics cards
- CTA buttons
- Floating animation elements

### Airdrop Section
- Wallet connection steps
- Token claim form
- Progress bar
- Success state

### Features
- 6 feature cards
- Hover effects
- Icons and descriptions

### Tokenomics
- Token distribution table
- Project roadmap
- Security information

### Footer
- Social media links
- Quick links
- Legal information
- Risk warning

## 🔧 Development

### Adding New Component
```jsx
import React from 'react';
import { motion } from 'framer-motion';

const NewComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="glass-effect rounded-xl p-8"
    >
      {/* Content */}
    </motion.div>
  );
};

export default NewComponent;
```

### Adding Styles
Use Tailwind utility classes:
```jsx
className="bg-binance-gradient text-white hover:scale-105 transition-all"
```

## 📦 Build

Build for production:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Warning

This project is for demonstration purposes only. No real blockchain integration has been implemented.

---

**Note**: This site is not an official Binance project, it only mimics their design language. 