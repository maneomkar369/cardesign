import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Home from './pages/Home';
import DesignDetail from './pages/DesignDetail';
import CreateDesign from './pages/CreateDesign';
import EditDesign from './pages/EditDesign';

// Dynamic background component with car visuals and mouse interaction
const DynamicBackground = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);

  const backgrounds = [
    {
      gradient: 'from-red-900 via-orange-900 to-yellow-900',
      carImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-red-500/20 to-orange-500/20',
      accent: 'from-red-400/10 to-transparent',
      glowColor: 'shadow-red-500/20'
    },
    {
      gradient: 'from-blue-900 via-purple-900 to-indigo-900',
      carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-blue-500/20 to-purple-500/20',
      accent: 'from-blue-400/10 to-transparent',
      glowColor: 'shadow-blue-500/20'
    },
    {
      gradient: 'from-green-900 via-teal-900 to-cyan-900',
      carImage: 'https://images.unsplash.com/photo-1544829099-b9a0e3421ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-green-500/20 to-teal-500/20',
      accent: 'from-green-400/10 to-transparent',
      glowColor: 'shadow-green-500/20'
    },
    {
      gradient: 'from-gray-900 via-slate-900 to-zinc-900',
      carImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-gray-500/20 to-slate-500/20',
      accent: 'from-gray-400/10 to-transparent',
      glowColor: 'shadow-gray-500/20'
    },
    {
      gradient: 'from-purple-900 via-pink-900 to-rose-900',
      carImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-purple-500/20 to-pink-500/20',
      accent: 'from-purple-400/10 to-transparent',
      glowColor: 'shadow-purple-500/20'
    },
    {
      gradient: 'from-amber-900 via-yellow-900 to-orange-900',
      carImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      overlay: 'from-amber-500/20 to-yellow-500/20',
      accent: 'from-amber-400/10 to-transparent',
      glowColor: 'shadow-amber-500/20'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const bg = backgrounds[currentBg];

  return (
    <div ref={backgroundRef} className="fixed inset-0 -z-10 overflow-hidden">
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

      {/* Interactive cursor-following light effect */}
      <div
        className={`absolute w-96 h-96 ${bg.glowColor} rounded-full blur-3xl opacity-30 transition-all duration-1000 ease-out pointer-events-none`}
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`
        }}
      ></div>

      {/* Magnetic floating elements that respond to cursor */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-3 h-3 bg-white/10 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${20 + (mousePos.x / window.innerWidth) * 10}%`,
            top: `${25 + (mousePos.y / window.innerHeight) * 10}%`,
            animationDelay: '0s',
            transform: `translate(${(mousePos.x - window.innerWidth/2) * 0.02}px, ${(mousePos.y - window.innerHeight/2) * 0.02}px)`
          }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-white/15 rounded-full transition-all duration-1200 ease-out"
          style={{
            right: `${25 + (mousePos.x / window.innerWidth) * -8}%`,
            top: `${75 + (mousePos.y / window.innerHeight) * 8}%`,
            animationDelay: '1s',
            transform: `translate(${(mousePos.x - window.innerWidth/2) * -0.015}px, ${(mousePos.y - window.innerHeight/2) * -0.015}px)`
          }}
        ></div>
        <div
          className="absolute w-2.5 h-2.5 bg-white/12 rounded-full transition-all duration-800 ease-out"
          style={{
            left: `${75 + (mousePos.x / window.innerWidth) * -12}%`,
            top: `${50 + (mousePos.y / window.innerHeight) * -12}%`,
            animationDelay: '2s',
            transform: `translate(${(mousePos.x - window.innerWidth/2) * 0.025}px, ${(mousePos.y - window.innerHeight/2) * 0.025}px)`
          }}
        ></div>
        <div
          className="absolute w-1.5 h-1.5 bg-white/8 rounded-full transition-all duration-1500 ease-out"
          style={{
            right: `${30 + (mousePos.x / window.innerWidth) * 15}%`,
            top: `${15 + (mousePos.y / window.innerHeight) * -15}%`,
            animationDelay: '3s',
            transform: `translate(${(mousePos.x - window.innerWidth/2) * -0.02}px, ${(mousePos.y - window.innerHeight/2) * -0.02}px)`
          }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-white/10 rounded-full transition-all duration-1100 ease-out"
          style={{
            left: `${15 + (mousePos.x / window.innerWidth) * 20}%`,
            bottom: `${20 + (mousePos.y / window.innerHeight) * 20}%`,
            animationDelay: '4s',
            transform: `translate(${(mousePos.x - window.innerWidth/2) * 0.018}px, ${(mousePos.y - window.innerHeight/2) * 0.018}px)`
          }}
        ></div>
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
