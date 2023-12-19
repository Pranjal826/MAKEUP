// routes/viewcart.js

const express = require('express');
const router = express.Router();
const CartItem = require('../models/addtocart');
const Product = require('../models/products'); 
const calculateTotalPrice = require('./pricecalculate'); // Make sure to import the function
router.get('/viewcart', async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ userId }).populate('productId');
    res.render('viewcart', { cartItems, admin: req.user ,calculateTotalPrice});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
