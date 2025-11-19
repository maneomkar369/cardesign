import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DesignDetail = () => {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchDesign();
    fetchComments();
  }, [slug]);

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
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{design.title}</h1>
          <p className="text-white/80 mb-4">{design.description}</p>
          <p className="text-white/60 mb-2">By {design.author.username}</p>
          <p className="text-white/60 mb-4">Likes: {design.likes_count}</p>
          <button
            onClick={handleLike}
            className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300 mr-4"
          >
            Like
          </button>
          <a
            href={`/designs/${design.slug}/edit`}
            className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white hover:bg-white/30 transition-all duration-300"
          >
            Edit Design
          </a>
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