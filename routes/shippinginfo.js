const { ObjectId } = require('mongoose').Types;
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const ShippingInfo = require('../models/shippinginfo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const isLoggedIn = require('./isLoggedIn');
const CartItem = require('../models/addtocart'); // Updated import
const Product = require('../models/products');
const mongoose=require('mongoose')
passport.use(new LocalStrategy(User.authenticate()));

router.get('/shippingaddress', async (req, res) => {
  try {
    const products = await CartItem.find({ userId: req.user._id }).populate('productId');
    console.log('Fetched Cart Items:', products);
    res.render('shippingaddress', { user: req.user, products, admin: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/shippingaddress', async (req, res) => {
  try {
    const { name, address, city, state, pincode, phone, requestedProducts, quantities } = req.body;
    const userId = req.user._id;
    const shippingInfoArray = [];

    if (!Array.isArray(requestedProducts) || !Array.isArray(quantities)) {
      // Handle the case where only one product is added
      const productId = requestedProducts;
      const productQuantity = quantities;

      const cartItem = await CartItem.findOne({ userId, productId }).populate('productId');
      if (!cartItem) {
        return res.status(404).send('CartItem not found');
      }

      const sellerId = cartItem.productId.uploadedBy;

      const newShippingInfo = new ShippingInfo({
        name,
        address,
        city,
        state,
        pincode,
        phone,
        userId,
        sellerId,
        productIds: [productId],
        quantities: [productQuantity],
      });

      shippingInfoArray.push(newShippingInfo);
    } else {
      // Handle the case where multiple products are added
      for (let i = 0; i < requestedProducts.length; i++) {
        const productId = requestedProducts[i];
        const productQuantity = quantities[i];

        const cartItem = await CartItem.findOne({ userId, productId }).populate('productId');
        if (!cartItem) {
          return res.status(404).send('CartItem not found');
        }

        const sellerId = cartItem.productId.uploadedBy;

        const newShippingInfo = new ShippingInfo({
          name,
          address,
          city,
          state,
          pincode,
          phone,
          userId,
          sellerId,
          productIds: [productId],
          quantities: [productQuantity],
        });

        shippingInfoArray.push(newShippingInfo);
      }
    }

    const savedShippingInfoArray = await ShippingInfo.insertMany(shippingInfoArray);
    console.log(savedShippingInfoArray);

    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
