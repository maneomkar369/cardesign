import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Download, Share2, Check } from 'lucide-react';

export default function ARPreview({ isOpen, onClose }) {
  const [arActive, setArActive] = useState(false);
  const [placement, setPlacement] = useState(null);

  const startAR = () => {
    setArActive(true);
    // In a real implementation, this would activate the device camera
    // and use WebXR or similar API for AR placement
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative z-10 p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light text-white">AR Driveway Preview</h2>
                  <p className="text-white/60 text-sm mt-1">
                    Visualize your custom car in your space
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* AR View Area */}
            <div className="relative h-[500px] bg-gradient-to-br from-black/50 to-black/80">
              {!arActive ? (
                <div className="flex flex-col items-center justify-center h-full p-8">
                  <Camera className="w-24 h-24 text-white/60 mb-6" />
                  <h3 className="text-xl font-light text-white mb-3">
                    Start AR Experience
                  </h3>
                  <p className="text-white/60 text-center mb-6 max-w-md">
                    Use your device camera to place a full-scale 3D model of your customized
                    car in your real-world environment.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startAR}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-light shadow-lg"
                  >
                    <Camera className="w-5 h-5" />
                    Launch AR Camera
                  </motion.button>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      360° View
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      Real Scale
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      Share Photos
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  {/* Simulated AR Camera View */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-64 h-64 mx-auto mb-4 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center">
                          <p className="text-white/60">Move to place your car</p>
                        </div>
                        <p className="text-white/80">
                          Point your camera at a flat surface
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AR Controls Overlay */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all"
                    >
                      <Download className="w-6 h-6 text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all"
                    >
                      <Share2 className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-light">1</span>
                  </div>
                  <p className="text-white/70 text-sm">Grant camera access</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-light">2</span>
                  </div>
                  <p className="text-white/70 text-sm">Find a flat surface</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-light">3</span>
                  </div>
                  <p className="text-white/70 text-sm">Place and explore</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
