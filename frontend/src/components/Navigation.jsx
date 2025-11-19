import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import {
  Car,
  Home,
  Palette,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Users,
  BarChart3,
  ShoppingCart,
  Heart,
  Eye,
  Plus,
  Bell
} from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, getUserRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = getUserRole();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home, public: true }
    ];

    if (!isAuthenticated) {
      return [
        ...baseItems,
        { path: '/configurator', label: 'Configurator', icon: Car, public: true }
      ];
    }

    switch (userRole) {
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: Shield },
          { path: '/', label: 'Home', icon: Home },
          { path: '/configurator', label: 'Configurator', icon: Car },
          { path: '/users', label: 'User Management', icon: Users },
          { path: '/analytics', label: 'Analytics', icon: BarChart3 }
        ];
      case 'designer':
        return [
          { path: '/designer', label: 'Dashboard', icon: Palette },
          { path: '/', label: 'Home', icon: Home },
          { path: '/configurator', label: 'Configurator', icon: Car },
          { path: '/create', label: 'New Design', icon: Plus },
          { path: '/portfolio', label: 'My Portfolio', icon: Eye }
        ];
      case 'user':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: User },
          { path: '/', label: 'Home', icon: Home },
          { path: '/configurator', label: 'Configurator', icon: Car },
          { path: '/favorites', label: 'Favorites', icon: Heart },
          { path: '/orders', label: 'My Orders', icon: ShoppingCart }
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Car className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white font-bold text-xl">CarDesign</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </motion.button>

                  {/* User Profile */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-white font-medium text-sm">{user?.name}</p>
                        <p className="text-white/60 text-xs capitalize">{userRole}</p>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-colors"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden backdrop-blur-2xl bg-black/20 border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile User Info */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigationItems.length * 0.05 }}
                  className="border-t border-white/10 pt-4 mt-4"
                >
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-white/60 text-sm capitalize">{userRole}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/70 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-colors mt-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}

              {/* Mobile Auth Buttons */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigationItems.length * 0.05 }}
                  className="border-t border-white/10 pt-4 mt-4 space-y-2"
                >
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium">
                      Sign Up
                    </button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}