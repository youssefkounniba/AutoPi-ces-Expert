# AutoMoteur Pro - E-commerce Website

Site e-commerce complet pour la vente de produits automobiles et moteurs, développé avec Node.js, Express.js, Handlebars et MongoDB Atlas.

## 🚀 Caractéristiques

- **Home Page** : Présentation de l'entreprise, mission, services et produits en vedette
- **Page Produits** : Liste complète avec recherche et filtres (catégorie, prix, mot-clé)
- **Page Détails Produit** : Informations détaillées avec spécifications techniques
- **Authentification Magic Link** : Connexion sécurisée sans mot de passe via email
- **Chatbot IA** : Assistant virtuel intégré utilisant l'API Gemini
- **Design Moderne** : Interface responsive et professionnelle

## 🛠️ Technologies

- **Backend** : Node.js + Express.js
- **Templating** : Handlebars (HBS)
- **Base de données** : MongoDB Atlas
- **Authentification** : Magic Link (sessions Express)
- **IA** : Google Gemini API
- **Email** : Nodemailer

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- Compte MongoDB Atlas
- Compte Gmail (pour l'envoi d'emails Magic Link)
- Clé API Gemini (optionnel pour le chatbot)

## 🔧 Installation

1. **Cloner ou télécharger le projet**

```bash
cd /home/youssef/new_app
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/automoteur-pro?retryWrites=true&w=majority

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# JWT Secret for Magic Links
JWT_SECRET=your-jwt-secret-key-change-this-in-production

# Email Configuration (for Magic Link)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Gemini API Key
GEMINI_API_KEY=your-gemini-api-key-here

# Base URL (for Magic Links)
BASE_URL=http://localhost:3000
```

### Configuration Email (Gmail)

Pour utiliser Gmail avec Nodemailer :

1. Activez l'authentification à deux facteurs sur votre compte Gmail
2. Générez un "Mot de passe d'application" :
   - Allez dans votre compte Google → Sécurité
   - Activez la validation en 2 étapes
   - Créez un mot de passe d'application
   - Utilisez ce mot de passe dans `EMAIL_PASS`

### Configuration MongoDB Atlas

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster
3. Créez un utilisateur de base de données
4. Ajoutez votre IP à la whitelist (ou 0.0.0.0/0 pour le développement)
5. Copiez la chaîne de connexion et remplacez `<password>` par votre mot de passe

### Configuration Gemini API

1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez une nouvelle clé API
3. Copiez la clé dans `GEMINI_API_KEY`

## 🗄️ Base de données

### Modèles

- **User** : Utilisateurs (email, nom, statut de vérification)
- **Product** : Produits (nom, description, prix, catégorie, stock, etc.)
- **Order** : Commandes (utilisateur, articles, montant total, statut)
- **Token** : Tokens Magic Link (expiration automatique)

### Seed la base de données

Pour remplir la base de données avec des produits de démonstration :

```bash
npm run seed
```

Cela créera 12 produits de test dans différentes catégories.

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
```

Le serveur démarre avec nodemon (rechargement automatique).

### Mode production

```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du projet

```
new_app/
├── models/              # Modèles Mongoose
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Token.js
├── routes/              # Routes Express
│   ├── index.js        # Home page
│   ├── products.js     # Produits et détails
│   ├── auth.js         # Authentification Magic Link
│   └── chatbot.js      # Chatbot Gemini
├── views/               # Templates Handlebars
│   ├── layouts/
│   │   └── main.hbs
│   ├── partials/
│   │   ├── header.hbs
│   │   ├── footer.hbs
│   │   └── chatbot.hbs
│   ├── home.hbs
│   ├── products.hbs
│   ├── product-detail.hbs
│   ├── 404.hbs
│   └── 500.hbs
├── public/              # Fichiers statiques
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/         # Images (à créer)
├── scripts/
│   └── seed.js         # Script de seed
├── server.js           # Point d'entrée
├── package.json
├── .env                # Variables d'environnement (à créer)
└── README.md
```

## 🎨 Identité visuelle

- **Nom de la marque** : AutoMoteur Pro
- **Couleurs principales** :
  - Bleu professionnel : `#1e3a8a`
  - Orange accent : `#f59e0b`
  - Rouge accent : `#ef4444`
- **Typographie** : Inter (Google Fonts)

## 🔐 Authentification Magic Link

1. L'utilisateur entre son email
2. Un token unique est généré et stocké en base
3. Un email avec un lien sécurisé est envoyé
4. Le lien expire après 15 minutes
5. Au clic, l'utilisateur est connecté via session

## 🤖 Chatbot

Le chatbot utilise l'API Gemini de Google pour répondre aux questions des clients concernant :
- Les produits disponibles
- Les caractéristiques techniques
- Les conseils d'achat
- Les informations sur l'entreprise

## 📝 Fonctionnalités

### Pages

- ✅ **Home** : Présentation, mission, services, produits en vedette
- ✅ **Produits** : Liste avec recherche et filtres
- ✅ **Détails Produit** : Informations complètes et produits similaires

### Recherche et Filtres

- Recherche par mot-clé (nom, description)
- Filtre par catégorie
- Filtre par prix (min/max)
- Tri (prix, nom, date)

### Authentification

- Magic Link par email
- Sessions Express
- Protection des routes (à implémenter si nécessaire)

## 🐛 Dépannage

### Erreur de connexion MongoDB

- Vérifiez votre chaîne de connexion dans `.env`
- Vérifiez que votre IP est dans la whitelist MongoDB Atlas
- Vérifiez vos identifiants

### Erreur d'envoi d'email

- Vérifiez vos identifiants Gmail
- Utilisez un "Mot de passe d'application" (pas votre mot de passe Gmail)
- Vérifiez que la validation en 2 étapes est activée

### Chatbot ne fonctionne pas

- Vérifiez que `GEMINI_API_KEY` est défini dans `.env`
- Vérifiez votre quota API Gemini

## 📄 Licence

ISC

## 👤 Auteur

Développé pour le hackathon e-commerce

---

**Bon développement ! 🚀**




