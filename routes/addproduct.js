var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/products');
const User = require('../models/userModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/Products/');
  },
  filename: function (req, file, cb) {
    const productId = new Date().toISOString().replace(/[-:.]/g, '');
    const filename = productId + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get('/addproducts', (req, res) => {
  res.render('addproduct',{admin:req.user});
});

router.post('/addproduct', upload.single('productImage'), async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const newProduct = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productImage: req.file.path,
      uploadedBy: user._id,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();
    res.send("Uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
