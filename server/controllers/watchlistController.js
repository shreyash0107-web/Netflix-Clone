import WatchlistItem from '../models/WatchlistItem.js';

// @desc    Get user watchlist
// @route   GET /api/watchlist
// @access  Private
const getWatchlist = async (req, res) => {
  try {
    const watchlist = await WatchlistItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching watchlist' });
  }
};

// @desc    Add item to watchlist
// @route   POST /api/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
  const { movieId, title, overview, posterPath, backdropPath } = req.body;

  try {
    const itemExists = await WatchlistItem.findOne({ userId: req.user._id, movieId });

    if (itemExists) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const watchlistItem = await WatchlistItem.create({
      userId: req.user._id,
      movieId,
      title,
      overview,
      posterPath,
      backdropPath,
    });

    res.status(201).json(watchlistItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding to watchlist' });
  }
};

// @desc    Remove item from watchlist
// @route   DELETE /api/watchlist/:movieId
// @access  Private
const removeFromWatchlist = async (req, res) => {
  try {
    const item = await WatchlistItem.findOne({ userId: req.user._id, movieId: req.params.movieId });

    if (item) {
      await item.deleteOne();
      res.json({ message: 'Item removed from watchlist', movieId: req.params.movieId });
    } else {
      res.status(404).json({ message: 'Item not found in watchlist' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while removing from watchlist' });
  }
};

export { getWatchlist, addToWatchlist, removeFromWatchlist };
