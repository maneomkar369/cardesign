import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
      setDesigns(response.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
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

          <h1 className="text-5xl font-bold text-white mb-6 text-center drop-shadow-lg relative z-10">
            Car Design Gallery
          </h1>
          <div className="flex gap-4 justify-center mb-6 relative z-10">
            <input
              type="text"
              placeholder="Search designs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25"
            />
            <input
              type="text"
              placeholder="Filter by tag..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25"
            />
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

              <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-md relative z-10 group-hover:text-white transition-colors duration-300">{design.title}</h2>
              <p className="text-white/80 mb-4 relative z-10 group-hover:text-white/90 transition-colors duration-300">{design.description}</p>
              <p className="text-white/60 mb-2 relative z-10">By {design.author.username}</p>
              <p className="text-white/60 mb-4 relative z-10">Likes: {design.likes_count}</p>
              <a
                href={`/designs/${design.slug}`}
                className="inline-block backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all duration-300 relative z-10 group-hover:bg-white/40 group-hover:border-white/40"
              >
                View Design
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;