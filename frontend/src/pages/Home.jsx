import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [designs, setDesigns] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchDesigns();
  }, [search, tag]);

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Glass Panels */}
      <div className="relative z-10 container mx-auto p-8">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8">
          <h1 className="text-5xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Car Design Gallery
          </h1>
          <div className="flex gap-4 justify-center mb-6">
            <input
              type="text"
              placeholder="Search designs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Filter by tag..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designs.map((design) => (
            <div
              key={design.id}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">{design.title}</h2>
              <p className="text-white/80 mb-4">{design.description}</p>
              <p className="text-white/60 mb-2">By {design.author.username}</p>
              <p className="text-white/60 mb-4">Likes: {design.likes_count}</p>
              <a
                href={`/designs/${design.slug}`}
                className="inline-block backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all duration-300"
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