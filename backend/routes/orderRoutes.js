import express from 'express';
import {
  addOrderItems,
  getOrder,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrder);

export default router;
