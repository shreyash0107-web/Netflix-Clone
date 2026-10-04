import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      
      if (scrollTo > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div 
      className="mb-8 relative group/row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-white font-bold text-xl md:text-2xl mb-4 px-4 md:px-12 relative z-20 hover:text-gray-300 transition-colors cursor-pointer inline-block">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={() => handleScroll('left')}
          className={`absolute top-0 bottom-0 left-0 z-40 w-12 md:w-16 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300 ease-in-out ${isHovered && hasScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white transform hover:scale-125 transition-transform" />
        </button>
        
        {/* Row Container */}
        <div 
          ref={rowRef}
          className="flex gap-2 overflow-x-hidden scroll-smooth px-4 md:px-12 pb-10 pt-4"
          onScroll={(e) => setHasScrolled(e.target.scrollLeft > 0)}
        >
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index}
              totalCards={movies.length}
            />
          ))}
        </div>
        
        {/* Right Arrow */}
        <button 
          onClick={() => handleScroll('right')}
          className={`absolute top-0 bottom-0 right-0 z-40 w-12 md:w-16 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white transform hover:scale-125 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
