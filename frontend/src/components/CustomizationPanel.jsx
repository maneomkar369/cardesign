import { useState } from 'react';
import { useConfiguratorStore } from '../store/configuratorStore';
import { carModels } from '../config/carModels';
import { Palette, Settings, Sparkles, Circle, DollarSign, Check, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomizationPanel() {
  const [activeTab, setActiveTab] = useState('colors');
  const {
    selectedCarId,
    wheels,
    interiors,
    selectedColor,
    selectedWheels,
    selectedInterior,
    setColor,
    setWheels,
    setInterior,
    calculateTotalPrice
  } = useConfiguratorStore();

  // Get colors from the current car model
  const currentCar = carModels.find(car => car.id === selectedCarId);
  const colors = currentCar?.colors || [];

  const tabs = [
    { id: 'colors', name: 'Exterior', icon: Palette },
    { id: 'wheels', name: 'Wheels', icon: Circle },
    { id: 'interior', name: 'Interior', icon: Settings }
  ];

  const totalPrice = calculateTotalPrice();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-96"
    >
      {/* Tab Navigation */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 rounded-3xl p-3 mb-4 shadow-2xl shadow-black/50 hover:shadow-blue-500/20 transition-all duration-500"
      >
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-2xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-white border border-blue-400/50 shadow-lg shadow-blue-500/20'
                    : 'text-white/60 hover:bg-white/10 hover:text-white/90 border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{tab.name}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Content Panel */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl shadow-black/50 max-h-[65vh] overflow-y-auto custom-scrollbar hover:shadow-purple-500/20 transition-all duration-500"
      >
        <AnimatePresence mode="wait">
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-blue-400 animate-pulse-slow" />
                <h3 className="text-xl font-semibold text-white gradient-text">Exterior Color</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {colors.map((color, index) => (
                  <motion.button
                    key={`${color.name}-${index}`}
                    onClick={() => setColor(color.hex)}
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={`relative aspect-square rounded-2xl border-2 transition-all duration-300 overflow-hidden hover-glow ${
                      selectedColor === color.hex
                        ? 'border-white shadow-2xl shadow-white/60 ring-2 ring-blue-400/50'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.hex && (
                      <motion.div
                        layoutId="colorCheck"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/10"
                      >
                        <motion.div 
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl"
                        >
                          <Check className="w-5 h-5 text-black" />
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {colors.map((color, index) => (
                  selectedColor === color.hex && (
                    <motion.div
                      key={`${color.name}-label-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20"
                    >
                      <p className="text-white font-semibold text-lg gradient-text">{color.name}</p>
                      {color.price > 0 && (
                        <p className="text-green-400 font-medium text-sm mt-1">+${color.price.toLocaleString()}</p>
                      )}
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          )}

          {/* Wheels Tab */}
          {activeTab === 'wheels' && (
            <motion.div
              key="wheels"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Disc className="w-6 h-6 text-purple-400 animate-spin-slow" />
                <h3 className="text-xl font-semibold text-white gradient-text">Wheel Design</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {wheelOptions.map((wheel, index) => (
                  <motion.button
                    key={wheel.id}
                    onClick={() => setWheels(wheel.id)}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    className={`group p-5 rounded-2xl transition-all duration-300 text-left ${
                      selectedWheels === wheel.id
                        ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 shadow-lg shadow-purple-500/30'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-semibold text-base mb-1">{wheel.name}</p>
                        <p className="text-white/60 text-sm">
                          {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
                        </p>
                      </div>
                      {selectedWheels === wheel.id && (
                        <motion.div 
                          layoutId="wheelCheck"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Interior Tab */}
          {activeTab === 'interior' && (
            <motion.div
              key="interior"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-pink-400 animate-pulse-slow" />
                <h3 className="text-xl font-semibold text-white gradient-text">Interior Trim</h3>
              </div>
              
              <div className="space-y-4">
                {interiors.map((interior, index) => (
                  <motion.button
                    key={interior.id}
                    onClick={() => setInterior(interior.id)}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    className={`w-full backdrop-blur-xl rounded-2xl p-5 transition-all duration-300 ${
                      selectedInterior === interior.id
                        ? 'bg-gradient-to-br from-pink-500/30 to-red-500/30 border-2 border-pink-400 shadow-lg shadow-pink-500/30'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-white font-semibold text-base">{interior.name}</p>
                        <p className={`text-sm font-medium mt-1 ${
                          interior.price === 0 ? 'text-green-400' : 'text-purple-300'
                        }`}>
                          {interior.price === 0 ? 'Included' : `+$${interior.price.toLocaleString()}`}
                        </p>
                      </div>
                      {selectedInterior === interior.id && (
                        <motion.div 
                          layoutId="interiorCheck"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Price Summary */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/20 rounded-3xl p-6 mt-4 shadow-2xl shadow-black/50 hover:shadow-green-500/20 transition-all duration-500"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/90 font-semibold text-base">Total Price</span>
          </div>
          <motion.span
            key={totalPrice}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 animate-glow"
          >
            ${totalPrice.toLocaleString()}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
