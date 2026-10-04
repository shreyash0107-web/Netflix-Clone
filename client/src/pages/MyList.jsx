import { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const { watchlist, fetchWatchlist, isLoadingWatchlist } = useMovieStore();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  // Transform watchlist data back to standard movie format for MovieCard
  const formattedWatchlist = watchlist.map(item => ({
    id: item.movieId,
    title: item.title,
    overview: item.overview,
    poster_path: item.posterPath,
    backdrop_path: item.backdropPath
  }));

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-4 md:px-12 pb-20">
      <h1 className="text-white text-3xl font-bold mb-8">My List</h1>
      
      {isLoadingWatchlist ? (
        <div className="text-white text-xl">Loading your list...</div>
      ) : formattedWatchlist.length === 0 ? (
        <div className="text-gray-400 text-lg">You haven't added any movies to your list yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-16 gap-x-2">
          {formattedWatchlist.map((movie) => (
            <div key={movie.id} className="w-full">
               <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
