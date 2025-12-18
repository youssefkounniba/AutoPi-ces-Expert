const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Chatbot endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message requis'
      });
    }
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Configuration API manquante'
      });
    }
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Create context for the chatbot
    const context = `Tu es un assistant virtuel pour AutoPièces Expert, une entreprise spécialisée dans la vente de produits automobiles, moteurs et accessoires (pièces auto, moteurs, moteurs hydrauliques, accessoires, etc.).

Tu dois répondre de manière professionnelle et utile aux questions des clients concernant :
- Les produits disponibles (moteurs, moteurs hydrauliques, pièces auto, accessoires, huiles, filtres)
- Les caractéristiques techniques
- Les conseils d'achat
- Les informations sur l'entreprise

Sois concis, professionnel et toujours prêt à aider. Si tu ne connais pas la réponse, dirige le client vers notre page de contact ou notre catalogue de produits.

Question du client: ${message}`;
    
    // Generate response
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();
    
    res.json({
      success: true,
      response: text
    });
  } catch (error) {
    console.error('Error with chatbot:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération de la réponse',
      error: error.message
    });
  }
});

module.exports = router;

