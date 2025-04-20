Concevoir une carte interactive de location de vélos :

Ce projet, réalisé dans le cadre du parcours Développeur Web d'OpenClassrooms, consiste à développer une Single Page Application (SPA) simulant la réservation de vélos dans une ville à l'aide de l'API temps réel de JCDecaux. L'application affiche une carte interactive des stations de vélos, un diaporama explicatif, et permet de réserver un vélo avec stockage local des données via l'API Web Storage.
Structure du projet.

Fichiers principaux :

index.html : Structure principale de la page (diaporama, carte, panneau de station, formulaire de réservation, et canvas pour la signature).
css/style.css : Feuille de style personnalisée pour l'interface, utilisant Bootstrap pour la mise en page responsive.
js/api.js : Gestion des requêtes à l'API JCDecaux pour récupérer les données des stations en temps réel.
js/canvas.js : Implémentation de l'API HTML5 Canvas pour la signature utilisateur, sans plugin.
js/map.js : Configuration de la carte interactive avec LeafletJS, affichant les marqueurs des stations.
js/reservation.js : Gestion des réservations (stockage via Web Storage, décompte de 20 minutes, affichage de l'état).
js/script.js : Logique principale de l'application, incluant la coordination entre les modules.
js/slideshow.js : Implémentation du diaporama (changement automatique toutes les 5 secondes, contrôles manuels via clics et touches clavier).
README.md : Ce fichier, décrivant le projet.

Données :
Les données des stations de vélos (localisation, état, disponibilité) sont récupérées en temps réel via l'API JCDecaux pour la ville choisie (par exemple, Lyon). Les données de réservation (nom, prénom, signature) sont stockées localement dans le navigateur avec l'API Web Storage.

Objectifs du projet :

Développer une SPA en JavaScript orienté objet, sans code côté serveur.

Fonctionnalités principales :

Diaporama : Présente le fonctionnement de l'application, avec transition automatique (5s), pause, et navigation manuelle (clics, touches gauche/droite).
Carte interactive : Affiche les stations de vélos avec LeafletJS, avec marqueurs cliquables montrant les détails (état, vélos disponibles, places).
Réservation : Permet de réserver un vélo en entrant nom/prénom et en signant via Canvas. La réservation expire après 20 minutes ou à la fermeture du navigateur.
Stockage local : Sauvegarde le nom/prénom pour préremplissage et affiche l'état de la réservation avec un décompte dynamique.


Contraintes techniques :

Programmation Orientée Objet en JavaScript.
Utilisation des API JCDecaux, LeafletJS, Web Storage, et Canvas.
Interdiction des plugins pour le diaporama et Canvas.
Utilisation de jQuery pour manipuler le DOM et Bootstrap pour le style.



Résultats principaux :

Interface utilisateur fluide avec un diaporama explicatif et une carte interactive.
Affichage en temps réel des stations de vélos via l'API JCDecaux.
Système de réservation fonctionnel avec signature via Canvas et gestion des données locales.
Application hébergée sur GitHub Pages, accessible sans publicité.


