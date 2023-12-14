const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const ShippingInfo = require('../models/shippinginfo');
const isLoggedIn = require('./isLoggedIn');
const Product = require('../models/addtocart');

router.get('/requestedproducts', async (req, res) => {
    try {
        const userId = req.user;
        const shippingInfoArray = await ShippingInfo.find({ sellerId: userId }).populate('productIds');
        console.log(shippingInfoArray)
        const productIds = shippingInfoArray.map(info => info.productIds).flat();
        console.log(productIds)
        // Assuming you have a Product model with a method to get product information by ID
        const products = await Product.find({ _id: { $in: productIds } });
        console.log(products)
        res.render('requestedproducts', { user: req.user, admin: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
