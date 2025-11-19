import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import DesignDetail from './pages/DesignDetail';
import CreateDesign from './pages/CreateDesign';
import EditDesign from './pages/EditDesign';

// Dynamic background component with car visuals
const DynamicBackground = () => {
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    {
      gradient: 'from-red-900 via-orange-900 to-yellow-900',
      carImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-red-500/20 to-orange-500/20',
      accent: 'from-red-400/10 to-transparent'
    },
    {
      gradient: 'from-blue-900 via-purple-900 to-indigo-900',
      carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-blue-500/20 to-purple-500/20',
      accent: 'from-blue-400/10 to-transparent'
    },
    {
      gradient: 'from-green-900 via-teal-900 to-cyan-900',
      carImage: 'https://images.unsplash.com/photo-1544829099-b9a0e3421ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-green-500/20 to-teal-500/20',
      accent: 'from-green-400/10 to-transparent'
    },
    {
      gradient: 'from-gray-900 via-slate-900 to-zinc-900',
      carImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-gray-500/20 to-slate-500/20',
      accent: 'from-gray-400/10 to-transparent'
    },
    {
      gradient: 'from-purple-900 via-pink-900 to-rose-900',
      carImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-purple-500/20 to-pink-500/20',
      accent: 'from-purple-400/10 to-transparent'
    },
    {
      gradient: 'from-amber-900 via-yellow-900 to-orange-900',
      carImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-amber-500/20 to-yellow-500/20',
      accent: 'from-amber-400/10 to-transparent'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 10000); // Change background every 10 seconds for better viewing

    return () => clearInterval(interval);
  }, []);

  const bg = backgrounds[currentBg];

  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient} transition-all duration-3000 ease-in-out`}></div>

      {/* Car image overlay with smooth transitions */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 transition-all duration-3000 ease-in-out"
        style={{ backgroundImage: `url('${bg.carImage}')` }}
      ></div>

      {/* Additional gradient overlay for depth */}
      <div className={`absolute inset-0 bg-gradient-to-t ${bg.overlay} transition-all duration-3000 ease-in-out`}></div>

      {/* Accent gradient for extra depth */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg.accent}`}></div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-white/12 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-1.5 h-1.5 bg-white/8 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/6 w-2 h-2 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen relative">
        <DynamicBackground />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/designs/:slug" element={<DesignDetail />} />
            <Route path="/create" element={<CreateDesign />} />
            <Route path="/designs/:slug/edit" element={<EditDesign />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
