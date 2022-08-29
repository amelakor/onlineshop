import express from 'express';
import {
  authUser,
  deleteUserByAdmin,
  getUserbyId,
  getUserProfile,
  getUsersbyAdmin,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/').post(registerUser).get(protect, isAdmin, getUsersbyAdmin);
router
  .route('/:id')
  .get(protect, isAdmin, getUserbyId)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUserByAdmin);

export default router;
