


const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const RegisteredUser = require('../models/register');
const Product = require('../models/Product');
const Order = require('../models/Order');


router.get('/', (req, res) => {
  res.render('user/home');
});


router.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});


router.get('/register', (req, res) => {
  res.render('user/register');
});


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await RegisteredUser.findOne({ username });

    if (existingUser) {
      return res.send('⚠️ Username already exists. Try another one.');
    }

    const newUser = new RegisteredUser({ username, password });
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Error registering user.');
  }
});


router.get('/login', (req, res) => {
  res.render('user/login');
});
router.get('/home', (req, res) => {
  res.render('user/home');
});
router.get('/placeOrder', (req, res) => {
  res.render('user/placeOrder');
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await RegisteredUser.findOne({ username, password });
    if (user) {
      req.session.user = { _id: user._id, username: user.username };
      res.redirect('/main');
    } else {
      res.send('❌ Invalid username or password.');
    }
  } catch (err) {
    res.status(500).send('Login failed.');
  }
});


router.get('/main', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).send('You must be logged in to view this page.');
  }

  res.render('user/main');
});


router.get('/user/order', (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.status(401).send('You must be logged in to view the order page.');
  }

 
  Order.find({ user: user._id })
    .populate('productId') 
    .then(orders => {
      res.render('user/order', { orders });
    })
    .catch(err => {
      console.error('Error fetching orders:', err);
      res.status(500).send('Error fetching orders');
    });
});






router.post('/user/order', async (req, res) => {
  const user = req.session.user; 
  const { productId, quantity } = req.body;

  if (!user) {
   
    return res.status(401).send('You must be logged in to place an order.');
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');

  
    const order = new Order({
      user: user._id,  
      productId: product._id,
      quantity: quantity || 1,
      total: product.price * (quantity || 1),
    });

   await order.save();
res.redirect('/user/order?success=1');
  
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});



router.get('/search', async (req, res) => {
  const query = req.query.query.toLowerCase();
  const products = await Product.find({ category: { $regex: query, $options: 'i' } });
  res.render('user/searchResults', { products, query });
});


router.get('/mobile', async (req, res) => {
  try {
    const mobiles = await Product.find({ category: 'mobile' });
    res.render('user/mobile', { mobiles });
  } catch (err) {
    console.error('Error loading mobiles:', err);
    res.status(500).send('Error loading mobiles');
  }
});


router.get('/laptop', async (req, res) => {
  try {
    const laptops = await Product.find({ category:'laptop'});  
    res.render('user/laptop', { laptops });  
  } catch (error) {
    console.error("Error loading laptop:", error);
    res.status(500).send("Internal Server Error");
  }
});





router.get('/earbuds', async (req, res) => {
  try {
    const earbuds = await Product.find({category:'earbuds'}); 
    res.render('user/earbuds', { earbuds });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.get('/clothes', async (req, res) => {
  try {
    const clothes = await Product.find({category:'clothes'}); 
    res.render('user/clothes', { clothes }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/dresses', async (req, res) => {
  try {
    const dresses = await Product.find({category:'dresses'});
    res.render('user/dresses', { dresses });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/hp', async (req, res) => {
  try {
    const headphones = await Product.find({category:'headphones'}); 
    res.render('user/hp', { headphones }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/acc', async (req, res) => {
  try {
    const accessories = await Product.find({category:'accessories'}); 
    res.render('user/acc', { accessories });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/kitchen', async (req, res) => {
  try {
    const kitchen = await Product.find({category:'kitchen'}); 
    res.render('user/kitchen', { kitchen });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/watch', async (req, res) => {
  try {
    const watches = await Product.find({category:'watches'}); 
    res.render('user/watch', { watches });  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/user/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.render('user/cart', { cart });
});


router.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity) || 1;

  try {
    const product = await Product.findById(productId).lean();

    if (!product) {
      return res.status(404).send('Product not found');
    }

  
    if (!req.session.cart) {
      req.session.cart = [];
    }

    
    const existingProductIndex = req.session.cart.findIndex(p => p._id.toString() === product._id.toString());

    if (existingProductIndex !== -1) {
     
      req.session.cart[existingProductIndex].quantity += quantity;
    } else {
      
      req.session.cart.push({
        _id: product._id,
        name: product.name,
        
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    res.redirect('/user/cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
