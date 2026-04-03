# 🗣️ Orthophonie - Plateforme d'Entraînement Oral

Une plateforme d'entraînement interactive conçue pour améliorer les compétences en expression orale, prononciation et langage. Parfait pour les professionnels de l'orthophonie et les apprenants.

## ✨ Fonctionnalités

### 📝 Mémorisation
- Entraînement à la mémorisation avec une liste de mots
- Protection anti-copier/coller pour forcer la mémorisation réelle
- Interface épurée et sans distractions

### 🎯 Exercices Variés
- **16 types d'exercices différents** incluant:
  - Correction orthographique
  - Lecture phonétique
  - Transformation de style (direct/indirect)
  - Logatomes
  - Décodage rapide
  - Et bien d'autres...

### ✅ Vérification
- Restitution des mots mémorisés
- Vérification automatique avec normalisation (minuscules, accents)
- Feedback immédiat

### 🎮 Expérience Utilisateur
- **Interface moderne** avec DaisyUI et Tailwind CSS
- **Mode clair/sombre** global
- **Timer en temps réel** pour suivre la durée de l'entraînement
- **Barre de progression** pour visualiser l'avancement
- **Bouton de signalement de bug** intégré (remontée Discord)
- **Design responsive** mobile-first

### 🐛 Système de Rapport de Bug
- Bouton discret en haut à droite de chaque exercice
- Modal avec contexte automatique (numéro de question, type, progression)
- Envoi direct à Discord via webhook
- Timestamps automatiques

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd orthophonie

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Ajouter votre webhook Discord
# VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### Développement

```bash
# Démarrer le serveur de développement
npm run dev

# L'application est accessible à http://localhost:5173
```

### Build

```bash
# Créer une build de production
npm run build

# Prévisualiser la build
npm run preview
```

## 📋 Structure du Projet

```
orthophonie/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Header.jsx       # Navigation et sélecteur de thème
│   │       ├── Footer.jsx       # Pied de page
│   │       └── Timer.jsx        # Chronomètre intégré
│   ├── pages/
│   │   ├── Home.jsx            # Page d'accueil
│   │   ├── Presentation.jsx    # Exercices de présentation
│   │   └── Exercise.jsx        # Plateforme d'exercices
│   ├── utils/
│   │   ├── Exercices.js        # Base de données des exercices
│   │   ├── Questions.js        # Questions de présentation
│   │   └── Date.js             # Utilitaires de formatage
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── guides/                 # Documentation PDF
├── .env                        # Variables d'environnement
└── README.md
```

## 🎯 Types d'Exercices

1. **Correction orthographique** - Corriger les fautes dans des textes
2. **Lecture phonétique** - Lire des phrases écrites phonétiquement
3. **Style direct ↔ indirect** - Transformer entre les deux styles
4. **Logatomes** - Lire des mots sans sens
5. **Lecture rapide** - Lire rapidement avec précision
6. **Alphabétique** - Trier les lettres
7. **Acronymes** - Former des mots avec initiales
8. **Substitution alphabétique** - Remplacer les lettres
9. **Remplacement de lettres** - Changer la première lettre
10. **Mémorisation de chiffres** - Retenir des séquences numériques
11. **Répétition** - Reproduire à l'identique
12. **Description d'images** - Décrire des images avec impressions

## ⚙️ Configuration

### Variables d'Environnement

```env
# Webhook Discord pour les rapports de bug
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx/xxxxx
```

### Thème

Le projet utilise DaisyUI avec support complet du mode sombre. Les utilisateurs peuvent basculer entre les thèmes via le header.

## 🛠️ Technologies Utilisées

- **Framework**: React 19
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Icônes**: lucide-react
- **Routing**: React Router v7
- **HTTP**: Fetch API native

## 📱 Responsive Design

L'application est entièrement responsive:
- **Mobile**: Menu hamburger, layout vertical
- **Tablet**: Menu adapté, grille 2 colonnes
- **Desktop**: Expérience complète

## 🐛 Signalement de Bugs

Les utilisateurs peuvent signaler des bugs directement depuis l'application:
1. Cliquer le bouton 🐛 en haut à droite
2. Décrire le problème
3. Le rapport est envoyé automatiquement à Discord avec contexte

## 🔐 Sécurité

- Protection anti-copier/coller sur les questions de mémorisation
- Validation côté client des entrées
- Normalisation automatique des réponses (minuscules, accents)

## 📚 Guides et Ressources

Des guides PDF sont disponibles dans `/public/guides/` incluant:
- Conseils de préparation aux examens oraux
- Stratégies d'entraînement
- Webinaires sur les épreuves

## 🤝 Contribution

Les améliorations et suggestions sont les bienvenues! N'hésitez pas à:
- Signaler des bugs via le système intégré
- Proposer de nouveaux types d'exercices
- Améliorer l'interface utilisateur

## 📄 Licence

Ce projet est destiné à l'usage personnel et professionnel en orthophonie.

## 👤 Auteur

Créé avec ❤️ pour améliorer l'entraînement en orthophonie.

---

**Dernière mise à jour**: Mars 2026
