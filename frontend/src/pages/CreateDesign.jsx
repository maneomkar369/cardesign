import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateDesign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('is_public', isPublic);
    tags.split(',').forEach(tag => formData.append('tags', tag.trim()));
    images.forEach(image => formData.append('images', image));

    try {
      const response = await axios.post('http://localhost:8000/api/designs/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/designs/${response.data.slug}`);
    } catch (error) {
      console.error('Error creating design:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      <div className="relative z-10 container mx-auto p-8 flex items-center justify-center min-h-screen">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">Create New Design</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              rows="4"
            />
            <input
              type="file"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 transition-all duration-300"
              accept="image/*"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            />
            <label className="flex items-center space-x-3 text-white">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-white/50 focus:ring-2"
              />
              <span>Public</span>
            </label>
            <button
              type="submit"
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-semibold"
            >
              Create Design
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDesign;