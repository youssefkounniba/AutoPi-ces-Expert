const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Images mapping par type de produit
const productImages = {
    // Moteurs automobiles
    'Moteur Diesel': 'https://www.betweeneastwest.com/upload/20210324/1616552240wmfxek.jpg',
    'Moteur Essence': 'https://wordpress-content.vroomly.com/wp-content/uploads/2023/03/iStock-144956451.jpg',
    'Moteur V6': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Peugeot_407_V6_engine.JPG',
    // Moteurs hydrauliques
    'Moteur Hydraulique': 'https://socomhy.com/media/images/moteur-roue-hydraulique-moissonneuse.400x400.jpg',
    // Pièces auto
    'Kit Distribution': 'https://www.gomecano.com/wp-content/uploads/2021/09/kit-distribution-gomecano-2.jpg',
    'Alternateur': 'https://images.ad.fr/1/image/fonctionnement-alternateur.jpg',
    'Démarreur': 'https://www.aurel-automobile.fr/media/images/upload/D%C3%A9marreur.jpg',
    'Pompe': 'https://cptechmaroc.ma/wp-content/uploads/2021/02/pompe_f_50_pedrollo_3-1.jpg',
    'Radiateur': 'https://wordpress-content.vroomly.com/wp-content/uploads/2023/03/iStock-465894354.jpg',
    // Filtres
    'Filtre': 'https://previews.123rf.com/images/zorandim/zorandim1203/zorandim120300010/12796842-filters-for-car-isolated-on-a-white-background.jpg',
    // Huiles et fluides
    'Huile': 'https://i.gaw.to/content/photos/42/56/425628-huile-a-moteur-minerale-ou-synthetique-faites-le-bon-choix.jpg',
    'Liquide': 'https://www.ecoleauto.com/wp-content/uploads/2020/12/liquides-de-refroidissement.jpg',
    // Accessoires
    'Kit Outils': 'https://mrbricolage.ma/wp-content/uploads/2022/05/941462-2-scaled-1.jpg',
    'Câbles': 'https://blog.materielelectrique.com/wp-content/uploads/2023/06/choisir-les-cables-electriques.jpg',
    'Bougies': 'https://cdn-s-www.lalsace.fr/images/38B9ADEC-A8B5-4CA6-8630-DFE6401EC328/NW_raw/illustration-adobestock-1610452131.jpg'
};

// Fonction pour obtenir l'image appropriée selon le nom du produit
function getProductImage(name, category) {
    const nameLower = name.toLowerCase();
    
    // Moteurs Diesel - image moteur diesel
    if (nameLower.includes('moteur diesel') || (nameLower.includes('diesel') && nameLower.includes('moteur'))) {
        return 'https://www.betweeneastwest.com/upload/20210324/1616552240wmfxek.jpg';
    }
    
    // Moteurs Essence/V6 - image moteur essence
    if (nameLower.includes('moteur essence') || nameLower.includes('v6') || 
        (nameLower.includes('essence') && nameLower.includes('moteur'))) {
        return 'https://wordpress-content.vroomly.com/wp-content/uploads/2023/03/iStock-144956451.jpg';
    }
    
    // Moteurs Hydrauliques - image équipement industriel
    if (nameLower.includes('moteur hydraulique') || category === 'Moteur Hydraulique') {
        return 'https://socomhy.com/media/images/moteur-roue-hydraulique-moissonneuse.400x400.jpg';
    }
    
    // Filtres - image filtre/pièce mécanique
    if (nameLower.includes('filtre')) {
        return 'https://previews.123rf.com/images/zorandim/zorandim1203/zorandim120300010/12796842-filters-for-car-isolated-on-a-white-background.jpg';
    }
    
    // Huiles et fluides - image bouteille/fluide
    if (nameLower.includes('huile') || nameLower.includes('liquide')) {
        return 'https://i.gaw.to/content/photos/42/56/425628-huile-a-moteur-minerale-ou-synthetique-faites-le-bon-choix.jpg';
    }
    
    // Pièces auto spécifiques
    if (nameLower.includes('alternateur')) {
        return 'https://images.ad.fr/1/image/fonctionnement-alternateur.jpg';
    }
    if (nameLower.includes('démarreur')) {
        return 'https://www.aurel-automobile.fr/media/images/upload/D%C3%A9marreur.jpg';
    }
    if (nameLower.includes('pompe') || nameLower.includes('radiateur')) {
        return 'https://cptechmaroc.ma/wp-content/uploads/2021/02/pompe_f_50_pedrollo_3-1.jpg';
    }
    if (nameLower.includes('kit distribution') || nameLower.includes('distribution')) {
        return 'https://www.gomecano.com/wp-content/uploads/2021/09/kit-distribution-gomecano-2.jpg';
    }
    
    // Accessoires
    if (nameLower.includes('outils') || nameLower.includes('kit outils')) {
        return 'https://mrbricolage.ma/wp-content/uploads/2022/05/941462-2-scaled-1.jpg';
    }
    if (nameLower.includes('câbles') || nameLower.includes('cables')) {
        return 'https://blog.materielelectrique.com/wp-content/uploads/2023/06/choisir-les-cables-electriques.jpg';
    }
    if (nameLower.includes('bougies')) {
        return 'https://cdn-s-www.lalsace.fr/images/38B9ADEC-A8B5-4CA6-8630-DFE6401EC328/NW_raw/illustration-adobestock-1610452131.jpg';
    }
    
    // Image par défaut
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80';
}

