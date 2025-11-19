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

  if (!design) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{design.title}</h1>
      <p>{design.description}</p>
      <p>By {design.author.username}</p>
      <p>Likes: {design.likes_count}</p>
      <button onClick={handleLike} className="bg-blue-500 text-white p-2 rounded">Like</button>
      <div className="mt-4">
        <h2 className="text-2xl">Comments</h2>
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="border p-2 mb-2">
              <p>{comment.text}</p>
              <p>By {comment.user.username}</p>
            </div>
          ))}
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border p-2 w-full"
          placeholder="Add a comment..."
        />
        <button onClick={handleComment} className="bg-green-500 text-white p-2 rounded mt-2">Comment</button>
      </div>
    </div>
  );
};

export default DesignDetail;