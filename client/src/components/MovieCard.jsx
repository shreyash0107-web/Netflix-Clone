import { useState, useRef } from 'react';
import { Play, Plus, Check, ThumbsUp, ChevronDown } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';
import { motion, AnimatePresence } from 'framer-motion';

const MovieCard = ({ movie, index, totalCards }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieStore();
  const inList = isInWatchlist(movie.id);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 300); // 300ms debounce
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  const handleToggleList = (e) => {
    e.preventDefault();
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
      });
    }
  };

  // Determine transform origin based on index
  let originClass = 'origin-center';
  if (index === 0) originClass = 'origin-left';
  if (index === totalCards - 1) originClass = 'origin-right';

  return (
    <div 
      className="relative min-w-[200px] md:min-w-[250px] h-[112px] md:h-[140px] z-10 hover:z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={movie.backdrop_path || movie.poster_path}
        alt={movie.title}
        className="rounded-md object-cover w-full h-full"
      />
      
      {/* Hover Modal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.35 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute top-0 left-0 w-full bg-[#181818] rounded-md shadow-2xl shadow-black z-50 pointer-events-auto ${originClass}`}
            style={{ y: '-15%' }}
          >
            <div className="w-full h-[112px] md:h-[140px] relative">
              <img
                src={movie.backdrop_path || movie.poster_path}
                alt={movie.title}
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                    <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
                  </button>
                  <button 
                    onClick={handleToggleList}
                    className="w-8 h-8 border-2 border-gray-400 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:border-white transition"
                  >
                    {inList ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button className="w-8 h-8 border-2 border-gray-400 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:border-white transition">
                    <ThumbsUp className="w-4 h-4 text-white" />
                  </button>
                </div>
                <button className="w-8 h-8 border-2 border-gray-400 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:border-white transition">
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                <span className="text-[#46d369]">98% Match</span>
                <span className="border border-gray-600 px-1 text-gray-300">U/A 16+</span>
                <span className="border border-gray-600 px-1 text-gray-300 rounded-sm text-[10px]">HD</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span>Suspenseful</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>Thriller</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>Action</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieCard;
