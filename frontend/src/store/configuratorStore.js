import { create } from 'zustand';

export const useConfiguratorStore = create((set) => ({
  // Vehicle Configuration
  selectedColor: '#1a1a1a',
  selectedWheels: 'sport',
  selectedInterior: 'black-leather',
  selectedModel: 'sedan',
  
  // Customization Options
  colors: [
    { id: 'midnight-black', name: 'Midnight Black', hex: '#1a1a1a' },
    { id: 'pearl-white', name: 'Pearl White', hex: '#f8f9fa' },
    { id: 'racing-red', name: 'Racing Red', hex: '#dc3545' },
    { id: 'deep-blue', name: 'Deep Blue', hex: '#0d6efd' },
    { id: 'silver-metallic', name: 'Silver Metallic', hex: '#adb5bd' },
    { id: 'electric-yellow', name: 'Electric Yellow', hex: '#ffc107' },
    { id: 'emerald-green', name: 'Emerald Green', hex: '#198754' },
    { id: 'sunset-orange', name: 'Sunset Orange', hex: '#fd7e14' }
  ],
  
  wheels: [
    { id: 'sport', name: 'Sport 19"', price: 0, image: '/wheels/sport.png' },
    { id: 'performance', name: 'Performance 20"', price: 2500, image: '/wheels/performance.png' },
    { id: 'luxury', name: 'Luxury 21"', price: 4000, image: '/wheels/luxury.png' },
    { id: 'carbon', name: 'Carbon Fiber 22"', price: 8000, image: '/wheels/carbon.png' }
  ],
  
  interiors: [
    { id: 'black-leather', name: 'Black Leather', price: 0 },
    { id: 'tan-leather', name: 'Tan Leather', price: 1500 },
    { id: 'red-sport', name: 'Red Sport', price: 3000 },
    { id: 'white-luxury', name: 'White Luxury', price: 4500 },
    { id: 'carbon-tech', name: 'Carbon Tech', price: 6000 }
  ],
  
  // Camera Controls
  cameraPosition: [5, 2, 5],
  cameraTarget: [0, 0, 0],
  autoRotate: true,
  
  // Performance Stats
  performanceStats: {
    horsepower: 450,
    torque: 420,
    acceleration: 3.5,
    topSpeed: 180,
    range: 350,
    efficiency: 95
  },
  
  // User Configurations
  savedConfigurations: [],
  currentConfigName: 'My Custom Car',
  
  // AR Mode
  arMode: false,
  
  // Actions
  setColor: (color) => set({ selectedColor: color }),
  setWheels: (wheels) => set({ selectedWheels: wheels }),
  setInterior: (interior) => set({ selectedInterior: interior }),
  setModel: (model) => set({ selectedModel: model }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setAutoRotate: (rotate) => set({ autoRotate: rotate }),
  setArMode: (mode) => set({ arMode: mode }),
  
  saveConfiguration: () => set((state) => ({
    savedConfigurations: [
      ...state.savedConfigurations,
      {
        id: Date.now(),
        name: state.currentConfigName,
        color: state.selectedColor,
        wheels: state.selectedWheels,
        interior: state.selectedInterior,
        model: state.selectedModel,
        timestamp: new Date().toISOString()
      }
    ]
  })),
  
  loadConfiguration: (config) => set({
    selectedColor: config.color,
    selectedWheels: config.wheels,
    selectedInterior: config.interior,
    selectedModel: config.model
  }),
  
  calculateTotalPrice: () => {
    const state = useConfiguratorStore.getState();
    const basePrice = 45000;
    const wheelPrice = state.wheels.find(w => w.id === state.selectedWheels)?.price || 0;
    const interiorPrice = state.interiors.find(i => i.id === state.selectedInterior)?.price || 0;
    return basePrice + wheelPrice + interiorPrice;
  }
}));
