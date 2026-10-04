// Mock Data implementation if TMDB is not connected
export const mockMovies = [
  {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    backdrop_path: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920",
    genre_ids: [28, 878, 12]
  },
  {
    id: 2,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    backdrop_path: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1920",
    genre_ids: [12, 18, 878]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    genre_ids: [18, 28, 80, 53]
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    genre_ids: [12, 878, 28]
  },
  {
    id: 5,
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    poster_path: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8s38CJtG4.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    genre_ids: [18, 10765, 9648]
  },
  {
    id: 6,
    title: "Breaking Bad",
    overview: "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    poster_path: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizwpB.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    genre_ids: [18, 80]
  },
  {
    id: 7,
    title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    backdrop_path: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920",
    genre_ids: [28, 878]
  }
];

export const getTrendingMovies = (req, res) => {
  res.json(mockMovies);
};

export const getActionMovies = (req, res) => {
  const actionMovies = mockMovies.filter(m => m.genre_ids.includes(28));
  res.json(actionMovies);
};
