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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Car Design Gallery</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search designs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by tag..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {designs.map((design) => (
          <div key={design.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{design.title}</h2>
            <p>{design.description}</p>
            <p>By {design.author.username}</p>
            <p>Likes: {design.likes_count}</p>
            <a href={`/designs/${design.slug}`} className="text-blue-500">View</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;