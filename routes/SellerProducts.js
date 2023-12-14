const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const isLoggedIn = require('./isLoggedIn');
const passport = require('passport');

router.get('/seller', isLoggedIn, async (req, res) => {
  try {
    const admin = req.user; 
    console.log(admin)
    if (admin && admin.accounttype === 'Seller') {
        const products = await Product.find({ uploadedBy: admin._id });
      console.log(products)
      res.render('SellerProducts', { admin, products });
    } else {
      // Redirect or render an error page if the user is not a valid seller
      res.redirect('/'); // Redirect to the home page for now, adjust as needed
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
