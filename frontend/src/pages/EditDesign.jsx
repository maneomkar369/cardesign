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
  const stageRef = useRef(null);

  useEffect(() => {
    fetchDesign();
    fetchAssets();
  }, [slug]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-white text-xl">Loading...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      <div className="relative z-10 container mx-auto p-8">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8">
          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Edit {design.title}</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4 shadow-xl">
                <Stage width={800} height={600} ref={stageRef} className="border border-white/20 rounded-lg">
                  <Layer>
                    <Rect x={0} y={0} width={800} height={600} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                    {/* Add base image and assets here */}
                  </Layer>
                </Stage>
              </div>
            </div>
            <div className="lg:w-80">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow-md">Assets</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {assets.map((asset) => (
                    <img key={asset.id} src={asset.file} alt={asset.name} className="w-full h-16 object-cover rounded-lg border border-white/20 cursor-pointer hover:border-white/50 transition-all duration-300" />
                  ))}
                </div>
                <button
                  onClick={handleSaveVersion}
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-semibold"
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