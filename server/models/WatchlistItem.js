import mongoose from 'mongoose';

const watchlistItemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
    },
    posterPath: {
      type: String,
    },
    backdropPath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only add a movie once
watchlistItemSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const WatchlistItem = mongoose.model('WatchlistItem', watchlistItemSchema);
export default WatchlistItem;
