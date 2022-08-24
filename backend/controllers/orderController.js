import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems && orderItems.length === 0) {
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: {
      id: req.body.id,
      status: req.body.sttaus,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    },
  });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
