const mongoose = require('mongoose');
const crypto = require('crypto');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['magic-link', 'password-reset'],
    default: 'magic-link'
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  },
  used: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster token lookups
tokenSchema.index({ token: 1 });
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to generate token
tokenSchema.statics.generateToken = function() {
  return crypto.randomBytes(32).toString('hex');
};

// Alternative: instance method (not used, but available)
tokenSchema.methods.generateNewToken = function() {
  this.token = crypto.randomBytes(32).toString('hex');
  return this.token;
};

// Method to check if token is valid
tokenSchema.methods.isValid = function() {
  return !this.used && this.expiresAt > new Date();
};

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;

