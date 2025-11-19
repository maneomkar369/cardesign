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

  if (!design) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit {design.title}</h1>
      <div className="flex">
        <div className="w-3/4">
          <Stage width={800} height={600} ref={stageRef}>
            <Layer>
              <Rect x={0} y={0} width={800} height={600} fill="lightblue" />
              {/* Add base image and assets here */}
            </Layer>
          </Stage>
        </div>
        <div className="w-1/4 pl-4">
          <h2>Assets</h2>
          {assets.map((asset) => (
            <img key={asset.id} src={asset.file} alt={asset.name} className="w-16 h-16 cursor-pointer" />
          ))}
          <button onClick={handleSaveVersion} className="bg-green-500 text-white p-2 rounded mt-4">Save Version</button>
        </div>
      </div>
    </div>
  );
};

export default EditDesign;