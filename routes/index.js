const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Home page
router.get('/', async (req, res) => {
  try {
    // Get featured products (latest 6 products)
    const featuredProducts = await Product.find({ isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    
    // Ensure all products have valid images
    featuredProducts.forEach(product => {
      if (!product.image || product.image.startsWith('/images/')) {
        product.image = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80';
      }
    });

    res.render('home', {
      title: 'Accueil - AutoPièces Expert',
      featuredProducts
    });
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).render('500', {
      title: 'Erreur',
      error: error.message
    });
  }
});

module.exports = router;

