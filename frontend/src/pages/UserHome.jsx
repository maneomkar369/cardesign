import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Car,
  Heart,
  ShoppingCart,
  Star,
  Eye,
  TrendingUp,
  Clock,
  Zap,
  Target,
  Award,
  Calendar,
  Settings,
  User,
  Bell
} from 'lucide-react';

export default function UserHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    savedDesigns: 23,
    viewedDesigns: 156,
    favoriteDesigns: 12,
    ordersPlaced: 3
  });

  const [recentlyViewed] = useState([
    {
      id: 1,
      title: 'Cyber Phantom GT',
      designer: 'Alex Chen',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      price: 250000,
      rating: 4.8,
      views: 2341
    },
    {
      id: 2,
      title: 'Urban EV Compact',
      designer: 'Maria Rodriguez',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
      price: 45000,
      rating: 4.6,
      views: 1876
    },
    {
      id: 3,
      title: 'Apex Roadster',
      designer: 'David Kim',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop',
      price: 180000,
      rating: 4.9,
      views: 3421
    },
  ]);

  const [favorites] = useState([
    {
      id: 4,
      title: 'Neo Safari Cruiser',
      designer: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0e3421ec4?w=250&h=150&fit=crop',
      price: 95000,
      rating: 4.7
    },
    {
      id: 5,
      title: 'Volt Sedan Pro',
      designer: 'Mike Davis',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=250&h=150&fit=crop',
      price: 55000,
      rating: 4.5
    },
    {
      id: 6,
      title: 'Thunder Truck X',
      designer: 'Lisa Wong',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=250&h=150&fit=crop',
      price: 120000,
      rating: 4.8
    },
  ]);

  const [trendingDesigns] = useState([
    {
      id: 7,
      title: 'Zenith Coupe',
      designer: 'Tom Anderson',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
      price: 220000,
      rating: 4.9,
      trend: '+25%'
    },
    {
      id: 8,
      title: 'Prism Crossover',
      designer: 'Emma Taylor',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0e3421ec4?w=300&h=200&fit=crop',
      price: 75000,
      rating: 4.6,
      trend: '+18%'
    },
    {
      id: 9,
      title: 'Aero Sport',
      designer: 'Chris Brown',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop',
      price: 195000,
      rating: 4.7,
      trend: '+32%'
    },
  ]);

  const [notifications] = useState([
    { id: 1, type: 'design_update', message: 'New design "Cyber Phantom GT" is now available', time: '2 hours ago', read: false },
    { id: 2, type: 'price_drop', message: 'Price drop on "Urban EV Compact" - $5,000 off!', time: '1 day ago', read: false },
    { id: 3, type: 'order_update', message: 'Your order #1234 has been shipped', time: '2 days ago', read: true },
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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
              <p className="text-white/60">Discover amazing car designs and bring your vision to life</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 text-white rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5" />
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
            className="backdrop-blur-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-3xl p-6 shadow-2xl shadow-blue-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Saved Designs</p>
                <p className="text-3xl font-bold text-white">{stats.savedDesigns}</p>
              </div>
              <Car className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5 this week
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-3xl p-6 shadow-2xl shadow-red-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Favorites</p>
                <p className="text-3xl font-bold text-white">{stats.favoriteDesigns}</p>
              </div>
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2 this week
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-3xl p-6 shadow-2xl shadow-green-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Orders Placed</p>
                <p className="text-3xl font-bold text-white">{stats.ordersPlaced}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +1 this month
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-3xl p-6 shadow-2xl shadow-yellow-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Designs Viewed</p>
                <p className="text-3xl font-bold text-white">{stats.viewedDesigns}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-4 flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% this week
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recently Viewed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Recently Viewed
              </h2>
              <Link
                to="/"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewed.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/50 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                        ${design.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-1">{design.title}</h3>
                    <p className="text-white/60 text-sm mb-2">by {design.designer}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">{design.rating}</span>
                      </div>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {design.views}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-blue-500/20 text-blue-300 rounded-xl font-medium hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-1"
                      >
                        <Heart className="w-4 h-4" />
                        Save
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Favorites */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                My Favorites
              </h2>
              <div className="space-y-4">
                {favorites.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
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
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-white/60 text-xs">{design.rating}</span>
                        </div>
                        <span className="text-white/60 text-xs">${design.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending Designs */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Trending Now
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
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-green-400 text-xs font-medium">{design.trend}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-white/60 text-xs">{design.rating}</span>
                        </div>
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
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/configurator">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl text-left hover:bg-purple-500/30 transition-colors group cursor-pointer"
              >
                <Car className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Design Your Car</h3>
                <p className="text-white/60 text-sm">Customize and configure your dream car</p>
              </motion.div>
            </Link>

            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl text-left hover:bg-blue-500/30 transition-colors group cursor-pointer"
              >
                <Eye className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Browse Designs</h3>
                <p className="text-white/60 text-sm">Explore amazing car designs from designers</p>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl text-left hover:bg-green-500/30 transition-colors group cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">My Orders</h3>
              <p className="text-white/60 text-sm">Track your car orders and purchases</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl text-left hover:bg-yellow-500/30 transition-colors group cursor-pointer"
            >
              <Award className="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Achievements</h3>
              <p className="text-white/60 text-sm">View your design exploration milestones</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}