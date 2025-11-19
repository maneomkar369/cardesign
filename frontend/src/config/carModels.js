/**
 * Car Models Configuration
 * Define all available car models for the 3D configurator
 */

export const carModels = [
  {
    id: 'bmw-m4-csl',
    name: 'BMW M4 CSL',
    brand: 'BMW',
    year: 2023,
    category: 'Sports Coupe',
    modelPath: '/models/bmw-m4/bmw_m4csl.glb',
    format: 'glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    colors: [
      { name: 'Brooklyn Grey', hex: '#3d3d3d', price: 0 },
      { name: 'Frozen Black', hex: '#0a0a0a', price: 1500 },
      { name: 'Toronto Red', hex: '#b91c1c', price: 2000 },
      { name: 'Sao Paulo Yellow', hex: '#fbbf24', price: 2500 },
      { name: 'Alpine White', hex: '#f8f9fa', price: 1000 },
      { name: 'San Marino Blue', hex: '#1e40af', price: 2000 }
    ],
    specs: {
      horsepower: 543,
      torque: '650 Nm',
      acceleration: '3.7s',
      topSpeed: '302 km/h',
      range: 'N/A',
      efficiency: 'N/A'
    },
    basePrice: 139000
  },
  {
    id: 'porsche-gt3-rs',
    name: 'Porsche 911 GT3 RS',
    brand: 'Porsche',
    year: 2023,
    category: 'Sports Car',
    modelPath: '/models/porsche-gt3/scene.glb',
    format: 'glb',
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    colors: [
      { name: 'Guards Red', hex: '#c41e3a', price: 0 },
      { name: 'Racing Yellow', hex: '#ffd700', price: 3200 },
      { name: 'GT Silver', hex: '#c0c0c0', price: 1200 },
      { name: 'Lizard Green', hex: '#7cb342', price: 3800 },
      { name: 'Miami Blue', hex: '#00bcd4', price: 3800 },
      { name: 'Lava Orange', hex: '#ff6b35', price: 3800 }
    ],
    specs: {
      horsepower: 525,
      torque: '465 Nm',
      acceleration: '3.2s',
      topSpeed: '296 km/h',
      range: 'N/A',
      efficiency: 'N/A'
    },
    basePrice: 223800
  },
  {
    id: 'lamborghini-aventador',
    name: 'Lamborghini Aventador SVJ',
    brand: 'Lamborghini',
    year: 2022,
    category: 'Supercar',
    modelPath: '/models/aventador/Avent_sport.obj',
    format: 'obj',
    mtlPath: '/models/aventador/Avent_sport.mtl',
    scale: 0.01,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI, 0],
    colors: [
      { name: 'Rosso Mars', hex: '#8B0000', price: 0 },
      { name: 'Giallo Orion', hex: '#FFD700', price: 15000 },
      { name: 'Nero Aldebaran', hex: '#0a0a0a', price: 12000 },
      { name: 'Verde Mantis', hex: '#32CD32', price: 18000 },
      { name: 'Bianco Icarus', hex: '#F5F5F5', price: 14000 },
      { name: 'Blu Cepheus', hex: '#1e40af', price: 16000 }
    ],
    specs: {
      horsepower: 770,
      torque: '720 Nm',
      acceleration: '2.8s',
      topSpeed: '350 km/h',
      range: 'N/A',
      efficiency: 'N/A'
    },
    basePrice: 517700
  },
  {
    id: 'bugatti-veyron',
    name: 'Bugatti Veyron',
    brand: 'Bugatti',
    year: 2015,
    category: 'Hypercar',
    modelPath: '/models/bugatti/bugatti/bugatti.obj',
    format: 'obj',
    mtlPath: '/models/bugatti/bugatti/bugatti.mtl',
    scale: 0.8,
    position: [0, -0.3, 0],
    rotation: [0, Math.PI, 0],
    colors: [
      { name: 'Black Carbon', hex: '#0a0a0a', price: 0 },
      { name: 'Bugatti Blue', hex: '#1e3a8a', price: 25000 },
      { name: 'Royal Red', hex: '#dc2626', price: 22000 },
      { name: 'Silver Arrow', hex: '#d1d5db', price: 20000 },
      { name: 'Heritage Orange', hex: '#ff6b35', price: 28000 }
    ],
    specs: {
      horsepower: 1200,
      torque: '1500 Nm',
      acceleration: '2.5s',
      topSpeed: '407 km/h',
      range: 'N/A',
      efficiency: 'N/A'
    },
    basePrice: 1900000
  },
  {
    id: 'chevrolet-camaro',
    name: 'Chevrolet Camaro ZL1',
    brand: 'Chevrolet',
    year: 2023,
    category: 'Muscle Car',
    modelPath: '/models/camaro/CHEVROLET_CAMARO_BB/obj/CAMARO.obj',
    format: 'obj',
    mtlPath: '/models/camaro/CHEVROLET_CAMARO_BB/obj/CAMARO.mtl',
    scale: 1,
    position: [0, -0.8, 0],
    rotation: [0, Math.PI, 0],
    colors: [
      { name: 'Black', hex: '#000000', price: 0 },
      { name: 'Rally Yellow', hex: '#fbbf24', price: 595 },
      { name: 'Red Hot', hex: '#dc2626', price: 395 },
      { name: 'Summit White', hex: '#ffffff', price: 395 },
      { name: 'Riverside Blue', hex: '#1e40af', price: 395 },
      { name: 'Shadow Gray', hex: '#6b7280', price: 395 }
    ],
    specs: {
      horsepower: 650,
      torque: '881 Nm',
      acceleration: '3.5s',
      topSpeed: '314 km/h',
      range: 'N/A',
      efficiency: 'N/A'
    },
    basePrice: 71350
  },
  {
    id: 'peugeot-onyx',
    name: 'Peugeot Onyx Concept',
    brand: 'Peugeot',
    year: 2012,
    category: 'Concept Car',
    modelPath: '/models/peugeot-onyx/3D models/PeugeotOnyxConcept.obj',
    format: 'obj',
    mtlPath: '/models/peugeot-onyx/3D models/PeugeotOnyxConcept.mtl',
    scale: 1.2,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI, 0],
    colors: [
      { name: 'Copper', hex: '#b87333', price: 0 },
      { name: 'Matte Black', hex: '#1a1a1a', price: 5000 },
      { name: 'Carbon Fiber', hex: '#2d2d2d', price: 8000 },
      { name: 'Metallic Grey', hex: '#6b7280', price: 4000 }
    ],
    specs: {
      horsepower: 600,
      torque: '700 Nm',
      acceleration: '3.0s',
      topSpeed: '350 km/h',
      range: 'N/A',
      efficiency: 'N/A'
    },
    basePrice: 2500000
  }
];

// Get car by ID
export const getCarById = (id) => {
  return carModels.find(car => car.id === id);
};

// Get cars by brand
export const getCarsByBrand = (brand) => {
  return carModels.filter(car => car.brand === brand);
};

// Get all brands
export const getAllBrands = () => {
  return [...new Set(carModels.map(car => car.brand))];
};

export default carModels;
