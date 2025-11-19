import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva';
import Konva from 'konva';
import axios from 'axios';

const EditDesign = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [assets, setAssets] = useState([]);
  const [stage, setStage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchDesign();
    fetchAssets();
  }, [slug]);

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

  const fetchDesign = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/designs/${slug}/`);
      setDesign(response.data);
    } catch (error) {
      console.error('Error fetching design:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/assets/');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleSaveVersion = async () => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL();
    const blob = await fetch(dataURL).then(res => res.blob());
    const formData = new FormData();
    formData.append('state', JSON.stringify({ /* editor state */ }));
    formData.append('thumbnail', blob, 'thumbnail.png');

    try {
      await axios.post(`http://localhost:8000/api/designs/${slug}/versions/`, formData);
      alert('Version saved!');
    } catch (error) {
      console.error('Error saving version:', error);
    }
  };

  if (!design) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-white text-xl">Loading...</div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto p-8">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
          {/* Interactive highlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          ></div>

          {/* Subtle reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg relative z-10 group-hover:text-white transition-colors duration-300">Edit {design.title}</h1>
          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            <div className="flex-1">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4 shadow-xl hover:bg-white/15 transition-all duration-300">
                <Stage width={800} height={600} ref={stageRef} className="border border-white/20 rounded-lg">
                  <Layer>
                    <Rect x={0} y={0} width={800} height={600} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                    {/* Add base image and assets here */}
                  </Layer>
                </Stage>
              </div>
            </div>
            <div className="lg:w-80">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl hover:bg-white/15 transition-all duration-300 relative overflow-hidden group">
                {/* Interactive highlight effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePos.x - 320}px ${mousePos.y - 200}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
                  }}
                ></div>

                <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow-md relative z-10 group-hover:text-white transition-colors duration-300">Assets</h2>
                <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                  {assets.map((asset) => (
                    <img key={asset.id} src={asset.file} alt={asset.name} className="w-full h-16 object-cover rounded-lg border border-white/20 cursor-pointer hover:border-white/50 transition-all duration-300 hover:scale-105" />
                  ))}
                </div>
                <button
                  onClick={handleSaveVersion}
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-semibold hover:bg-white/40 hover:border-white/40 relative z-10"
                >
                  Save Version
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDesign;