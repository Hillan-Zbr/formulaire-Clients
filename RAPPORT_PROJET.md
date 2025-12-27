# Rapport de Projet : Application "Formulaire Clients" Full Stack
**Date :** 27 Décembre 2025
**Type :** Prototype Fonctionnel (Proof of Concept - PoC)
**Architecture :** Full Stack MERN (MongoDB, Express, React, Node.js) + Cloud Storage

## 1. Objectif du Projet
Créer une application web moderne permettant aux clients de soumettre un dossier administratif (Informations personnelles + Pièces justificatives) de manière fluide, sécurisée et totalement dématérialisée.

## 2. Stack Technique (Les Outils)

### Frontend (L'interface visible)
*   **React (v18)** : Bibliothèque principale pour construire l'interface utilisateur.
*   **Vite** : Outil de build ultra-rapide (remplace Create-React-App).
*   **TypeScript** : Ajoute un typage strict au JavaScript pour éviter les bugs (ex: `UserFormData`).
*   **Tailwind CSS** : Framework CSS pour le style (Design System, Responsive).
*   **Framer Motion** : Librairie pour les animations fluides (transitions entre étapes, barre de progression).
*   **Lucide React** : Pack d'icônes modernes (SVG).

### Backend (Le cerveau)
*   **Node.js & Express** : Serveur API REST.
*   **Multer** : Middleware pour gérer l'upload de fichiers (Multipart/form-data).
*   **Mongoose** : ODM (Object Data Modeling) pour interagir avec la base de données MongoDB.
*   **Cors** : Gestion de la sécurité des requêtes entre domaines (Frontend Vercel <-> Backend Render).

### Infrastructure & Cloud (Hébergement)
*   **Vercel** : Hébergement du Frontend (React).
*   **Render** : Hébergement du Backend (Node.js API).
*   **MongoDB Atlas** : Base de données NoSQL hébergée dans le cloud.
*   **Cloudinary** : Stockage et gestion des fichiers médias (PDF, Images).

## 3. Architecture du Code

### Structure des Dossiers
```
/ (Racine)
├── src/ (Frontend)
│   ├── components/
│   │   ├── form/ (Stepper, PersonalInfo, DocumentUpload, Summary)
│   │   ├── admin/ (Dashboard Admin)
│   │   ├── ui/ (Composants réutilisables : Button, Input, Card)
│   │   └── layout/ (Mise en page globale)
│   ├── lib/ (Utilitaires)
│   ├── types.ts (Définitions TypeScript partagées)
│   └── App.tsx (Chef d'orchestre Frontend)
├── server/ (Backend)
│   ├── models/ (Schémas de données Mongoose)
│   └── index.js (Point d'entrée serveur Express)
└── README.md
```

### Flux de Données (Data Flow)
1.  **Saisie :** L'utilisateur remplit le formulaire React (Validation temps réel).
2.  **Upload :** Les fichiers sont envoyés via `FormData` au serveur Express.
3.  **Stockage Fichiers :** Le serveur envoie les fichiers à **Cloudinary** et récupère une URL publique sécurisée (`https://res.cloudinary...`).
4.  **Stockage Données :** Le serveur enregistre les infos texte + les URLs Cloudinary dans **MongoDB**.
5.  **Confirmation :** Le serveur renvoie un succès (201 Created) au Frontend, qui affiche le message de validation.

## 4. Variables d'Environnement (Secrets)
Ces variables sont critiques pour la sécurité et la connexion entre les services.

**Côté Backend (Render / `.env`) :**
*   `MONGODB_URI` : Lien de connexion à la base de données (avec login/mot de passe).
*   `CLOUDINARY_CLOUD_NAME` : Identifiant du compte Cloudinary.
*   `CLOUDINARY_API_KEY` : Clé publique API.
*   `CLOUDINARY_API_SECRET` : Clé secrète API (Ne jamais partager !).
*   `PORT` : Port d'écoute du serveur (automatique sur Render).

**Côté Frontend (Vercel) :**
*   `VITE_API_URL` : L'adresse URL du Backend déployé sur Render (ex: `https://api-formulaire.onrender.com`).

## 5. Défis Techniques & Résolutions (Le "Bêtisier" du Dev)

Durant le développement, nous avons surmonté plusieurs obstacles intéressants :

1.  **Le crash "Multer" sur Render :**
    *   *Problème :* L'upload échouait avec une erreur "read-only file system" ou dossier introuvable.
    *   *Cause :* Render est un système éphémère qui n'a pas de dossier `uploads/` persistant.
    *   *Solution :* Configuration de Multer pour utiliser le dossier système `/tmp/` qui est toujours disponible en écriture.

2.  **L'erreur MongoDB Timeout (Error 400/500) :**
    *   *Problème :* Le Backend n'arrivait pas à se connecter à la base de données une fois en ligne.
    *   *Cause :* La sécurité "Network Access" de MongoDB Atlas bloquait l'IP des serveurs Render.
    *   *Solution :* Autorisation de l'IP universelle `0.0.0.0/0` (Allow Access from Anywhere) dans Atlas.

3.  **Le design "fantôme" (Tailwind) :**
    *   *Problème :* Les nouvelles couleurs ne s'affichaient pas après déploiement.
    *   *Cause :* La configuration personnalisée `tailwind.config.js` n'était pas correctement chargée ou compilée par le pipeline de build.
    *   *Solution :* Utilisation des classes de couleurs natives de Tailwind (`bg-blue-600`) au lieu des classes custom (`bg-brand-600`) pour garantir le rendu immédiat.

4.  **Conflit de type TypeScript :**
    *   *Problème :* Erreur de build `Import 'FormData' conflicts with global value`.
    *   *Cause :* Nous avions nommé notre interface `FormData`, ce qui entrait en conflit avec l'objet natif du navigateur servant à envoyer des fichiers.
    *   *Solution :* Renommage de l'interface en `UserFormData`.

## 6. Prochaines Étapes Possibles
*   Ajouter une authentification (Login/Mot de passe) pour l'interface Admin.
*   Envoyer un email de confirmation automatique au client (via Nodemailer ou Resend).
*   Ajouter des tests unitaires (Jest/Vitest) pour sécuriser le code avant chaque déploiement.

