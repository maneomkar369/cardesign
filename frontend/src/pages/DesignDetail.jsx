import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DesignDetail = () => {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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

          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg relative z-10 group-hover:text-white transition-colors duration-300">{design.title}</h1>
          <p className="text-white/80 mb-4 relative z-10 group-hover:text-white/90 transition-colors duration-300">{design.description}</p>
          <p className="text-white/60 mb-2 relative z-10">By {design.author.username}</p>
          <p className="text-white/60 mb-4 relative z-10">Likes: {design.likes_count}</p>
          <button
            onClick={handleLike}
            className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 mr-4 relative z-10 hover:bg-white/40 hover:border-white/40"
          >
            Like
          </button>
          <a
            href={`/designs/${design.slug}/edit`}
            className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 relative z-10 hover:bg-white/40 hover:border-white/40"
          >
            Edit Design
          </a>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:bg-white/15 transition-all duration-500">
          {/* Interactive highlight effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
          ></div>

          {/* Subtle reflection effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <h2 className="text-3xl font-semibold text-white mb-6 drop-shadow-md relative z-10 group-hover:text-white transition-colors duration-300">Comments</h2>
          <div className="space-y-4 mb-6 relative z-10">
            {comments.map((comment) => (
              <div key={comment.id} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                <p className="text-white/80">{comment.text}</p>
                <p className="text-white/60 text-sm">By {comment.user.username}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 relative z-10">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:bg-white/25 focus:bg-white/25"
              placeholder="Add a comment..."
              rows="3"
            />
            <button
              onClick={handleComment}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 font-semibold hover:bg-white/40 hover:border-white/40"
            >
              Comment
            </button>
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white mb-6 drop-shadow-md">Comments</h2>
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg p-4">
                <p className="text-white/80">{comment.text}</p>
                <p className="text-white/60 text-sm">By {comment.user.username}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              placeholder="Add a comment..."
              rows="3"
            />
            <button
              onClick={handleComment}
              className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetail;