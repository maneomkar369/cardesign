import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Volume2, 
  Thermometer, 
  Fan, 
  Sun, 
  Moon,
  Navigation,
  Phone,
  Music,
  Settings,
  X
} from 'lucide-react';

export default function InCarExperience({ isOpen, onClose }) {
  const [temperature, setTemperature] = useState(72);
  const [volume, setVolume] = useState(50);
  const [ambientLighting, setAmbientLighting] = useState('blue');
  const [activeScreen, setActiveScreen] = useState('home');

  const ambientColors = [
    { id: 'blue', name: 'Ocean Blue', color: '#0d6efd' },
    { id: 'purple', name: 'Aurora Purple', color: '#6f42c1' },
    { id: 'green', name: 'Neon Green', color: '#198754' },
    { id: 'red', name: 'Racing Red', color: '#dc3545' },
    { id: 'orange', name: 'Sunset Orange', color: '#fd7e14' },
    { id: 'cyan', name: 'Cyber Cyan', color: '#0dcaf0' }
  ];

  const quickActions = [
    { icon: Navigation, label: 'Navigation', screen: 'nav' },
    { icon: Phone, label: 'Phone', screen: 'phone' },
    { icon: Music, label: 'Media', screen: 'media' },
    { icon: Settings, label: 'Settings', screen: 'settings' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-6xl h-[80vh] backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all duration-300"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Dashboard Title */}
            <div className="absolute top-6 left-6 z-10">
              <h2 className="text-2xl font-light text-white tracking-wide">
                Digital Cockpit Experience
              </h2>
              <p className="text-white/60 text-sm mt-1">Futuristic Interior Technology</p>
            </div>

            {/* Main Dashboard Grid */}
            <div className="h-full pt-24 pb-8 px-8 grid grid-cols-3 gap-6">
              {/* Left Panel - Climate & Ambient */}
              <div className="space-y-6">
                {/* Climate Control */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Thermometer className="w-5 h-5 text-white/80" />
                    <h3 className="text-lg font-light text-white">Climate</h3>
                  </div>

                  <div className="text-center mb-6">
                    <motion.div
                      key={temperature}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-5xl font-light text-white mb-2"
                    >
                      {temperature}°
                    </motion.div>
                    <p className="text-white/60 text-sm">Target Temperature</p>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="range"
                      min="60"
                      max="85"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-full accent-blue-500"
                    />
                    
                    <div className="flex gap-2">
                      <button className="flex-1 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg py-2 hover:bg-white/20 transition-all">
                        <Fan className="w-5 h-5 text-white mx-auto" />
                      </button>
                      <button className="flex-1 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg py-2 hover:bg-white/20 transition-all">
                        <Sun className="w-5 h-5 text-white mx-auto" />
                      </button>
                      <button className="flex-1 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg py-2 hover:bg-white/20 transition-all">
                        <Moon className="w-5 h-5 text-white mx-auto" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Ambient Lighting */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sun className="w-5 h-5 text-white/80" />
                    <h3 className="text-lg font-light text-white">Ambient Lighting</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {ambientColors.map((color) => (
                      <motion.button
                        key={color.id}
                        onClick={() => setAmbientLighting(color.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                          ambientLighting === color.id
                            ? 'border-white shadow-lg'
                            : 'border-white/20'
                        }`}
                        style={{
                          backgroundColor: color.color,
                          boxShadow: ambientLighting === color.id ? `0 0 20px ${color.color}` : 'none'
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Center Panel - Main Display */}
              <div className="col-span-2 space-y-6">
                {/* Quick Actions */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4"
                >
                  <div className="grid grid-cols-4 gap-3">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={action.label}
                          onClick={() => setActiveScreen(action.screen)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className={`backdrop-blur-sm bg-white/10 border rounded-xl py-4 transition-all duration-300 ${
                            activeScreen === action.screen
                              ? 'border-white/60 bg-white/20'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                          <p className="text-white text-xs font-light">{action.label}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Main Screen Area */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 h-full flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {/* Holographic Grid Effect */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border border-blue-500/30" />
                      ))}
                    </div>
                  </div>

                  {/* Content Based on Active Screen */}
                  <AnimatePresence mode="wait">
                    {activeScreen === 'home' && (
                      <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center z-10"
                      >
                        <Radio className="w-20 h-20 text-white/60 mx-auto mb-4" />
                        <h3 className="text-3xl font-light text-white mb-2">Welcome</h3>
                        <p className="text-white/60">Select an action above to continue</p>
                      </motion.div>
                    )}

                    {activeScreen === 'media' && (
                      <motion.div
                        key="media"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full z-10"
                      >
                        <Music className="w-16 h-16 text-white/60 mx-auto mb-6" />
                        <h3 className="text-2xl font-light text-white text-center mb-6">Now Playing</h3>
                        
                        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 mb-4">
                          <p className="text-white text-lg mb-1">Synthwave Dreams</p>
                          <p className="text-white/60 text-sm">Cyber Artist</p>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-white/60 text-sm">2:45</span>
                          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '0%' }}
                              animate={{ width: '60%' }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                            />
                          </div>
                          <span className="text-white/60 text-sm">4:30</span>
                        </div>

                        <div className="space-y-3">
                          <label className="text-white/80 text-sm font-light">Volume</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="w-full accent-cyan-500"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Ambient Color Glow */}
                  <motion.div
                    animate={{
                      backgroundColor: ambientColors.find(c => c.id === ambientLighting)?.color + '20'
                    }}
                    className="absolute inset-0 -z-10"
                    style={{ filter: 'blur(40px)' }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
