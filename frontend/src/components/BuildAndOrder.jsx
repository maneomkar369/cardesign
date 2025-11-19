import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingCart,
  CreditCard,
  MapPin,
  Check,
  ChevronRight,
  DollarSign,
  Calendar,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { useConfiguratorStore } from '../store/configuratorStore';

export default function BuildAndOrder({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    financing: 'cash',
    dealer: '',
    deliveryDate: ''
  });

  const {
    selectedColor,
    selectedWheels,
    selectedInterior,
    colors,
    wheels,
    interiors,
    calculateTotalPrice
  } = useConfiguratorStore();

  const totalPrice = calculateTotalPrice();

  const steps = [
    { id: 1, name: 'Summary', icon: ShoppingCart },
    { id: 2, name: 'Financing', icon: CreditCard },
    { id: 3, name: 'Dealer', icon: MapPin },
    { id: 4, name: 'Confirm', icon: Check }
  ];

  const dealers = [
    { id: 1, name: 'Downtown Auto Center', address: '123 Main St, City', distance: '2.3 mi' },
    { id: 2, name: 'Elite Motors', address: '456 Oak Ave, City', distance: '5.7 mi' },
    { id: 3, name: 'Premium Showroom', address: '789 Pine Rd, City', distance: '8.1 mi' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert('Order submitted successfully!');
    onClose();
  };

  const currentColor = colors.find(c => c.hex === selectedColor);
  const currentWheels = wheels.find(w => w.id === selectedWheels);
  const currentInterior = interiors.find(i => i.id === selectedInterior);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
            <div className="relative p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">Build & Order</h2>
                <button
                  onClick={onClose}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {steps.map((s, index) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            step >= s.id
                              ? 'bg-white/30 border-white text-white'
                              : 'bg-white/5 border-white/20 text-white/40'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm mt-2 font-light ${step >= s.id ? 'text-white' : 'text-white/40'}`}>
                          {s.name}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-4 ${step > s.id ? 'bg-white' : 'bg-white/20'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* Step 1: Summary */}
                {step === 1 && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-light text-white mb-6">Configuration Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white/60 text-sm">Exterior Color</p>
                            <p className="text-white font-light">{currentColor?.name}</p>
                          </div>
                          <div
                            className="w-12 h-12 rounded-lg border-2 border-white/30"
                            style={{ backgroundColor: selectedColor }}
                          />
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white/60 text-sm">Wheels</p>
                            <p className="text-white font-light">{currentWheels?.name}</p>
                          </div>
                          <p className="text-white/80">
                            {currentWheels?.price === 0 ? 'Included' : `+$${currentWheels?.price.toLocaleString()}`}
                          </p>
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white/60 text-sm">Interior</p>
                            <p className="text-white font-light">{currentInterior?.name}</p>
                          </div>
                          <p className="text-white/80">
                            {currentInterior?.price === 0 ? 'Included' : `+$${currentInterior?.price.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-white/30 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white/70 text-sm mb-1">Total Price</p>
                          <p className="text-3xl font-light text-white">${totalPrice.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-12 h-12 text-white/60" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Financing */}
                {step === 2 && (
                  <motion.div
                    key="financing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-light text-white mb-6">Financing Options</h3>

                    <div className="space-y-4">
                      <button
                        onClick={() => setFormData({ ...formData, financing: 'cash' })}
                        className={`w-full backdrop-blur-sm border rounded-xl p-6 text-left transition-all duration-300 ${
                          formData.financing === 'cash'
                            ? 'bg-white/20 border-white/60'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-white font-light text-lg mb-2">Full Payment</h4>
                            <p className="text-white/60 text-sm">Pay the full amount upfront</p>
                            <p className="text-white text-2xl font-light mt-3">${totalPrice.toLocaleString()}</p>
                          </div>
                          {formData.financing === 'cash' && (
                            <Check className="w-6 h-6 text-green-400" />
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setFormData({ ...formData, financing: 'loan' })}
                        className={`w-full backdrop-blur-sm border rounded-xl p-6 text-left transition-all duration-300 ${
                          formData.financing === 'loan'
                            ? 'bg-white/20 border-white/60'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-white font-light text-lg mb-2">Financing (60 months)</h4>
                            <p className="text-white/60 text-sm">3.9% APR with approved credit</p>
                            <p className="text-white text-2xl font-light mt-3">
                              ${Math.round(totalPrice / 60).toLocaleString()}/mo
                            </p>
                          </div>
                          {formData.financing === 'loan' && (
                            <Check className="w-6 h-6 text-green-400" />
                          )}
                        </div>
                      </button>

                      <button
                        onClick={() => setFormData({ ...formData, financing: 'lease' })}
                        className={`w-full backdrop-blur-sm border rounded-xl p-6 text-left transition-all duration-300 ${
                          formData.financing === 'lease'
                            ? 'bg-white/20 border-white/60'
                            : 'bg-white/10 border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-white font-light text-lg mb-2">Lease (36 months)</h4>
                            <p className="text-white/60 text-sm">12,000 miles per year</p>
                            <p className="text-white text-2xl font-light mt-3">
                              ${Math.round(totalPrice * 0.015).toLocaleString()}/mo
                            </p>
                          </div>
                          {formData.financing === 'lease' && (
                            <Check className="w-6 h-6 text-green-400" />
                          )}
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Dealer Selection */}
                {step === 3 && (
                  <motion.div
                    key="dealer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-light text-white mb-6">Select Dealer</h3>

                    <div className="space-y-4">
                      {dealers.map((dealer) => (
                        <button
                          key={dealer.id}
                          onClick={() => setFormData({ ...formData, dealer: dealer.id })}
                          className={`w-full backdrop-blur-sm border rounded-xl p-6 text-left transition-all duration-300 ${
                            formData.dealer === dealer.id
                              ? 'bg-white/20 border-white/60'
                              : 'bg-white/10 border-white/20 hover:bg-white/15'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white/60" />
                              </div>
                              <div>
                                <h4 className="text-white font-light text-lg mb-1">{dealer.name}</h4>
                                <p className="text-white/60 text-sm mb-2">{dealer.address}</p>
                                <p className="text-white/40 text-xs">{dealer.distance} away</p>
                              </div>
                            </div>
                            {formData.dealer === dealer.id && (
                              <Check className="w-6 h-6 text-green-400" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirm */}
                {step === 4 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-light text-white mb-6">Contact Information</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Preferred Delivery Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                          <input
                            type="date"
                            value={formData.deliveryDate}
                            onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                            className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/20">
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-xl font-light transition-all ${
                    step === 1
                      ? 'bg-white/5 text-white/30 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={step === 4 ? handleSubmit : handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-light"
                >
                  {step === 4 ? 'Submit Order' : 'Continue'}
                  {step < 4 && <ChevronRight className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
