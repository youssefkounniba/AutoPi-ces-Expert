# Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

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

## Instructions détaillées

### 1. MongoDB Atlas

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster (gratuit disponible)
3. Créez un utilisateur de base de données dans "Database Access"
4. Ajoutez votre IP à la whitelist dans "Network Access" (ou 0.0.0.0/0 pour le développement)
5. Cliquez sur "Connect" → "Connect your application"
6. Copiez la chaîne de connexion et remplacez `<password>` par votre mot de passe

### 2. Configuration Email (Gmail)

Pour utiliser Gmail avec Nodemailer :

1. Allez dans votre compte Google → [Sécurité](https://myaccount.google.com/security)
2. Activez la validation en 2 étapes si ce n'est pas déjà fait
3. Allez dans "Mots de passe des applications"
4. Créez un nouveau mot de passe d'application pour "Mail"
5. Utilisez ce mot de passe dans `EMAIL_PASS` (pas votre mot de passe Gmail normal)

### 3. Gemini API

1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez la clé et collez-la dans `GEMINI_API_KEY`

### 4. Secrets

Pour `SESSION_SECRET` et `JWT_SECRET`, générez des chaînes aléatoires sécurisées :

```bash
# Sur Linux/Mac
openssl rand -base64 32

# Ou utilisez un générateur en ligne
```




