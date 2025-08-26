
const express = require('express');
const router = express.Router();
const RegisteredUser = require('../models/register');
const Order = require('../models/Order');
const Product = require('../models/Product');


router.get('/login', (req, res) => {
  res.render('admin/login');
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'pavi@123abc' && password === '12345678') {
    res.redirect('/admin/dashboard');
  } else {
    res.send('❌ Invalid username or password.');
  }
});


router.get('/dashboard', async (req, res) => {
  try {
    const users = await RegisteredUser.find();
    const orders = await Order.find()
      .populate('user', 'username')
      .populate('productId', 'name price category image');

    res.render('admin/dashboard', { users, orders });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/add-product', async (req, res) => {
  const { name, category, price, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      image
    });

    await newProduct.save();
    res.redirect('/admin/dashboard?success=1');

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Failed to add product');
  }
});

router.get('/logout', (req, res) => {
  res.redirect('/admin/login');
});

module.exports = router;
