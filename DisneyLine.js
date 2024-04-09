const R = require('ramda'); // Importation de la bibliothèque Ramda

const historicalDataLastWeek = [ // Données historiques des temps d'attente
    { hour: 9, waitTime: 20 },
    { hour: 10, waitTime: 25 },
    { hour: 11, waitTime: 30 },
    { hour: 12, waitTime: 35 },
    { hour: 13, waitTime: 40 },
    { hour: 14, waitTime: 45 },
    { hour: 15, waitTime: 50 },
    { hour: 16, waitTime: 55 },
    { hour: 17, waitTime: 60 },
    { hour: 18, waitTime: 65 },
    { hour: 19, waitTime: 70 },
    { hour: 20, waitTime: 75 },
    { hour: 21, waitTime: 80 },
    { hour: 22, waitTime: 85 },
    { hour: 23, waitTime: 90 },
];

// Fonction pour générer une liste de listes des coefficients de multiplication
const generateCoefficientLists = data => {
    const coefficients = R.map(hour => { // Pour chaque heure dans les données
        // Trouver l'index de l'heure actuelle dans les données
        const startIndex = data.findIndex(entry => entry.hour === hour.hour) + 1;
        // Extraire les données pour les heures suivantes à partir de l'heure actuelle
        const relevantData = data.slice(startIndex);
        // Pour chaque heure ultérieure, calculer le coefficient de multiplication par rapport à l'heure actuelle
        return R.map(h => {
            // Calcul du coefficient en arrondissant à deux décimales
            return Math.round((h.waitTime / hour.waitTime) * 100) / 100;
        }, relevantData);
    }, data);
    return coefficients; // Retourner la liste de listes des coefficients
};

const coefficientLists = generateCoefficientLists(historicalDataLastWeek); // Appel de la fonction avec les données historiques
console.log(coefficientLists); // Affichage des coefficients de multiplication
