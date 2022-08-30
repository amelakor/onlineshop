import express from 'express';
import {
  addOrderItems,
  getLoggedInUserOrders,
  getOrder,
  getOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, isAdmin, getOrders).post(protect, addOrderItems);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/myorders').get(protect, getLoggedInUserOrders);
router.route('/:id').get(protect, getOrder);

export default router;
