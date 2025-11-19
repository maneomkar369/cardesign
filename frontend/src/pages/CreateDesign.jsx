import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Upload, Tag, Eye, EyeOff, Sparkles } from 'lucide-react';

const CreateDesign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

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
    <div ref={containerRef} onMouseMove={handleMouseMove} className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto p-8 flex items-center justify-center min-h-screen">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
          {/* Interactive highlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          ></div>

          {/* Subtle reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex items-center justify-center mb-8 relative z-10">
            <Sparkles className="w-8 h-8 text-white/80 mr-3" />
            <h1 className="text-3xl font-light text-white tracking-wide">
              Create New Design
            </h1>
            <Sparkles className="w-8 h-8 text-white/80 ml-3" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Design title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg pl-4 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25 font-light"
                required
              />
            </div>

            <div className="relative">
              <textarea
                placeholder="Describe your design..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25 font-light resize-none"
                rows="4"
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Upload className="w-5 h-5 text-white/60" />
                <span className="text-white/60 font-light text-sm">Upload Images</span>
              </div>
              <input
                type="file"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-light file:bg-white/20 file:text-white hover:file:bg-white/30 transition-all duration-300 font-light"
                accept="image/*"
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Tag className="w-5 h-5 text-white/60" />
                <span className="text-white/60 font-light text-sm">Tags</span>
              </div>
              <input
                type="text"
                placeholder="futuristic, electric, concept..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25 font-light"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Eye className="w-5 h-5 text-white/60" />
                ) : (
                  <EyeOff className="w-5 h-5 text-white/60" />
                )}
                <span className="text-white/60 font-light">Public design</span>
              </div>
              <label className="flex items-center space-x-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-white/50 focus:ring-2"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-light hover:bg-white/40 hover:border-white/40"
            >
              <Plus className="w-5 h-5" />
              Create Design
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDesign;