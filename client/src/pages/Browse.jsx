import { useEffect, useState } from 'react';
import axios from 'axios';
import { Play, Plus, Info } from 'lucide-react';
import MovieRow from '../components/MovieRow';
import { useMovieStore } from '../store/movieStore';

const Browse = () => {
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const { fetchWatchlist } = useMovieStore();

  useEffect(() => {
    fetchWatchlist();
    
    const fetchMovies = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      try {
        const trendingRes = await axios.get(`${API_URL}/movies/trending`);
        const actionRes = await axios.get(`${API_URL}/movies/action`);
        setTrending(trendingRes.data);
        setAction(actionRes.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, [fetchWatchlist]);

  const heroMovie = trending[0] || null;

  return (
    <div className="min-h-screen bg-[#141414] pb-20">
      {/* Hero Billboard */}
      {heroMovie && (
        <div className="relative w-full h-[80vh] md:h-[90vh]">
          <div className="absolute w-full h-full">
            <img 
              src={heroMovie.backdrop_path} 
              alt={heroMovie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#141414] to-transparent" />
          </div>
          
          <div className="absolute bottom-[30%] md:bottom-[25%] left-4 md:left-12 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
              {heroMovie.title}
            </h1>
            <p className="text-white text-lg md:text-xl drop-shadow mb-6 max-w-xl line-clamp-3">
              {heroMovie.overview}
            </p>
            
            <div className="flex gap-4">
              <button className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded flex items-center justify-center gap-2 font-bold text-lg hover:bg-gray-300 transition">
                <Play className="w-6 h-6 fill-current" /> Play
              </button>
              <button className="bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded flex items-center justify-center gap-2 font-bold text-lg hover:bg-gray-500/90 transition">
                <Info className="w-6 h-6" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="-mt-16 md:-mt-24 relative z-20">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Action Movies" movies={action} />
      </div>
    </div>
  );
};

export default Browse;
