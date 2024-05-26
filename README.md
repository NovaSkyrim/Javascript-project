# Disney Attractions Wait Time Predictor

Bienvenue dans le projet de prédiction des temps d'attente des attractions Disney ! 🎢✨

Ce projet vise à créer un programme JavaScript utilisant Ramda pour prédire les temps d'attente aux attractions de Disneyland Paris.

## À Propos

Dans ce projet, nous exploitons la puissance de Ramda, une bibliothèque de programmation fonctionnelle pratique pour JavaScript, pour analyser les données historiques des temps d'attente des attractions Disney. En analysant les données historiques des temps d'attente et en utilisant un algorithme prédictif, nous visons à prévoir les temps d'attente futurs pour ces attractions.

## Fonctionnalités

- **Analyse des Données**: Utilisation des capacités de programmation fonctionnelle de Ramda pour analyser les données historiques des temps d'attente.
- **Modélisation Prédictive**: Implémentation d'un algorithmes prédictif pour prévoir les temps d'attente futurs basés sur les tendances historiques.

## Technologies utilisées

- Node.js - Plateforme d'exécution JavaScript côté serveur

- Ramda - Bibliothèque JavaScript pour la programmation fonctionnelle

<div style="text-align: center;">
  <img src="NodeJSLogo.png" alt="Node.js Logo" style="height: 100px;">
  <img src="RamdaLogo.png" alt="Ramda Logo" style="height: 100px;">
</div>

## Descriptif du programme

1. Initialisation des données :

Les données historiques des temps d'attente sont préalablement définies dans `historicalDataLastWeek`.

2. Calcul des coefficients :

La fonction `generateCoefficientLists` parcourt les données historiques et calcule les coefficients associés à chaque heure en fonction des données précédentes. Ces coefficients représentent la variation des temps d'attente par rapport à l'heure de référence.

3. Obtention des poids des coefficients :

La fonction `getCoefficientWeights` calcule les poids des coefficients en fonction des minutes actuelles. Ces poids sont utilisés pour pondérer les coefficients lors de la prédiction.

4. Prédiction du temps d'attente :

La fonction `predictWaitTime` prend en entrée le nombre d'heures à prédire, le temps d'attente actuel, et les coefficients calculés. Elle utilise ces informations pour estimer le temps d'attente futur en combinant les coefficients pondérés.

5. Obtention du temps d'attente actuel :

La fonction `getCurrentWaitTime` prend l'heure actuelle et les minutes pour obtenir le temps d'attente actuel à partir des données historiques.

6. Interaction avec l'utilisateur :

Le programme principal affiche l'heure actuelle et le temps d'attente actuel, puis demande à l'utilisateur le nombre d'heures pour la prédiction.
Si l'entrée de l'utilisateur est valide, le programme affiche la prédiction du temps d'attente pour le nombre d'heures spécifié.

## Installation

Assurez-vous d'avoir Node.js installé sur votre système. Clonez ensuite ce dépôt sur votre machine locale :

`git clone https://github.com/NovaSkyrim/Javascript-project.git`

Installez les dépendances nécessaires en exécutant la commande suivante à la racine du projet :

`npm install`

Pour exécuter le programme, utilisez la commande suivante :

`node disney-line.js`

Le programme vous demandera dans combien d'heures vous souhaitez prédire le temps d'attente. Vous devrez entrer un nombre entier positif pour représenter le nombre d'heures. L'heure de prédiction doit rester dans la plage valide (avant 23h).

Une fois que vous avez saisi le nombre d'heures, le programme affichera une estimation du temps d'attente prévu pour cet horaire.










