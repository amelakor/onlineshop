import express from 'express';
import {
  addReview,
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';

import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, editProduct)
  .delete(protect, isAdmin, deleteProduct);

router.route('/:id/review').post(protect, addReview);

export default router;
