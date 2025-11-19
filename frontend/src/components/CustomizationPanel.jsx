import { useState } from 'react';
import { useConfiguratorStore } from '../store/configuratorStore';
import { carModels } from '../config/carModels';
import { Palette, Settings, Sparkles, Circle, DollarSign } from 'lucide-react';
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
      transition={{ duration: 0.5 }}
      className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-80"
    >
      {/* Tab Navigation */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-2 mb-4 shadow-2xl">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/30 text-white border border-white/40'
                    : 'text-white/60 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-light text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Panel */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl max-h-[60vh] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-white/80" />
                <h3 className="text-lg font-light text-white">Exterior Color</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color, index) => (
                  <motion.button
                    key={`${color.name}-${index}`}
                    onClick={() => setColor(color.hex)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative aspect-square rounded-lg border-2 transition-all duration-300 ${
                      selectedColor === color.hex
                        ? 'border-white shadow-lg shadow-white/50'
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.hex && (
                      <motion.div
                        layoutId="colorCheck"
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-black rounded-full" />
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {colors.map((color, index) => (
                  selectedColor === color.hex && (
                    <motion.div
                      key={`${color.name}-label-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-white font-light text-sm">{color.name}</p>
                      {color.price > 0 && (
                        <p className="text-white/60 text-xs">+${color.price.toLocaleString()}</p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Circle className="w-5 h-5 text-white/80" />
                <h3 className="text-lg font-light text-white">Wheel Design</h3>
              </div>
              
              <div className="space-y-3">
                {wheels.map((wheel) => (
                  <motion.button
                    key={wheel.id}
                    onClick={() => setWheels(wheel.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full backdrop-blur-sm bg-white/10 border rounded-xl p-4 transition-all duration-300 ${
                      selectedWheels === wheel.id
                        ? 'border-white/60 bg-white/20'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-white font-light">{wheel.name}</p>
                        <p className="text-white/60 text-sm">
                          {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
                        </p>
                      </div>
                      {selectedWheels === wheel.id && (
                        <motion.div layoutId="wheelCheck">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-white/80" />
                <h3 className="text-lg font-light text-white">Interior Trim</h3>
              </div>
              
              <div className="space-y-3">
                {interiors.map((interior) => (
                  <motion.button
                    key={interior.id}
                    onClick={() => setInterior(interior.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full backdrop-blur-sm bg-white/10 border rounded-xl p-4 transition-all duration-300 ${
                      selectedInterior === interior.id
                        ? 'border-white/60 bg-white/20'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-white font-light">{interior.name}</p>
                        <p className="text-white/60 text-sm">
                          {interior.price === 0 ? 'Included' : `+$${interior.price.toLocaleString()}`}
                        </p>
                      </div>
                      {selectedInterior === interior.id && (
                        <motion.div layoutId="interiorCheck">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
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
      </div>

      {/* Price Summary */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 mt-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-white/80" />
            <span className="text-white/80 font-light">Total Price</span>
          </div>
          <motion.span
            key={totalPrice}
            initial={{ scale: 1.2, color: '#ffffff' }}
            animate={{ scale: 1, color: '#ffffffcc' }}
            className="text-2xl font-light text-white"
          >
            ${totalPrice.toLocaleString()}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
