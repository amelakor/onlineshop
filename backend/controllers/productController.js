import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    count,
    stock,
  } = req.body;

  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error('A product already exists');
  } else {
    const product = await Product.create({
      name,
      image,
      brand,
      category,
      description,
      rating,
      numReviews,
      price,
      count,
      stock,
    });

    if (product) {
      res.status(201).json({
        _id: product._id,
        user: req.user.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        rating: product.rating,
        numReviews: product.numReviews,
        price: product.proce,
        count: product.count,
        stock: product.stock,
      });
    } else {
      res.status(400);
      throw new Error('No valid data');
    }
  }
});

export const editProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, count, stock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.count = count || product.count;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    await product.save();

    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Product cannot be found');
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json({});
  } else {
    res.status(400);
    throw new Error('Product cannot be found');
  }
});

export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed.');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce(
      (acc, item) => item.rating + acc,
      0
    );
    await product.save();
    res.status(201).json({ message: 'Review added.' });
  } else {
    res.status(400);
    throw new Error('Product cannot be found');
  }
});
