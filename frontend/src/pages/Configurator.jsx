import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Share2, 
  RotateCcw, 
  Camera, 
  Maximize2,
  Monitor,
  ShoppingCart,
  Smartphone,
  Minimize2,
  Home,
  Zap,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MultiModelVehicleConfigurator from '../components/MultiModelVehicleConfigurator';
import CarSelector from '../components/CarSelector';
import CustomizationPanel from '../components/CustomizationPanel';
import PerformanceDashboard from '../components/PerformanceDashboard';
import InCarExperience from '../components/InCarExperience';
import ARPreview from '../components/ARPreview';
import BuildAndOrder from '../components/BuildAndOrder';
import { useConfiguratorStore } from '../store/configuratorStore';

export default function Configurator() {
  const [showInCar, setShowInCar] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [showBuildOrder, setShowBuildOrder] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const { autoRotate, setAutoRotate, saveConfiguration, getCurrentCar, calculateTotalPrice } = useConfiguratorStore();

  const currentCar = getCurrentCar();
  const totalPrice = calculateTotalPrice();

  const handleSave = () => {
    saveConfiguration();
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-out';
    notification.textContent = '✓ Configuration saved successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-6 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-fade-in-out';
    notification.textContent = '✓ Link copied to clipboard!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleScreenshot = () => {
    alert('Screenshot feature coming soon!');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Gradient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />
      
      {/* 3D Viewer */}
      <div className="relative h-screen">
        <MultiModelVehicleConfigurator />
      </div>

      {/* Top Navigation Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-7xl px-6"
          >
            <div className="backdrop-blur-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/10 rounded-3xl shadow-2xl shadow-black/50 hover:shadow-blue-500/20 transition-all duration-500">
              <div className="flex items-center justify-between px-6 py-4">
                {/* Left: Home & Car Info */}
                <div className="flex items-center gap-6">
                  <Link
                    to="/"
                    className="group relative p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <Home className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Home
                    </div>
                  </Link>
                  
                  {currentCar && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="hidden md:block"
                    >
                      <div className="text-xs text-white/50 mb-0.5">Configuring</div>
                      <div className="text-base font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {currentCar.name}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Center: Car Selector */}
                <div className="transform hover:scale-105 transition-transform">
                  <CarSelector />
                </div>

                {/* Right: Quick Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`p-3 rounded-2xl transition-all duration-300 ${
                      autoRotate
                        ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400/50'
                        : 'bg-white/5 hover:bg-white/10 border-white/10'
                    } border`}
                    title="Auto Rotate"
                  >
                    <RotateCcw className={`w-5 h-5 ${autoRotate ? 'text-blue-300 animate-spin-slow' : 'text-white'}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleScreenshot}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    title="Screenshot"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-400/30 transition-all"
                    title="Save Configuration"
                  >
                    <Save className="w-5 h-5 text-green-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullscreen}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {fullscreen ? (
                      <Minimize2 className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Customization Panel */}
      <CustomizationPanel />

      {/* Right: Performance Dashboard */}
      <PerformanceDashboard />

      {/* Bottom Action Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="backdrop-blur-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/10 rounded-3xl shadow-2xl shadow-black/50 px-8 py-4 hover:shadow-purple-500/20 transition-all duration-500">
              <div className="flex items-center gap-6">
                {/* Price Display */}
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-xs text-white/60">Total Price</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ${totalPrice.toLocaleString()}
                  </div>
                </div>

                <div className="w-px h-10 bg-white/20" />

                {/* Action Buttons */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowInCar(true)}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-400/30 rounded-2xl transition-all"
                >
                  <Monitor className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-medium text-white">Interior View</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAR(true)}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 rounded-2xl transition-all"
                >
                  <Smartphone className="w-5 h-5 text-purple-300" />
                  <span className="text-sm font-medium text-white">AR Preview</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBuildOrder(true)}
                  className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl shadow-lg shadow-orange-500/30 transition-all"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">Build & Order</span>
                  <Zap className="w-4 h-4 text-yellow-300" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide/Show Controls Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowControls(!showControls)}
        className="absolute top-1/2 right-6 -translate-y-1/2 z-20 p-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl hover:bg-white/20 transition-all"
        title={showControls ? "Hide Controls" : "Show Controls"}
      >
        <Info className="w-5 h-5 text-white" />
      </motion.button>

      {/* Modals */}
      <InCarExperience isOpen={showInCar} onClose={() => setShowInCar(false)} />
      <ARPreview isOpen={showAR} onClose={() => setShowAR(false)} />
      <BuildAndOrder isOpen={showBuildOrder} onClose={() => setShowBuildOrder(false)} />
    </div>
  );
}
