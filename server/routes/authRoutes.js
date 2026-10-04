import express from 'express';
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  deleteUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);
router.delete('/delete', protect, deleteUser);

export default router;
