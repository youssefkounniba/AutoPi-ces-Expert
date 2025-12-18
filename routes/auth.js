const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Token = require('../models/Token');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Request magic link
router.post('/magic-link', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email requis' 
      });
    }
    
    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      user = new User({
        email: email.toLowerCase(),
        name: email.split('@')[0]
      });
      await user.save();
    }
    
    // Generate token
    const tokenString = Token.generateToken();
    const token = new Token({
      token: tokenString,
      user: user._id,
      type: 'magic-link',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    });
    await token.save();
    
    // Create magic link
    const magicLink = `${process.env.BASE_URL || 'http://localhost:3000'}/auth/verify?token=${tokenString}`;
    
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Connexion à AutoPièces Expert',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">AutoPièces Expert</h2>
          <p>Bonjour,</p>
          <p>Cliquez sur le lien ci-dessous pour vous connecter à votre compte :</p>
          <p style="margin: 30px 0;">
            <a href="${magicLink}" 
               style="background-color: #1e3a8a; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Se connecter
            </a>
          </p>
          <p>Ce lien expirera dans 15 minutes.</p>
          <p>Si vous n'avez pas demandé ce lien, ignorez cet email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            AutoPièces Expert - Votre spécialiste en pièces automobiles, moteurs et accessoires
          </p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Un lien de connexion a été envoyé à votre adresse email.' 
    });
  } catch (error) {
    console.error('Error sending magic link:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi du lien de connexion' 
    });
  }
});

// Verify magic link token
router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.redirect('/?error=token-missing');
    }
    
    // Find token
    const tokenDoc = await Token.findOne({ token, type: 'magic-link' });
    
    if (!tokenDoc || !tokenDoc.isValid()) {
      return res.redirect('/?error=invalid-token');
    }
    
    // Get user
    const user = await User.findById(tokenDoc.user);
    
    if (!user) {
      return res.redirect('/?error=user-not-found');
    }
    
    // Mark token as used
    tokenDoc.used = true;
    await tokenDoc.save();
    
    // Update user
    user.isVerified = true;
    user.lastLogin = new Date();
    await user.save();
    
    // Create session
    req.session.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    };
    
    res.redirect('/?success=logged-in');
  } catch (error) {
    console.error('Error verifying token:', error);
    res.redirect('/?error=verification-failed');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ success: false, message: 'Erreur lors de la déconnexion' });
    }
    res.json({ success: true, message: 'Déconnexion réussie' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.json({ success: false, user: null });
  }
});

module.exports = router;

