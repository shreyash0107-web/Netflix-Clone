import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, ChevronDown, User, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  import('react').then(({ useEffect }) => {
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Do not render global navbar on auth pages
  if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
    return null;
  }

  return (
    <nav 
      className={`fixed top-0 w-full z-50 px-4 md:px-12 py-4 flex items-center justify-between transition-colors duration-500 ${
        isScrolled ? 'bg-[#141414]/95 backdrop-blur-md' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        <Link to="/">
          <h1 className="text-netflix text-3xl font-bold tracking-wider">NETFLIX</h1>
        </Link>
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-300">
            <Link to="/browse" className="text-white font-bold transition">Home</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">TV Shows</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">Movies</Link>
            <Link to="#" className="hover:text-gray-400 transition-colors">New & Popular</Link>
            <Link to="/my-list" className="hover:text-gray-400 transition-colors">My List</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Search className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
            <Bell className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
            
            <div 
              className="relative flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white overflow-hidden">
                <User className="w-5 h-5" />
              </div>
              <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              
              <AnimatePresence>
                {showDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-4 w-48 bg-black/90 border border-gray-800 rounded shadow-2xl py-2 flex flex-col z-50 before:content-[''] before:absolute before:-top-2 before:right-4 before:border-l-8 before:border-r-8 before:border-b-8 before:border-transparent before:border-b-gray-800"
                  >
                    <div className="px-4 py-3 text-xs text-gray-400 border-b border-gray-800">
                      Signed in as <br/><strong className="text-white text-sm">{user?.email}</strong>
                    </div>
                    <div className="py-2 flex flex-col">
                      <Link to="#" className="px-4 py-2 text-sm text-gray-300 hover:underline">Manage Profiles</Link>
                      <Link to="#" className="px-4 py-2 text-sm text-gray-300 hover:underline">Account</Link>
                      <Link to="#" className="px-4 py-2 text-sm text-gray-300 hover:underline">Help Center</Link>
                    </div>
                    <div className="border-t border-gray-800 py-2">
                      <button 
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
                            await useAuthStore.getState().deleteAccount();
                            navigate('/');
                          }
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 font-bold hover:underline mb-1"
                      >
                        Delete Account
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:underline flex items-center gap-2"
                      >
                        Sign out of Netflix
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <Link to="/login" className="bg-netflix text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