// Sample products data
const products = [
    {
        name: 'Moteur Diesel 2.0L TDI',
        description: 'Moteur diesel haute performance 2.0L TDI, idéal pour véhicules utilitaires et particuliers. Garantie constructeur, reconditionné avec pièces d\'origine.',
        price: 3499.99,
        category: 'Moteur',
        engineType: 'Diesel 2.0L',
        image: getProductImage('Moteur Diesel 2.0L TDI', 'Moteur'),
        stock: 5,
        isAvailable: true,
        specifications: {
            'Puissance': '150 CV',
            'Couple': '320 Nm',
            'Cylindrée': '1968 cm³',
            'Norme': 'Euro 6',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Moteur Hydraulique Axial Piston',
        description: 'Moteur hydraulique à pistons axiaux haute pression, parfait pour applications industrielles et engins de chantier. Performance et durabilité exceptionnelles.',
        price: 2499.99,
        category: 'Moteur Hydraulique',
        engineType: 'Axial Piston',
        image: getProductImage('Moteur Hydraulique Axial Piston', 'Moteur Hydraulique'),
        stock: 8,
        isAvailable: true,
        specifications: {
            'Débit': '50 L/min',
            'Pression max': '350 bar',
            'Vitesse': '3000 rpm',
            'Rendement': '95%',
            'Garantie': '24 mois'
        }
    },
    {
        name: 'Moteur Essence 1.6L Turbo',
        description: 'Moteur essence turbo 1.6L dernière génération. Économique et performant, respecte les normes environnementales les plus strictes.',
        price: 2799.99,
        category: 'Moteur',
        engineType: 'Essence Turbo 1.6L',
        image: getProductImage('Moteur Essence 1.6L Turbo', 'Moteur'),
        stock: 3,
        isAvailable: true,
        specifications: {
            'Puissance': '180 CV',
            'Couple': '250 Nm',
            'Cylindrée': '1598 cm³',
            'Norme': 'Euro 6d',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Moteur Hydraulique Orbital',
        description: 'Moteur hydraulique orbital compact et efficace. Idéal pour applications mobiles et systèmes de direction assistée.',
        price: 899.99,
        category: 'Moteur Hydraulique',
        engineType: 'Orbital',
        image: getProductImage('Moteur Hydraulique Orbital', 'Moteur Hydraulique'),
        stock: 12,
        isAvailable: true,
        specifications: {
            'Débit': '20 L/min',
            'Pression max': '210 bar',
            'Vitesse': '4000 rpm',
            'Rendement': '92%',
            'Garantie': '18 mois'
        }
    },
    {
        name: 'Kit Distribution Complète',
        description: 'Kit de distribution complet avec courroie, tendeur, galets et pompe à eau. Compatible avec la plupart des moteurs essence et diesel.',
        price: 199.99,
        category: 'Pièces Auto',
        engineType: 'Universal',
        image: getProductImage('Kit Distribution Complète', 'Pièces Auto'),
        stock: 25,
        isAvailable: true,
        specifications: {
            'Composition': 'Courroie + Tendeur + Galets + Pompe',
            'Garantie': '24 mois',
            'Compatibilité': 'Multi-marques'
        }
    },
    {
        name: 'Filtre à Huile Premium',
        description: 'Filtre à huile haute qualité avec membrane synthétique. Filtration optimale pour une protection maximale du moteur.',
        price: 24.99,
        category: 'Filtres',
        engineType: 'Universal',
        image: getProductImage('Filtre à Huile Premium', 'Filtres'),
        stock: 50,
        isAvailable: true,
        specifications: {
            'Type': 'Synthétique',
            'Efficacité': '99.9%',
            'Durée de vie': '15 000 km',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Huile Moteur 5W-30 Synthétique',
        description: 'Huile moteur synthétique 5W-30 de qualité premium. Protection optimale pour moteurs essence et diesel, toutes saisons.',
        price: 49.99,
        category: 'Huile et Fluides',
        engineType: 'Universal',
        image: getProductImage('Huile Moteur 5W-30 Synthétique', 'Huile et Fluides'),
        stock: 100,
        isAvailable: true,
        specifications: {
            'Viscosité': '5W-30',
            'Type': 'Synthétique',
            'Volume': '5L',
            'Norme': 'ACEA C3',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Alternateur 12V 120A',
        description: 'Alternateur haute performance 12V 120A. Compatible avec la plupart des véhicules modernes. Garantie constructeur.',
        price: 349.99,
        category: 'Pièces Auto',
        engineType: 'Universal',
        image: getProductImage('Alternateur 12V 120A', 'Pièces Auto'),
        stock: 15,
        isAvailable: true,
        specifications: {
            'Tension': '12V',
            'Intensité': '120A',
            'Garantie': '24 mois',
            'Compatibilité': 'Multi-marques'
        }
    },
    {
        name: 'Démarreur 12V Haute Performance',
        description: 'Démarreur 12V haute performance avec moteur à aimants permanents. Démarrage rapide et fiable par tous temps.',
        price: 299.99,
        category: 'Pièces Auto',
        engineType: 'Universal',
        image: getProductImage('Démarreur 12V Haute Performance', 'Pièces Auto'),
        stock: 10,
        isAvailable: true,
        specifications: {
            'Tension': '12V',
            'Puissance': '1.4 kW',
            'Garantie': '24 mois',
            'Compatibilité': 'Multi-marques'
        }
    },
    {
        name: 'Moteur Hydraulique Radial',
        description: 'Moteur hydraulique radial robuste pour applications lourdes. Conçu pour résister aux conditions extrêmes.',
        price: 1899.99,
        category: 'Moteur Hydraulique',
        engineType: 'Radial',
        image: getProductImage('Moteur Hydraulique Radial', 'Moteur Hydraulique'),
        stock: 6,
        isAvailable: true,
        specifications: {
            'Débit': '80 L/min',
            'Pression max': '420 bar',
            'Vitesse': '2500 rpm',
            'Rendement': '96%',
            'Garantie': '24 mois'
        }
    },
    {
        name: 'Accessoire Kit Outils Professionnel',
        description: 'Kit d\'outils professionnel complet pour mécanique automobile. Inclut clés, douilles, tournevis et accessoires essentiels.',
        price: 149.99,
        category: 'Accessoires',
        engineType: 'N/A',
        image: getProductImage('Accessoire Kit Outils Professionnel', 'Accessoires'),
        stock: 30,
        isAvailable: true,
        specifications: {
            'Pièces': '150+',
            'Garantie': '12 mois',
            'Type': 'Professionnel'
        }
    },
    {
        name: 'Filtre à Air Sport',
        description: 'Filtre à air sport haute performance. Améliore le débit d\'air et les performances du moteur. Lavable et réutilisable.',
        price: 79.99,
        category: 'Filtres',
        engineType: 'Universal',
        image: getProductImage('Filtre à Air Sport', 'Filtres'),
        stock: 20,
        isAvailable: true,
        specifications: {
            'Type': 'Sport',
            'Réutilisable': 'Oui',
            'Performance': '+15% débit',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Moteur V6 3.0L Essence',
        description: 'Moteur V6 essence 3.0L haute performance. Puissance et couple exceptionnels pour véhicules sportifs et de luxe.',
        price: 4599.99,
        category: 'Moteur',
        engineType: 'Essence V6 3.0L',
        image: getProductImage('Moteur V6 3.0L Essence', 'Moteur'),
        stock: 4,
        isAvailable: true,
        specifications: {
            'Puissance': '280 CV',
            'Couple': '350 Nm',
            'Cylindrée': '2995 cm³',
            'Norme': 'Euro 6',
            'Garantie': '18 mois'
        }
    },
    {
        name: 'Moteur Hydraulique à Pistons',
        description: 'Moteur hydraulique à pistons haute pression pour applications industrielles. Performance et fiabilité garanties.',
        price: 3299.99,
        category: 'Moteur Hydraulique',
        engineType: 'Pistons',
        image: getProductImage('Moteur Hydraulique à Pistons', 'Moteur Hydraulique'),
        stock: 7,
        isAvailable: true,
        specifications: {
            'Débit': '100 L/min',
            'Pression max': '450 bar',
            'Vitesse': '2800 rpm',
            'Rendement': '97%',
            'Garantie': '24 mois'
        }
    },
    {
        name: 'Pompe à Eau Haute Performance',
        description: 'Pompe à eau haute performance avec corps en aluminium. Refroidissement optimal du moteur, compatible multi-marques.',
        price: 129.99,
        category: 'Pièces Auto',
        engineType: 'Universal',
        image: getProductImage('Pompe à Eau Haute Performance', 'Pièces Auto'),
        stock: 35,
        isAvailable: true,
        specifications: {
            'Matériau': 'Aluminium',
            'Garantie': '24 mois',
            'Compatibilité': 'Multi-marques',
            'Performance': 'Haute'
        }
    },
    {
        name: 'Radiateur Aluminium Performance',
        description: 'Radiateur en aluminium haute performance. Refroidissement efficace, résistant et durable pour tous types de véhicules.',
        price: 249.99,
        category: 'Pièces Auto',
        engineType: 'Universal',
        image: getProductImage('Radiateur Aluminium Performance', 'Pièces Auto'),
        stock: 18,
        isAvailable: true,
        specifications: {
            'Matériau': 'Aluminium',
            'Garantie': '24 mois',
            'Type': 'Performance',
            'Compatibilité': 'Multi-marques'
        }
    },
    {
        name: 'Huile Moteur 10W-40 Semi-Synthétique',
        description: 'Huile moteur semi-synthétique 10W-40. Protection optimale pour moteurs essence et diesel, toutes saisons.',
        price: 39.99,
        category: 'Huile et Fluides',
        engineType: 'Universal',
        image: getProductImage('Huile Moteur 10W-40 Semi-Synthétique', 'Huile et Fluides'),
        stock: 80,
        isAvailable: true,
        specifications: {
            'Viscosité': '10W-40',
            'Type': 'Semi-Synthétique',
            'Volume': '5L',
            'Norme': 'ACEA A3/B4',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Liquide de Refroidissement Premium',
        description: 'Liquide de refroidissement premium longue durée. Protection contre la corrosion et le gel jusqu\'à -37°C.',
        price: 19.99,
        category: 'Huile et Fluides',
        engineType: 'Universal',
        image: getProductImage('Liquide de Refroidissement Premium', 'Huile et Fluides'),
        stock: 60,
        isAvailable: true,
        specifications: {
            'Type': 'Longue durée',
            'Protection gel': '-37°C',
            'Volume': '5L',
            'Garantie': '12 mois'
        }
    },
    {
        name: 'Filtre à Carburant Haute Performance',
        description: 'Filtre à carburant haute performance. Filtration fine pour protection optimale du système d\'injection.',
        price: 34.99,
        category: 'Filtres',
        engineType: 'Universal',
        image: getProductImage('Filtre à Carburant Haute Performance', 'Filtres'),
        stock: 40,
        isAvailable: true,
        specifications: {
            'Type': 'Haute performance',
            'Filtration': '5 microns',
            'Garantie': '12 mois',
            'Compatibilité': 'Multi-marques'
        }
    },
    {
        name: 'Câbles de Batterie Premium',
        description: 'Câbles de batterie premium avec gaine isolante renforcée. Conductivité optimale et résistance aux intempéries.',
        price: 89.99,
        category: 'Accessoires',
        engineType: 'Universal',
        image: getProductImage('Câbles de Batterie Premium', 'Accessoires'),
        stock: 25,
        isAvailable: true,
        specifications: {
            'Section': '25 mm²',
            'Longueur': '3 mètres',
            'Garantie': '24 mois',
            'Type': 'Premium'
        }
    },
    {
        name: 'Bougies d\'Allumage Iridium',
        description: 'Bougies d\'allumage iridium haute performance. Allumage optimal, durée de vie prolongée et économie de carburant.',
        price: 44.99,
        category: 'Accessoires',
        engineType: 'Universal',
        image: getProductImage('Bougies d\'Allumage Iridium', 'Accessoires'),
        stock: 50,
        isAvailable: true,
        specifications: {
            'Type': 'Iridium',
            'Durée de vie': '100 000 km',
            'Garantie': '24 mois',
            'Performance': 'Haute'
        }
    }
];

async function seedDatabase() {
    try {
        console.log("🔌 Connexion à MongoDB Atlas...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connecté à la base de données');
        
        // Supprimer les anciens index qui pourraient causer des problèmes
        try {
            await Product.collection.dropIndexes();
            console.log('🗑️  Anciens index supprimés');
        } catch (err) {
            console.log('⚠️  Pas d\'index à supprimer ou erreur:', err.message);
        }
        
        // Supprime les anciennes données pour éviter les doublons
        await Product.deleteMany({});
        console.log('🗑️  Collection nettoyée.');
        
        // Insère les produits un par un pour éviter les erreurs d'index
        let insertedCount = 0;
        let errorCount = 0;
        
        for (const product of products) {
            try {
                await Product.create(product);
                insertedCount++;
            } catch (error) {
                console.error(`⚠️  Erreur pour "${product.name}":`, error.message);
                errorCount++;
            }
        }
        
        console.log(`🎉 Succès ! ${insertedCount} produits insérés sur ${products.length}`);
        if (errorCount > 0) {
            console.log(`⚠️  ${errorCount} produits n'ont pas pu être insérés`);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur :', error.message);
        process.exit(1);
    }
}

seedDatabase();
