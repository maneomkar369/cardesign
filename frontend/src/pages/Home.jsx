import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Filter, Eye, Heart, User, Plus, Sparkles, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [designs, setDesigns] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    fetchDesigns();
  }, [search, tag]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const fetchDesigns = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (tag) params.tag = tag;
      const response = await axios.get('http://localhost:8000/api/designs/', { params });
      
      // Map API data to include placeholder images
      const designsWithImages = response.data.map((design, index) => ({
        ...design,
        // Use the first image if available, otherwise use a placeholder based on index
        image: design.images && design.images.length > 0 
          ? design.images[0].image 
          : getPlaceholderImage(design.slug, index)
      }));
      
      setDesigns(designsWithImages);
    } catch (error) {
      console.error('Error fetching designs:', error);
      setDesigns([]);
    }
  };

  const getPlaceholderImage = (slug, index) => {
    // Map specific car slugs to appropriate Unsplash images
    const imageMap = {
      'cyber-phantom-gt': 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800',
      'urban-ev-compact': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
      'apex-roadster': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      'neo-safari-cruiser': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'volt-sedan-pro': 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
      'thunder-truck-x': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      'zenith-coupe': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      'prism-crossover': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'aero-sport': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      'futuristic-sedan': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
      'off-road-suv': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'luxury-coupe': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
    };
    
    return imageMap[slug] || `https://images.unsplash.com/photo-${1603584173870 + index}?w=800`;
  };


  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Floating Glass Panels */}
      <div className="relative z-10 container mx-auto p-8">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
          {/* Interactive highlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          ></div>

          <div className="flex items-center justify-center mb-6 relative z-10">
            <Sparkles className="w-8 h-8 text-white/80 mr-3" />
            <h1 className="text-4xl font-light text-white tracking-wide">
              Car Design Gallery
            </h1>
            <Sparkles className="w-8 h-8 text-white/80 ml-3" />
          </div>

          <div className="flex gap-4 justify-center mb-6 relative z-10">
            <Link
              to="/configurator"
              className="flex items-center gap-3 backdrop-blur-sm bg-gradient-to-r from-blue-500/80 to-cyan-400/80 hover:from-blue-600/90 hover:to-cyan-500/90 border border-white/30 rounded-xl px-6 py-3 text-white transition-all duration-300 shadow-lg hover:shadow-xl font-light"
            >
              <Settings className="w-5 h-5" />
              Launch 3D Configurator
            </Link>
          </div>

          <div className="flex gap-4 justify-center mb-6 relative z-10 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search designs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25 font-light"
              />
            </div>
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Filter by tag..."
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25 font-light"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designs.map((design) => (
              <div
                key={design.id}
                className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105 relative overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredCard(design.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Interactive highlight effect */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${hoveredCard === design.id ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    background: `radial-gradient(circle at ${mousePos.x - 200}px ${mousePos.y - 150}px, rgba(255,255,255,0.15) 0%, transparent 60%)`
                  }}
                ></div>

                {/* Subtle reflection effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Car Image */}
                  {design.image && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-white/20">
                      <img 
                        src={design.image} 
                        alt={design.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-light text-white tracking-wide truncate group-hover:text-white transition-colors duration-300">
                      {design.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60 font-light">{design.views || 0}</span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm font-light mb-4 line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                    {design.description}
                  </p>

                  {/* Tags */}
                  {design.tags && design.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {design.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs text-white/80 font-light"
                        >
                          #{typeof tag === 'string' ? tag : tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60 font-light">
                        {design.author.username}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/60 font-light">{design.likes_count}</span>
                    </div>
                  </div>

                  <a
                    href={`/designs/${design.slug}`}
                    className="inline-flex items-center justify-center w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all duration-300 relative z-10 group-hover:bg-white/40 group-hover:border-white/40 font-light"
                  >
                    View Design
                  </a>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;