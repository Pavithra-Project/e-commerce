const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Product = require('./models/Product'); // adjust the path if your model is elsewhere
const session = require('express-session'); 
const Order = require('./models/Order');  



// Initialize the app
const app = express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,  
    maxAge: 24 * 60 * 60 * 1000  
  }
}));



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => {
  console.log("✅ Server started on http://localhost:3000");
});



mongoose.connect('mongodb://localhost:27017/cartodb')
  .then(async () => {
    console.log("MongoDB Connected");
  
    
    const sampleProducts = [
    
      { name: "Redmi Note 12", brand: "Xiaomi", price: 249, image: "https://www.dxomark.com/wp-content/uploads/medias/post-145957/Xiaomi-Redmi-Note-12-Pro-5G-Plain_featured-image-packshot-review-1024x691.jpg", category: "mobile" },
      { name: "iQOO Z7", brand: "iQOO", price: 279, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNPZBmXHGDJDDLaJIt5QR55UYQ04jbMS1Sug&s", category: "mobile" },
      { name: "Oppo A78", brand: "Oppo", price: 259, image: "https://m.media-amazon.com/images/I/81Ww9bOGRfL._AC_UF1000,1000_QL80_.jpg", category: "mobile" },
      { name: "Samsung Galaxy M14", brand: "Samsung", price: 299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHzLMe1BDFT1vqrTAXM68qMFVO0s07iKXyg&s", category: "mobile" },
      { name: "OnePlus Nord CE 3 Lite", brand: "OnePlus", price: 329, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpM-Nfec2aYgYcjqt9nFofbdt11q-CbJBiA&s", category: "mobile" },
      { name: "Realme Narzo N53", brand: "Realme", price: 199, image: "https://m.media-amazon.com/images/I/71DSxfKzkJL._SX679_.jpg", category: "mobile" },
    
      { name: "Realme Narzo", brand: "Realme", price: 199, image: "https://m.media-amazon.com/images/I/71DSxfKzkJL._SX679_.jpg", category: "mobile" },
    
      // Laptops
      { name: "HP 15s", brand: "HP", price: 45999, image: "https://www.telephoneshoppees.com/cdn/shop/products/15s-fq2671tu-thin-and-light-laptop-hp-original-imagfsxsgmkdcjsg.jpg?v=1671277056", category: "laptop" },
      { name: "Dell Inspiron 15", brand: "Dell", price: 49999, image: "https://m.media-amazon.com/images/I/61Qe0euJJZL._SX679_.jpg", category: "laptop" },
      { name: "Lenovo IdeaPad Slim 3", brand: "Lenovo", price: 42999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCFBuLNLRLcHHJ1Eu5X1KyWnbQpV9b7lyhOA&s", category: "laptop" },
      { name: "ASUS Vivobook 14", brand: "ASUS", price: 37999, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTJLPlBmq7vVrOgWGAHbE_IfUP50zRNRZgBCGq8c25gvzhnHEXRWocSNf1ZqJ_LL-LiLbKgK6uqLO950aa2jQWy-MhcOezeJscKFJP0XtVt3YJZHNahqK6hUw", category: "laptop" },
      { name: "Acer Aspire 7", brand: "Acer", price: 56999, image: "https://rukminim3.flixcart.com/image/850/1000/xif0q/computer/b/6/o/-original-imah8yymchnjsxzn.jpeg?q=20&crop=false", category: "laptop" },

      //ear buds 
       {
    name: "Sony WF-1000XM3",
    brand: "Sony",
    price: 228,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
    category: "earbuds"
  },
  {
    name: "Samsung Galaxy Buds+",
    brand: "Samsung",
    price: 169.99,
    image: "https://m.media-amazon.com/images/I/71Y8yhLJ2pL.jpg",
    category: "earbuds"
  },
  {
    name: "Creative Outlier Air",
    brand: "Creative",
    price: 49.89,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaVmil137vrFfgQQ4fkCaTH0Hi-hviZ39Vyw&s",
    category: "earbuds"
  },
  {
    name: "pTron Bassbuds",
    brand: "pTron",
    price: 20,
    image: "https://ptron.in/cdn/shop/files/B0CNZDYTXQ.MAIN.jpg?v=1709619298",
    category: "earbuds"
  },
  {
    name: "Tozo T6",
    brand: "Tozo",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/61R8vVHKcEL._AC_UF1000,1000_QL80_.jpg",
    category: "earbuds"
  },
  {
    name: "Anker Soundcore Life P2",
    brand: "Anker",
    price: 49.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzkHJjg9dbMrZn1chqjLangdAEWbgVKcRNA&s",
    category: "earbuds"
  },
  //clothes-men


  {
    name: "Classic White Shirt",
    brand: "Arrow",
    price: 200,
    image: "https://www.crimsouneclub.com/cdn/shop/files/SSH1339-1_3_1080x.jpg?v=1746111272",
    category: "clothes"
  },
  {
    name: "Slim Fit Blue Jeans",
    brand: "Levi's",
    price: 500,
    image: "https://spykar.com/cdn/shop/files/Z3DIjFFA4U-MDSS2BC002LIGHT-BLUE-_1.webp?v=1746023288",
    category: "clothes"
  },
  {
    name: "Black Leather Jacket",
    brand: "Zara",
    price: 170,
    image: "https://rukminim2.flixcart.com/image/550/650/xif0q/jacket/v/3/l/l-1-no-trendy-black-pu-faux-leather-biker-jacket-for-men-moody-original-imah2spwwwyqjf3z.jpeg?q=90&crop=false",
    category: "clothes"
  },
  {
    name: "Casual Polo T-Shirt",
    brand: "Polo Ralph Lauren",
    price: 300,
    image: "https://5.imimg.com/data5/ANDROID/Default/2022/4/YU/KG/DK/59222515/product-jpeg-500x500.jpg",
    category: "clothes"
  },
  {
    name: "Grey Hoodie Sweatshirt",
    brand: "Nike",
    price: 550,
    image: "https://m.media-amazon.com/images/I/61B8NTvEo9L._AC_UY1100_.jpg",
    category: "clothes"
  },
  {
    name: "Formal Black Trousers",
    brand: "Van Heusen",
    price: 500,
    image: "https://kaapus.com/cdn/shop/files/4R9A0701_e904bffa-c380-46ee-b076-894f920f80c7.jpg?v=1742218559",
    category: "clothes"
  },
  {
    name: "Checked Flannel Shirt",
    brand: "Levi's",
    price: 400,
    image: "https://contents.mediadecathlon.com/p2603382/7c4f5c6750d0d3a607079f326f199478/p2603382.jpg?format=auto&quality=70&f=2520x0",
    category: "clothes"
  },
  {
    name: "Navy Blue Blazer",
    brand: "H&M",
    price: 800,
    image: "https://celio.in/cdn/shop/files/14881075-3165072674941960_20d1a34c-1eb5-4cc3-ba9b-996a140b817d.webp?v=1744816117",
    category: "clothes"
  },
  {
    name: "White Sneakers",
    brand: "Adidas",
    price: 730,
    image: "https://rukminim3.flixcart.com/image/850/1000/ksqeky80/shoe/0/o/y/8-line-shoes-fashion-white-original-imag687guzw86huz.jpeg?q=90&crop=false",
    category: "clothes"
  },
  {
    name: "Brown Belt Leather",
    brand: "Fossil",
    price: 205,
    image: "https://m.media-amazon.com/images/I/71Y6jR4DBfL._AC_UY1100_.jpg",
    category: "clothes"
  },
  {
    name: "Black Formal Shoes",
    brand: "Clarks",
    price: 390,
    image: "hhttps://m.media-amazon.com/images/I/71srzgktEFL._AC_UY900_.jpg",
    category: "clothes"
  },
  {
    name: "Denim Jacket",
    brand: "Levi's",
    price: 745,
    image: "https://www.urbanofashion.com/cdn/shop/files/jakt-denim-mblue.jpg?v=1732203384",
    category: "clothes"
  },
  {
    name: "Black Graphic T-Shirt",
    brand: "Superdry",
    price: 300,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_YQHcrKbz6XNgvGI53ZbMrrcIvRhKIT9Eaw&s",
    category: "clothes"
  },
  {
    name: "Khaki Chinos",
    brand: "Gap",
    price: 505,
    image: "https://d118ps6mg0w7om.cloudfront.net/media/catalog/product/5/_/5_mft-17260-r-06-khaki_2.jpg",
    category: "clothes"
  },
  {
    name: "Winter Wool Coat",
    brand: "Burberry",
    price: 200,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhf8UGjKKyek9rhmrxbiHP1wLeIfeez3W2MQ&s",
    category: "clothes"
  },
  //women

  {
  name: "Floral A-Line Dress",
  brand: "ONLY",
  price: 650,
  image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/26/MVdZamLK_86fac207f08047c6bae19c8e0ba5fc5f.jpg",
  category: "dresses"
},
  {
  name: "Saree",
  brand: "ONLY",
  price: 650,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8auv-Yzq-h8TIzpZcnFSOmK3j27EYXuUHxw&s",
  category: "dresses"
},
{
  name: "Bodycon Midi Dress",
  brand: "Zara",
  price: 850,
  image: "https://m.media-amazon.com/images/I/71gP6WDIfML._AC_UY1100_.jpg",
  category: "dresses"
},
{
  name: "Casual Shirt Dress",
  brand: "H&M",
  price: 740,
  image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/2025/APRIL/24/ccYJV6Eo_6899a6a7ad3c4e81b40b5910e0f010f4.jpg",
  category: "dressess"
},
{
  name: "Red Fit & Flare Dress",
  brand: "FabAlley",
  price: 690,
  image: "https://rukminim2.flixcart.com/blobio/400/400/imr/blobio-imr_24193632bd24463c976bd259674810fe.jpg?q=90",
  category: "dresses"
},
{
  name: "Maxi Wrap Dress",
  brand: "AND",
  price: 920,
  image: "https://assets.ajio.com/medias/sys_master/root/20231121/YjMu/655c215eafa4cf41f5b91854/-1117Wx1400H-466383139-red-MODEL.jpg",
  category: "dresses"
},
{
  name: "Sleeveless Skater Dress",
  brand: "Forever 21",
  price: 580,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZNea3b8aQIWNiU81zITY7jJX1-UJf2isKA&s",
  category: "dresses"
},
{
  name: "Printed Anarkali Dress",
  brand: "Biba",
  price: 1020,
  image: "https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/5/4/5407sl03-5003.jpg",
  category: "dresses"
},
{
  name: "Ethnic Kurta Dress",
  brand: "W for Woman",
  price: 780,
  image: "https://assets.ajio.com/medias/sys_master/root/20240823/fTvB/66c795396f60443f31217fa4/-473Wx593H-467165695-blue-MODEL.jpg",
  category: "dresses"
},

  {
    name: "boAt Rockerz 450",
    brand: "boAt",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61u1VALn6JL.jpg",
    category: "headphones"
  },
  {
    name: "Sony WH-CH520",
    brand: "Sony",
    price: 3999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT098v4Kf6yH3jsd4TXyZpiMgNKMdjmeRc08A&s",
    category: "headphones"
  },
  {
    name: "JBL Tune 760NC",
    brand: "JBL",
    price: 5499,
    image: "https://media.croma.com/image/upload/v1674042794/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/247287_0_fvwcwc.png",
    category: "headphones"
  },
  {
    name: "Realme Buds Wireless 3",
    brand: "Realme",
    price: 1699,
    image: "https://m.media-amazon.com/images/I/61mgDd5Xl4L.jpg",
    category: "headphones"
  },
  {
    name: "Boult Audio ProBass",
    brand: "Boult",
    price: 1299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFKTzLSVCUYryKQQ9MWPBe84HnobEOoWG2Q&s",
    category: "headphones"
  },
  {
    name: "Zebronics Zeb-Rush",
    brand: "Zebronics",
    price: 1099,
    image: "https://m.media-amazon.com/images/I/71f4YDMZQ5L.jpg",
    category: "headphones"
  },
  {
    name: "Noise Two Wireless",
    brand: "Noise",
    price: 1999,
    image: "https://i.pinimg.com/736x/e7/57/f4/e757f482bd887696ee00c6a7ad99fb6e.jpg",
    category: "headphones"
  },
  {
    name: "OneOdio Studio Pro-10",
    brand: "OneOdio",
    price: 2299,
    image: "https://m.media-amazon.com/images/I/718KlyQRBfL._AC_UF894,1000_QL80_.jpg",
    category: "headphones"
  },
  {
    name: "Skullcandy Hesh Evo",
    brand: "Skullcandy",
    price: 5899,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/headphone/a/j/q/-original-imah96h6cpdzsbhx.jpeg?q=20&crop=false",
    category: "headphones"
  },
  
  {
    name: "Classic Leather Belt",
    brand: "Fossil",
    price: 1200,
    image: "https://www.nappadori.com/cdn/shop/files/everyday-classic-belt-2.jpg?v=1735645391",
    category: "accessories"
  },
  {
    name: "Aviator Sunglasses",
    brand: "Ray-Ban",
    price: 4500,
    image: "https://m.media-amazon.com/images/I/31k6ZX42BFL._AC_UY1100_.jpg",
    category: "accessories"
  },
  {
    name: "Smartwatch Strap",
    brand: "Apple",
    price: 2200,
    image: "https://m.media-amazon.com/images/I/61i1wjSb1eL._AC_UF1000,1000_QL80_.jpg",
    category: "accessories"
  },
  {
    name: "Leather Wallet",
    brand: "Tommy Hilfiger",
    price: 1500,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIJHxRZcUneBPKsQ8jH7qvzAnzlPUIcXbiiw&s",
    category: "accessories"
  },
  {
    name: "Silk Scarf",
    brand: "Hermès",
    price: 8000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-bHFSVobHGke4R5AWZuW14zxYK8sxctA54hQSzv8hIoIfYX714ApjbcEVgKwsNuhtOYw&usqp=CAU",
    category: "accessories"
  },
  {
    name: "Chic Hoop Earrings",
    brand: "Pandora",
    price: 1300,
    image: "https://assets.ajio.com/medias/sys_master/root/20240629/A5hA/667f611c6f60443f31ff50ae/-473Wx593H-463252556-gold-MODEL.jpg",
    category: "accessories"
  },
  {
    name: "Travel Backpack",
    brand: "North Face",
    price: 4000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5bVBKDIyT7xL6itEgffeuDkk7uQu1ghJV1A&s",
    category: "accessories"
  },
  {
    name: "Wireless Earbuds",
    brand: "Sony",
    price: 6000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-LWFvLzpDQWeaWi7eIAvZCm2ue9t11KWYQ&s://m.media-amazon.com/images/I/61dImFbN3eL._AC_SL1500_.jpg",
    category: "accessories"
  },
  {
    name: "Baseball Cap",
    brand: "New Era",
    price: 900,
    image: "https://m.media-amazon.com/images/I/81pcxPYU5hL._AC_UY1100_.jpg",
    category: "accessories"
  },
  
  {
    name: "Gen 6 Smartwatch",
    brand: "Fossil",
    price: 10500,
    image: "https://m.media-amazon.com/images/I/71Vqggkd8hL._AC_UF1000,1000_QL80_.jpg",
    category: "watches"
  },
  {
    name: "G-Shock GA-2100",
    brand: "Casio",
    price: 9500,
    image: "https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/G/GA/GA2/GA-2100-1A/assets/GA-2100-1A_Seq3.jpg.transform/main-visual-sp/image.jpg",
    category: "watches"
  },
  {
    name: "Apple Watch Series 9",
    brand: "Apple",
    price: 38900,
    image: "https://s3.ap-south-1.amazonaws.com/shop.unicorn/full/e5d9985ff9b7e613c6ce3b76d.jpeg",
    category: "watches"
  },
  {
    name: "Chronograph Watch",
    brand: "Titan",
    price: 4500,
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a4ddd8aa-657e-4d62-840a-e4cfcfd7bf06.__CR0,135,1001,619_PT0_SX970_V1___.jpeg",
    category: "watches"
  },
  {
    name: "Minimalist Mesh Watch",
    brand: "Daniel Wellington",
    price: 8999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHMVXRCSr7ppekr_-NDlHxe9h_4jBkxt5naw&s",
    category: "watches"
  },
  {
    name: "Analog Watch for Men",
    brand: "Fastrack",
    price: 2700,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQybYRzystdgaG0CDAdxj_wpfnwJTRPq26Vtw&s",
    category: "watches"
  },
  {
    name: "Digital Sports Watch",
    brand: "Skmei",
    price: 950,
    image: "https://images.meesho.com/images/products/161174466/3nlxj_512.webp",
    category: "watches"
  },
  {
    name: "Leather Strap Watch",
    brand: "Timex",
    price: 3500,
    image: "https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw107da5b9/images/Sonata/Catalog/77146YL01_4.jpg?sw=600&sh=600",
    category: "watches"
  }
  

    ];





app.get('/user/order', async (req, res) => {
  try {
    const userId = req.session.userId;  

    const orders = await Order.find({ user: userId })
      .populate('productId')   
      .exec();

    res.render('user/order', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error while fetching orders');
  }
});


app.get('/admin/dashboard', async (req, res) => {
  const users = await User.find();
  const orders = await Order.find().populate('user').populate('productId');
  res.render('admin-dashboard', {
    users,
    orders,
    success: req.query.success,
    error: req.query.error
  });
});


app.get('/user/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to destroy session');
    }
    res.redirect('/');
  });
});


 
    for (const product of sampleProducts) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`✅ Inserted: ${product.name}`);
      } else {
        console.log(`⚠️ Skipped (already exists): ${product.name}`);
      }
    }
  })
  .catch(err => console.error(err));
