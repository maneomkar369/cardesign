import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart, MessageCircle, Edit, User, Eye, Car, Palette, Zap, Gauge, Fuel, Settings, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';

const DesignDetail = () => {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    fetchDesign();
    fetchComments();
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

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/designs/${slug}/comments/`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:8000/api/designs/${slug}/like/`);
      fetchDesign(); // Refresh likes count
    } catch (error) {
      console.error('Error liking design:', error);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(`http://localhost:8000/api/designs/${slug}/comments/`, { text: newComment });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Mock data for interior and exterior features (in a real app, this would come from the API)
  const getInteriorFeatures = (design) => {
    const features = {
      'cyber-phantom-gt': [
        { name: 'Holographic Dashboard', description: 'Interactive holographic display with gesture controls', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
        { name: 'Premium Leather Seats', description: 'Hand-stitched Italian leather with massage function', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600' },
        { name: 'Ambient Lighting', description: '64-color LED ambient lighting system', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600' }
      ],
      'urban-ev-compact': [
        { name: 'Smart Infotainment', description: 'Voice-controlled system with app integration', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600' },
        { name: 'Sustainable Materials', description: 'Bamboo and recycled plastic interior panels', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
        { name: 'Compact Storage', description: 'Modular storage solutions for urban living', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600' }
      ],
      'apex-roadster': [
        { name: 'Sport Seats', description: 'Carbon fiber racing seats with harness compatibility', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600' },
        { name: 'Alcantara Trim', description: 'Premium suede-like material throughout cabin', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600' },
        { name: 'Biometric Access', description: 'Fingerprint and facial recognition entry', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600' }
      ]
    };
    return features[design?.slug] || [
      { name: 'Premium Interior', description: 'High-quality materials and craftsmanship', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600' },
      { name: 'Advanced Technology', description: 'Latest infotainment and connectivity features', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600' },
      { name: 'Comfort Features', description: 'Ergonomic design for optimal comfort', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600' }
    ];
  };

  const getExteriorFeatures = (design) => {
    const features = {
      'cyber-phantom-gt': [
        { name: 'Adaptive Aerodynamics', description: 'Active spoilers and underbody panels', image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600' },
        { name: 'LED Matrix Lighting', description: 'Quantum-dot LED headlights with laser high beams', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
        { name: 'Carbon Fiber Body', description: 'Monocoque construction with active suspension', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600' }
      ],
      'urban-ev-compact': [
        { name: 'Smart Glass', description: 'Electrochromic windows with privacy tinting', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600' },
        { name: '360° Cameras', description: 'Full surround view monitoring system', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600' },
        { name: 'Solar Panels', description: 'Integrated solar charging system', image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600' }
      ],
      'apex-roadster': [
        { name: 'Retractable Hardtop', description: 'Electric convertible roof with carbon fiber construction', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600' },
        { name: 'Ceramic Brakes', description: 'High-performance braking system with diamond-like coating', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600' },
        { name: 'Active Aero', description: 'Variable geometry front bumper and rear diffuser', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600' }
      ]
    };
    return features[design?.slug] || [
      { name: 'Aerodynamic Design', description: 'Optimized for efficiency and performance', image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=600' },
      { name: 'Advanced Lighting', description: 'Modern LED lighting technology', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
      { name: 'Premium Materials', description: 'High-quality exterior finishes', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600' }
    ];
  };

  const getTechnicalSpecs = (design) => {
    const specs = {
      'cyber-phantom-gt': {
        power: '1000+ hp',
        acceleration: '0-60 mph in 1.9s',
        range: '400 miles',
        topSpeed: '220 mph',
        drivetrain: 'All-wheel drive',
        battery: '120 kWh'
      },
      'urban-ev-compact': {
        power: '150 hp',
        acceleration: '0-60 mph in 7.2s',
        range: '200 miles',
        topSpeed: '120 mph',
        drivetrain: 'Front-wheel drive',
        battery: '45 kWh'
      },
      'apex-roadster': {
        power: '550 hp',
        acceleration: '0-60 mph in 3.1s',
        range: '300 miles',
        topSpeed: '200 mph',
        drivetrain: 'Rear-wheel drive',
        battery: '85 kWh'
      }
    };
    return specs[design?.slug] || {
      power: 'TBD hp',
      acceleration: 'TBD',
      range: 'TBD miles',
      topSpeed: 'TBD mph',
      drivetrain: 'TBD',
      battery: 'TBD kWh'
    };
  };

  if (!design) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="text-white text-xl">Loading...</div>
      </div>
    </div>
  );

  const interiorFeatures = getInteriorFeatures(design);
  const exteriorFeatures = getExteriorFeatures(design);
  const specs = getTechnicalSpecs(design);
  const allImages = design.images || [];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto p-8">
        {/* Header Section */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
          {/* Interactive highlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          ></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Car className="w-8 h-8 text-white/80" />
                <h1 className="text-4xl font-light text-white tracking-wide">
                  {design.title}
                </h1>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all duration-300 hover:bg-white/40 hover:border-white/40 font-light"
                >
                  <Heart className="w-4 h-4" />
                  {design.likes_count}
                </button>
                <a
                  href={`/designs/${design.slug}/edit`}
                  className="flex items-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white hover:bg-white/30 transition-all duration-300 hover:bg-white/40 hover:border-white/40 font-light"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </a>
              </div>
            </div>

            <p className="text-white/70 text-lg font-light mb-6 group-hover:text-white/80 transition-colors duration-300">
              {design.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 font-light">
                    {design.author.username}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-white/60" />
                  <span className="text-white/60 font-light">{design.views || 0}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {design.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-4 py-2 text-sm text-white/80 font-light"
                  >
                    #{typeof tag === 'string' ? tag : tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Car },
            { id: 'interior', label: 'Interior', icon: Palette },
            { id: 'exterior', label: 'Exterior', icon: Settings },
            { id: 'specs', label: 'Specifications', icon: Gauge },
            { id: 'gallery', label: 'Gallery', icon: Camera },
            { id: 'comments', label: 'Comments', icon: MessageCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 backdrop-blur-sm border rounded-lg px-6 py-3 font-light transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white/30 border-white/40 text-white'
                  : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20 hover:border-white/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Image */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-2xl font-light text-white mb-4">Design Preview</h3>
              {allImages.length > 0 ? (
                <img
                  src={allImages[0].image}
                  alt={design.title}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedImage(allImages[0].image)}
                />
              ) : (
                <div className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center">
                  <Car className="w-16 h-16 text-white/40" />
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-2xl font-light text-white mb-4">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80">{specs.power}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-green-400" />
                  <span className="text-white/80">{specs.acceleration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-yellow-400" />
                  <span className="text-white/80">{specs.range} range</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interior' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-white mb-6">Interior Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interiorFeatures.map((feature, index) => (
                <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300">
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage(feature.image)}
                  />
                  <h4 className="text-xl font-light text-white mb-2">{feature.name}</h4>
                  <p className="text-white/70 text-sm font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exterior' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-white mb-6">Exterior Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exteriorFeatures.map((feature, index) => (
                <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300">
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage(feature.image)}
                  />
                  <h4 className="text-xl font-light text-white mb-2">{feature.name}</h4>
                  <p className="text-white/70 text-sm font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-light text-white mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 font-light">Power Output</span>
                  <span className="text-white font-light">{specs.power}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 font-light">Acceleration</span>
                  <span className="text-white font-light">{specs.acceleration}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 font-light">Range</span>
                  <span className="text-white font-light">{specs.range}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 font-light">Top Speed</span>
                  <span className="text-white font-light">{specs.topSpeed}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 font-light">Drivetrain</span>
                  <span className="text-white font-light">{specs.drivetrain}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 font-light">Battery Capacity</span>
                  <span className="text-white font-light">{specs.battery}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-white mb-6">Image Gallery</h2>
            {allImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allImages.map((image, index) => (
                  <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl">
                    <img
                      src={image.image}
                      alt={`${design.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => setSelectedImage(image.image)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl text-center">
                <Camera className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 font-light">No additional images available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-white/80" />
              <h2 className="text-2xl font-light text-white tracking-wide">
                Comments ({comments.length})
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                  <p className="text-white/70 font-light mb-2">{comment.text}</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm font-light">
                      {comment.user.username}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25 font-light"
                placeholder="Add a comment..."
                rows="3"
              />
              <button
                onClick={handleComment}
                className="flex items-center gap-2 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-light hover:bg-white/40 hover:border-white/40"
              >
                <MessageCircle className="w-4 h-4" />
                Comment
              </button>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Design detail"
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignDetail;