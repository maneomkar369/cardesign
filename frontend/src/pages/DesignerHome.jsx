import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Palette,
  Car,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Star,
  Clock,
  Users,
  Award,
  Zap,
  Target,
  BarChart3,
  Calendar,
  Download,
  Share2
} from 'lucide-react';

export default function DesignerHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalDesigns: 47,
    views: 12543,
    likes: 892,
    collaborations: 12
  });

  const [recentDesigns] = useState([
    {
      id: 1,
      title: 'Cyber Phantom GT',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      status: 'published',
      views: 2341,
      likes: 156,
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Urban EV Compact',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      status: 'draft',
      views: 0,
      likes: 0,
      createdAt: '5 days ago'
    },
    {
      id: 3,
      title: 'Apex Roadster',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
      status: 'published',
      views: 1876,
      likes: 98,
      createdAt: '1 week ago'
    },
  ]);

  const [trendingDesigns] = useState([
    {
      id: 4,
      title: 'Neo Safari Cruiser',
      designer: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0e3421ec4?w=300&h=200&fit=crop',
      likes: 245,
      views: 3421
    },
    {
      id: 5,
      title: 'Volt Sedan Pro',
      designer: 'Maria Rodriguez',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=300&h=200&fit=crop',
      likes: 189,
      views: 2897
    },
    {
      id: 6,
      title: 'Thunder Truck X',
      designer: 'David Kim',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      likes: 167,
      views: 2156
    },
  ]);

  const [achievements] = useState([
    { id: 1, title: 'First Design Published', icon: Award, unlocked: true, description: 'Published your first car design' },
    { id: 2, title: '100 Views', icon: Eye, unlocked: true, description: 'Reached 100 total design views' },
    { id: 3, title: 'Top Designer', icon: Star, unlocked: false, description: 'Get featured in trending designs' },
    { id: 4, title: 'Collaborator', icon: Users, unlocked: true, description: 'Collaborated on a design project' },
  ]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Designer Dashboard</h1>
            <p className="text-white/60">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              New Design
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/10 text-white rounded-xl font-medium border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Share2 className="w-4 h-4 inline mr-2" />
              Share Portfolio
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Total Designs</p>
                <p className="text-3xl font-bold text-white">{stats.totalDesigns}</p>
              </div>
              <Car className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3 this month
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-white">{stats.views.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% from last month
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-3xl p-6 shadow-2xl shadow-pink-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-300 text-sm font-medium">Likes</p>
                <p className="text-3xl font-bold text-white">{stats.likes}</p>
              </div>
              <Star className="w-8 h-8 text-pink-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8% from last month
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-3xl p-6 shadow-2xl shadow-green-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Collaborations</p>
                <p className="text-3xl font-bold text-white">{stats.collaborations}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2 this month
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Designs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                My Recent Designs
              </h2>
              <Link
                to="/create"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        design.status === 'published'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {design.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{design.title}</h3>
                    <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {design.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {design.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {design.createdAt}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-purple-500/20 text-purple-300 rounded-xl font-medium hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements & Trending */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Achievements */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        achievement.unlocked
                          ? 'bg-yellow-500/20 border border-yellow-500/30'
                          : 'bg-white/5 border border-white/10 opacity-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-yellow-500/20'
                          : 'bg-white/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          achievement.unlocked
                            ? 'text-yellow-400'
                            : 'text-white/40'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          achievement.unlocked
                            ? 'text-white'
                            : 'text-white/40'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className="text-white/60 text-sm">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Check className="w-5 h-5 text-yellow-400" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Trending Designs */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Trending Designs
              </h2>
              <div className="space-y-4">
                {trendingDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{design.title}</p>
                      <p className="text-white/60 text-xs">by {design.designer}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-white/40 text-xs">
                          <Star className="w-3 h-3" />
                          {design.likes}
                        </span>
                        <span className="flex items-center gap-1 text-white/40 text-xs">
                          <Eye className="w-3 h-3" />
                          {design.views}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl text-left hover:bg-purple-500/30 transition-colors group"
            >
              <Plus className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">New Design</h3>
              <p className="text-white/60 text-sm">Start creating a new car design</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl text-left hover:bg-blue-500/30 transition-colors group"
            >
              <BarChart3 className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Analytics</h3>
              <p className="text-white/60 text-sm">View your design performance</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl text-left hover:bg-green-500/30 transition-colors group"
            >
              <Users className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Collaborate</h3>
              <p className="text-white/60 text-sm">Work with other designers</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl text-left hover:bg-yellow-500/30 transition-colors group"
            >
              <Download className="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Export</h3>
              <p className="text-white/60 text-sm">Download your designs</p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}