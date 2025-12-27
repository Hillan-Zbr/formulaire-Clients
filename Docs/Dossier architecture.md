Dossier d'Architecture Logicielle : Application "Formulaire Clients"


--------------------------------------------------------------------------------


1. Introduction

Ce Dossier d'Architecture Logicielle (DAL) constitue le référentiel technique unique pour la conception, le développement et la maintenance évolutive de l'application "Formulaire Clients". Il formalise les choix technologiques, les flux de données et les décisions structurelles qui constituent le socle du système.

L'objectif métier de l'application est de fournir une solution web moderne permettant aux clients de soumettre un dossier administratif complet, incluant des informations personnelles et des pièces justificatives, de manière entièrement dématérialisée, fluide et sécurisée. Ce document formalise l'architecture du Prototype Fonctionnel (Proof of Concept - PoC) finalisé en date du 27 Décembre 2025.

La section suivante présente une vue d'ensemble de l'architecture, décrivant les macro-composants et leurs interactions fondamentales.

2. Vue d'Ensemble de l'Architecture

Comprendre l'architecture à un haut niveau est essentiel pour appréhender les interactions fondamentales entre les macro-composants du système avant de s'immerger dans les détails techniques. Cette vue d'ensemble clarifie la répartition des responsabilités et les flux principaux.

L'application repose sur une Architecture Full Stack MERN (MongoDB, Express, React, Node.js) + Cloud Storage. Elle est conçue comme un système distribué dont les composants sont hébergés sur des services cloud spécialisés.

Les quatre piliers de cette architecture sont :

* Frontend (Interface Utilisateur) : Une application React hébergée sur Vercel, responsable de l'expérience utilisateur, de la saisie des données et des interactions.
* Backend (API REST) : Une API Node.js/Express hébergée sur Render, qui orchestre la logique métier, la validation côté serveur et la communication avec les services de persistance.
* Base de Données (Persistance des métadonnées) : Une instance MongoDB Atlas, qui stocke les données textuelles structurées du formulaire (informations personnelles, etc.).
* Stockage de Fichiers (Persistance des fichiers) : Le service Cloudinary, dédié au stockage et à la gestion des fichiers lourds (PDF, images) soumis par les utilisateurs.

Cette architecture distribuée, s'appuyant sur des plateformes PaaS (Platform as a Service) et SaaS (Software as a Service), favorise une séparation nette des préoccupations et une excellente scalabilité. Chaque service peut être mis à l'échelle indépendamment : le Frontend sur Vercel peut absorber un pic de trafic utilisateur via le CDN global sans impacter la charge du Backend, tandis que l'API sur Render peut être scalée horizontalement pour traiter un volume élevé de soumissions, découplant ainsi la performance de la présentation de celle de la logique métier.

La section suivante décompose en détail la pile technique de chaque composant.

3. Architecture Détaillée par Composant

La maîtrise de la stack technique de chaque composant est fondamentale pour le développement, le débogage et l'évolution future de l'application. Cette section détaille les technologies et services utilisés pour chaque pilier de l'architecture.

3.1. Composant Frontend (Interface Utilisateur)

Le Frontend est une Single-Page Application (SPA) dont la responsabilité principale est d'offrir une interface utilisateur réactive, moderne et intuitive pour la saisie et la soumission du dossier client.

Technologie/Service	Rôle et Justification dans le Projet
React (v18)	Bibliothèque JavaScript fondamentale pour la construction de l'interface utilisateur en composants réutilisables.
Vite	Outil de build nouvelle génération qui assure un développement local ultra-rapide et optimise la compilation pour la production.
TypeScript	Ajoute un typage statique au JavaScript, ce qui renforce la robustesse du code, améliore l'autocomplétion et prévient les erreurs de type en amont (ex: l'interface UserFormData).
Tailwind CSS	Framework CSS "utility-first" qui permet de construire rapidement des designs complexes et responsives directement dans le balisage HTML.
Framer Motion	Librairie d'animation dédiée à React, utilisée pour créer des transitions fluides entre les étapes du formulaire et animer la barre de progression, améliorant ainsi l'expérience utilisateur.
Lucide React	Fournit un ensemble d'icônes SVG légères et modernes pour enrichir visuellement l'interface.

3.2. Composant Backend (API REST)

Le Backend constitue le cerveau de l'application. Il expose une API REST qui gère la logique métier, valide les données reçues, orchestre les interactions avec les services externes (base de données, stockage de fichiers) et assure la sécurité des opérations.

Technologie/Service	Rôle et Justification dans le Projet
Node.js & Express	Environnement d'exécution JavaScript côté serveur et framework minimaliste pour la création rapide et efficace de l'API REST.
Multer	Middleware essentiel pour la gestion des uploads de fichiers au format Multipart/form-data. Il prend en charge l'analyse des requêtes contenant des fichiers.
Mongoose	ODM (Object Data Modeling) qui facilite les interactions avec la base de données MongoDB en fournissant des schémas de données, des validations et une abstraction élégante.
Cors	Middleware de sécurité qui gère les requêtes "Cross-Origin Resource Sharing", autorisant de manière contrôlée le Frontend hébergé sur Vercel à communiquer avec l'API hébergée sur Render.

3.3. Composant Infrastructure et Persistance

L'infrastructure constitue la fondation sur laquelle repose l'application. Elle est entièrement basée sur des services cloud managés qui gèrent l'hébergement, l'exécution du code et le stockage durable et sécurisé des données.

Technologie/Service	Rôle et Justification dans le Projet
Vercel	Plateforme PaaS spécialisée dans l'hébergement de projets Frontend. Elle offre un déploiement continu (CI/CD) automatisé, une haute disponibilité et un réseau de distribution de contenu (CDN) global.
Render	Plateforme PaaS polyvalente pour l'hébergement du Backend Node.js. Elle simplifie le déploiement, la gestion des variables d'environnement et la mise à l'échelle de l'API.
MongoDB Atlas	Service de base de données NoSQL entièrement managé (DBaaS). Il assure la persistance, la sécurité et la scalabilité des métadonnées textuelles des dossiers clients.
Cloudinary	Service SaaS spécialisé dans le stockage et la manipulation de médias. Il est utilisé pour stocker de manière sécurisée et durable les pièces justificatives (PDF, images) soumises par les clients.

Cette architecture découplée est maintenant prête à être analysée sous l'angle du flux de données lors d'une soumission de dossier.

4. Flux de Données : Soumission d'un Dossier Client

La maîtrise du flux de données de bout en bout est cruciale pour comprendre le fonctionnement de l'application. Cette section décompose le parcours complet d'une soumission de dossier, depuis l'interaction de l'utilisateur sur l'interface jusqu'à la persistance finale des données et des fichiers sur les services cloud.

Le processus se déroule en cinq étapes séquentielles :

