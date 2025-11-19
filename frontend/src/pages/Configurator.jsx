import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Share2, 
  RotateCcw, 
  Camera, 
  Maximize2,
  Monitor,
  ShoppingCart,
  Eye,
  Smartphone
} from 'lucide-react';
import VehicleConfigurator from '../components/VehicleConfigurator';
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
  const { autoRotate, setAutoRotate, saveConfiguration } = useConfiguratorStore();

  const handleSave = () => {
    saveConfiguration();
    alert('Configuration saved successfully!');
  };

  const handleShare = () => {
    // Generate shareable link
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const handleScreenshot = () => {
    alert('Screenshot feature coming soon!');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Viewer */}
      <div className={`${fullscreen ? 'fixed inset-0 z-40' : 'relative h-screen'}`}>
        <VehicleConfigurator />
      </div>

      {/* Top Control Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                autoRotate
                  ? 'bg-white/30 text-white border border-white/40'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-light">Auto Rotate</span>
            </motion.button>

            <div className="w-px h-6 bg-white/20" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScreenshot}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm font-light">Screenshot</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInCar(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <Monitor className="w-4 h-4" />
              <span className="text-sm font-light">Interior View</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAR(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-light">AR Preview</span>
            </motion.button>

            <div className="w-px h-6 bg-white/20" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-light">Save</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-light">Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFullscreen(!fullscreen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Customization Panel (Left) */}
      <CustomizationPanel />

      {/* Performance Dashboard (Right) */}
      <PerformanceDashboard />

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="text-white">
              <p className="text-sm text-white/60 font-light">Your Custom</p>
              <p className="text-lg font-light">2025 Cyber Phantom GT</p>
            </div>

            <div className="w-px h-10 bg-white/20" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBuildOrder(true)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-light">Build & Order</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              <span className="font-light">View Gallery</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* In-Car Experience Modal */}
      <InCarExperience isOpen={showInCar} onClose={() => setShowInCar(false)} />

      {/* AR Preview Modal */}
      <ARPreview isOpen={showAR} onClose={() => setShowAR(false)} />

      {/* Build & Order Modal */}
      <BuildAndOrder isOpen={showBuildOrder} onClose={() => setShowBuildOrder(false)} />

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 z-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3"
      >
        <p className="text-white/70 text-sm font-light">
          🖱️ Drag to rotate • 🔍 Scroll to zoom
        </p>
      </motion.div>
    </div>
  );
}
