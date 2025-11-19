import { useState } from 'react';
import { Car, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '../store/configuratorStore';
import { carModels, getAllBrands } from '../config/carModels';

export default function CarSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const { selectedCarId, setCarModel } = useConfiguratorStore();
  
  const currentCar = carModels.find(car => car.id === selectedCarId);
  const brands = ['All', ...getAllBrands()];
  
  const filteredCars = selectedBrand === 'All' 
    ? carModels 
    : carModels.filter(car => car.brand === selectedBrand);

  const handleCarSelect = (carId) => {
    setCarModel(carId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Selector Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-3 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 shadow-xl"
      >
        <Car className="w-5 h-5 text-white" />
        <div className="text-left">
          <div className="text-xs text-white/60">Current Model</div>
          <div className="text-sm font-semibold text-white">{currentCar?.name}</div>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/95 to-black/95 border border-white/10 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Select Your Car</h2>
                  <p className="text-white/60">Choose from our premium collection</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Brand Filter */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedBrand === brand
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              {/* Car Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCars.map((car) => {
                  const isSelected = car.id === selectedCarId;
                  
                  return (
                    <motion.div
                      key={car.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onClick={() => handleCarSelect(car.id)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all group ${
                        isSelected
                          ? 'bg-white/10 border-white/40 shadow-lg shadow-white/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {/* Car Icon */}
                      <div className="w-full h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-xl flex items-center justify-center mb-3">
                        <Car className="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors" />
                      </div>

                      {/* Car Info */}
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-white/50">{car.brand}</div>
                          <h3 className="text-lg font-bold text-white">{car.name}</h3>
                          <div className="text-xs text-white/60">{car.year} • {car.category}</div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-2 text-xs">
                          <span className="px-2 py-1 bg-white/10 rounded text-white/80">
                            {car.specs.horsepower} HP
                          </span>
                          <span className="px-2 py-1 bg-white/10 rounded text-white/80">
                            {car.specs.acceleration}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-lg font-bold text-white">
                          ${car.basePrice.toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
