const R = require('ramda');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const historicalDataLastWeek = [
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

// Création d'une liste de liste de coefficients
const generateCoefficientLists = data => {
    const coefficients = R.map(hour => {
        const startIndex = data.findIndex(entry => entry.hour === hour.hour) + 1;
        const relevantData = data.slice(startIndex);

        return R.map(h => {
            return Math.round((h.waitTime / hour.waitTime) * 100) / 100;
        }, relevantData);
    }, data);

    return coefficients;
};

const coefficientLists = generateCoefficientLists(historicalDataLastWeek);

// Fonction pour obtenir les poids des coefficients en fonction des minutes actuelles
const getCoefficientWeights = () => {
    const minutes = new Date().getMinutes();

    const coeff_weight = 1 - (1 / 60) * minutes;
    const weight_nextHour = 1 - coeff_weight;

    return [coeff_weight, weight_nextHour];
};

// Fonction pour obtenir le coefficient d'une heure donnée
const getCoefficient = R.curry((hour, x, coefficientLists) =>
    R.pathOr(1, [hour - 9, x - 1], coefficientLists)
);

const predictWaitTime = R.curry((x, currentWaitTime, coefficientLists) => {
    const hours = new Date().getHours();
    const nextHour = hours + x;

    // Récupérer les coefficients pour l'heure actuelle et l'heure suivante
    const coeff = getCoefficient(hours, x, coefficientLists);
    const coeffNextHour = getCoefficient(nextHour, x, coefficientLists);

    // Récupérer les poids
    const [currentWeight, nextHourWeight] = getCoefficientWeights();

    // Calcul du temps d'attente pondéré
    const weightedCoeff = R.add(
        R.multiply(currentWeight, coeff),
        R.multiply(nextHourWeight, coeffNextHour)
    );

    return Math.round(R.multiply(weightedCoeff, currentWaitTime));
});

// Fonction pour obtenir le temps d'attente actuel en tenant compte des minutes
const getCurrentWaitTime = (hours, minutes) => {
    const adjustedHour = minutes > 30 ? hours + 1 : hours;
    return historicalDataLastWeek.find(entry => entry.hour === adjustedHour)?.waitTime || 0;
};


const main = async () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const currentHourWaitTime = getCurrentWaitTime(hours, minutes);

    console.log(`Il est ${hours}:${minutes.toString().padStart(2, '0')}`);
    console.log(`Le temps d'attente actuel à ${hours}h${minutes.toString().padStart(2, '0')} est de ${currentHourWaitTime} minutes.`);

    readline.question('Dans combien d\'heures voulez-vous prédire le temps d\'attente ? ', async (targetHourString) => {
        const x = parseInt(targetHourString);
        if (isNaN(x) || x < 0 || hours + x > 23)  {
            console.error('Veuillez saisir un entier positif pour représenter le nombre d\'heures. L\'heure de prédiction doit rester dans la plage valide (avant 23h)' );
            readline.close();
            return;
        }

        const waitTimePrediction = predictWaitTime(x, currentHourWaitTime, coefficientLists);

        console.log(`Le temps d'attente prédit dans ${x} heures est d'environ ${waitTimePrediction} minutes.`);

        readline.close();
    });
};

main();