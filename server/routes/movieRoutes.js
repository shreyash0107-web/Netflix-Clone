import express from 'express';
import { getTrendingMovies, getActionMovies } from '../controllers/movieController.js';

const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/action', getActionMovies);

export default router;