1. Étape 1 : Saisie et Validation Côté Client
  * Composant(s) impliqué(s) : React (Frontend)
  * Description : L'utilisateur remplit les champs du formulaire dans l'interface React. Des validations en temps réel (ex: format de l'email, champs obligatoires) sont effectuées pour guider l'utilisateur et prévenir les erreurs de saisie avant même la soumission.
2. Étape 2 : Envoi des Données au Serveur
  * Composant(s) impliqué(s) : React (Frontend), Express (Backend)
  * Description : Une fois le formulaire validé, le client React construit un objet FormData. Cet objet encapsule les données textuelles et les fichiers binaires, puis est envoyé via une requête HTTP POST avec un Content-Type de multipart/form-data à l'endpoint dédié de l'API Express.
3. Étape 3 : Stockage Externe des Fichiers
  * Composant(s) impliqué(s) : Express (Backend), Cloudinary
  * Description : Le middleware Multer sur le serveur Express parse le corps de la requête multipart/form-data, extrayant les fichiers et les stockant temporairement en mémoire ou sur disque. Le backend relaie ensuite ces fichiers vers l'API de Cloudinary. En retour, Cloudinary stocke les fichiers de manière sécurisée et renvoie pour chacun une URL de ressource unique et stable (ex: https://res.cloudinary...).
4. Étape 4 : Persistance des Métadonnées en Base de Données
  * Composant(s) impliqué(s) : Express (Backend), MongoDB Atlas
  * Description : Le serveur Express collecte les données textuelles du formulaire ainsi que les URLs des fichiers obtenues de Cloudinary. Il constitue un document BSON, conforme au schéma Mongoose défini, qu'il enregistre dans la collection appropriée de la base de données MongoDB Atlas.
5. Étape 5 : Confirmation au Client
  * Composant(s) impliqué(s) : Express (Backend), React (Frontend)
  * Description : Après avoir successfully enregistré le document dans MongoDB, le serveur renvoie une réponse de succès au Frontend (généralement un statut 201 Created). L'application React reçoit cette confirmation et affiche un message de validation à l'utilisateur, finalisant le processus.

Ce modèle de flux est une pratique d'architecture robuste. La dissociation entre les métadonnées textuelles (légères, structurées, stockées dans MongoDB) et les fichiers binaires (lourds, non structurés, gérés par un service spécialisé comme Cloudinary) est une stratégie performante et scalable.

5. Gestion des Configurations et des Secrets

Dans une application distribuée communiquant avec de multiples services cloud, la gestion sécurisée des configurations et des secrets (clés d'API, chaînes de connexion) est un impératif de sécurité. Les variables d'environnement sont utilisées pour stocker ces informations sensibles en dehors du code source, permettant une configuration flexible et sécurisée selon l'environnement de déploiement (développement, production).

5.1. Variables d'Environnement Backend (Hébergées sur Render)

Ces variables sont configurées dans l'interface de gestion de l'environnement Render et injectées au moment de l'exécution de l'API.

Variable	Description Technique	Niveau de Criticité
MONGODB_URI	Chaîne de connexion complète à la base de données MongoDB Atlas, incluant les identifiants d'authentification.	Élevé
CLOUDINARY_CLOUD_NAME	Identifiant unique du "cloud" (compte) sur la plateforme Cloudinary.	Moyen
CLOUDINARY_API_KEY	Clé publique de l'API Cloudinary, utilisée pour identifier l'application lors des requêtes.	Moyen
CLOUDINARY_API_SECRET	Clé secrète de l'API Cloudinary, utilisée pour signer et authentifier les requêtes sécurisées. Cette clé ne doit jamais être exposée publiquement.	Élevé
PORT	Port d'écoute du serveur Express. Sur Render, cette valeur est généralement gérée et assignée automatiquement par la plateforme.	Faible

5.2. Variable d'Environnement Frontend (Hébergée sur Vercel)

Cette variable est configurée dans les paramètres du projet Vercel et est accessible par le code frontend durant le processus de build.

Variable	Description Technique	Niveau de Criticité
VITE_API_URL	URL complète du backend déployé sur Render (ex: https://api-formulaire.onrender.com).	Faible

Le rôle de VITE_API_URL est stratégique : il permet au code du Frontend de connaître l'adresse de l'API à contacter sans la coder en dur. Vite remplace toute occurrence de import.meta.env.VITE_API_URL dans le code source par sa valeur littérale au moment de la compilation, l'intégrant ainsi de manière statique dans les fichiers JavaScript finaux.

6. Décisions d'Architecture et Justifications

Cette section fonctionne comme un journal de décisions d'architecture (Architectural Decision Record - ADR). Elle ne documente pas des erreurs, mais plutôt les choix techniques rationnels effectués en réponse à des contraintes et des défis concrets rencontrés durant le développement du PoC.

6.1. Gestion du Stockage de Fichiers sur un Système Éphémère

* Problème : Échec de l'upload de fichiers sur l'environnement de production Render avec une erreur de type read-only file system (système de fichiers en lecture seule).
* Analyse de la Cause : Les environnements d'exécution des plateformes PaaS comme Render sont éphémères et sans état. Le système de fichiers principal n'est pas conçu pour être persistant en écriture, à l'exception de répertoires spécifiques prévus à cet effet. La tentative d'écrire dans un dossier uploads/ à la racine du projet échouait donc systématiquement.
* Décision et Justification : La décision a été de configurer le middleware Multer pour utiliser le répertoire système /tmp/ comme destination de stockage temporaire. Cette solution est robuste car ce répertoire est conçu pour être accessible en écriture dans la grande majorité des environnements de conteneurs Linux. Elle respecte le principe d'une application "stateless" en ne dépendant pas d'un système de fichiers local persistant.

6.2. Configuration de l'Accès Réseau à la Base de Données

* Problème : Le backend déployé sur Render ne parvenait pas à se connecter à la base de données MongoDB Atlas, résultant en des erreurs de type "Timeout" (erreurs 400 ou 500).
* Analyse de la Cause : Par défaut, MongoDB Atlas applique une politique de sécurité réseau restrictive qui bloque toutes les connexions entrantes, sauf celles provenant d'adresses IP explicitement autorisées. Les adresses IP des serveurs de Render, étant dynamiques, n'étaient pas dans la liste blanche.
* Décision et Justification : La décision a été d'autoriser l'accès depuis n'importe quelle adresse IP via la règle 0.0.0.0/0. Cette configuration est acceptable pour un PoC mais expose la base de données à l'internet public. En production, une solution de type VPC Peering entre Render et MongoDB Atlas serait impérative pour isoler le trafic de la base de données au sein d'un réseau privé, appliquant ainsi le principe de défense en profondeur.

6.3. Fiabilisation du Build du Design System

* Problème : Les styles CSS personnalisés (nouvelles couleurs) définis dans tailwind.config.js ne s'appliquaient pas correctement après le déploiement sur Vercel.
* Analyse de la Cause : Le problème provenait du pipeline de build de Tailwind CSS. Le processus de "purging" (qui élimine les classes CSS non utilisées) ne détectait pas correctement l'usage des classes personnalisées, ou la configuration n'était pas correctement chargée.
* Décision et Justification : La décision a été de privilégier la fiabilité du pipeline de build et la vélocité du développement en utilisant les classes natives de Tailwind. Ce choix constitue un arbitrage pragmatique pour un PoC, sacrifiant une personnalisation avancée du design system au profit d'une stabilité et d'une prévisibilité absolues entre les environnements de développement et de production.

6.4. Résolution de Conflit de Nommage TypeScript

* Problème : Le processus de build du frontend échouait avec une erreur de compilation TypeScript : Import 'FormData' conflicts with global value.
* Analyse de la Cause : Le nom de l'interface TypeScript personnalisée (FormData) entrait en conflit avec l'objet global FormData, une API native du navigateur essentielle pour l'envoi de fichiers.
* Décision et Justification : La solution a été de renommer l'interface en UserFormData. Cette décision simple résout le conflit et constitue une pratique de codage essentielle pour maintenir l'intégrité du code et la clarté des interfaces de données, prévenant ainsi une classe entière d'erreurs d'exécution.

7. Limites Actuelles et Pistes d'Évolution

L'architecture actuelle constitue une base solide et fonctionnelle pour un Proof of Concept. Cependant, pour une transition vers un environnement de production complet, plusieurs axes d'amélioration doivent être considérés.

Les prochaines étapes d'évolution possibles incluent :

* Ajouter une authentification Admin : Pour permettre la consultation des dossiers, la création d'une interface d'administration sécurisée est nécessaire. Architecturalement, cela impliquerait l'ajout de routes protégées sur l'API (via des middlewares), la gestion de jetons d'authentification (JWT), et la création d'une collection users. Ceci impacterait également le Frontend, qui devrait intégrer une logique de gestion d'état pour le token (ex: via React Context ou Zustand), ainsi que des mécanismes de routage protégé.
* Envoyer un email de confirmation : Pour améliorer l'expérience client, l'envoi d'un email automatique après soumission est une fonctionnalité clé. Cela nécessiterait l'intégration d'un service tiers (ex: Resend) et l'ajout d'une étape dans le flux backend. Pour garantir la résilience et ne pas impacter le temps de réponse de l'API, l'envoi de l'email devrait être géré de manière asynchrone, potentiellement via une simple fonction non-bloquante ou, dans une architecture plus mature, via une file d'attente de messages (message queue).
* Ajouter des tests unitaires : Pour garantir la non-régression du code, la mise en place d'une stratégie de tests est indispensable. Cela exigerait l'intégration d'un framework (ex: Vitest) dans les projets frontend et backend, et l'intégration de ces tests dans un pipeline de CI/CD pour automatiser la validation avant chaque mise en production.

Ce dossier d'architecture est un document vivant. Il est destiné à évoluer en parallèle du projet, en documentant les nouvelles décisions et en s'adaptant aux futurs besoins de l'application "Formulaire Clients".
