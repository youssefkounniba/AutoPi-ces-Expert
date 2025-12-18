const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Page liste des produits
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    
    // 1. Construction de la requête
    let query = { isAvailable: true };
    
    // Recherche par mot-clé
    if (search) {
      // Note: Nécessite que l'index textuel soit créé dans le modèle (ce qui est le cas dans ton Product.js)
      query.$text = { $search: search };
    }
    
    // Filtre par catégorie
    if (category) {
      if (category === 'moteurs') {
        query.category = { $in: ['Moteur', 'Moteur Hydraulique'] };
      } else {
        query.category = category;
      }
    }
    
    // Filtre prix
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // 2. Options de tri
    let sortOptions = {};
    switch(sort) {
      case 'price-asc': sortOptions = { price: 1 }; break;
      case 'price-desc': sortOptions = { price: -1 }; break;
      case 'name-asc': sortOptions = { name: 1 }; break;
      case 'name-desc': sortOptions = { name: -1 }; break;
      default: sortOptions = { createdAt: -1 };
    }
    
    // 3. Récupération des données
    console.log("🔍 Recherche produits avec query:", JSON.stringify(query)); // Debug
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .lean();
      
    console.log(`✅ ${products.length} produits trouvés.`); // Debug

    // 4. Récupérer les catégories uniques pour le menu déroulant
    const categories = await Product.distinct('category');
    
    // 5. Rendu de la vue
    res.render('products', {
      title: 'Nos Produits - AutoMoteur Pro',
      products,
      categories,
      // On renvoie les valeurs pour garder le formulaire rempli
      currentSearch: search || '',
      currentCategory: category || '',
      currentMinPrice: minPrice || '',
      currentMaxPrice: maxPrice || '',
      currentSort: sort || 'newest',
      count: products.length
    });

  } catch (error) {
    console.error('❌ Erreur chargement produits:', error);
    res.status(500).render('500', {
      title: 'Erreur Serveur',
      error: error.message
    });
  }
});

// Page détail produit
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    
    if (!product) {
      return res.status(404).render('404', { title: 'Produit non trouvé' });
    }
    
    // Produits similaires
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isAvailable: true
    })
    .limit(4)
    .lean();
    
    res.render('product-detail', {
      title: `${product.name} - AutoMoteur Pro`,
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('❌ Erreur détail produit:', error);
    res.status(500).render('500', { title: 'Erreur', error: error.message });
  }
});

module.exports = router;