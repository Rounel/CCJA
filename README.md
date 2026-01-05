# Application de Gestion de Communauté

Application mobile React Native pour la gestion de communauté d'une association.

## Fonctionnalités implémentées

### Page d'Accueil (Home)
Tableau de bord complet du membre avec :
- **Message d'accueil personnalisé** avec nom et photo de profil
- **Badge de membre** affichant l'année d'adhésion et le rôle
- **Carte principale** : Heures de bénévolat avec barre de progression
- **KPIs personnels** :
  - Taux de présence aux activités (%)
  - Temps de parole moyen (minutes)
  - Nombre d'événements participés
  - Statut du membre (Active/Inactive)
- **Calendrier mensuel** avec indicateurs sur les dates d'événements
- **Prochaines activités** : Liste des événements à venir avec :
  - Date, heure et lieu
  - Type d'événement (Meeting, Workshop, Conference, etc.)
  - Participants inscrits
  - Bouton Check-in
- **Annonces** : Liste des communications importantes de l'association avec niveaux de priorité

### Navigation
L'application dispose d'une **bottom navigation** avec 5 sections :
- 🏠 **Home** : Tableau de bord principal
- 📅 **Events** : Gestion des événements (à venir)
- 👥 **People** : Annuaire des membres (à venir)
- 👤 **Profile** : Profil personnel (à venir)
- ⚙️ **Admin** : Panneau d'administration (à venir)

### Autres Pages (placeholders)

### Onboarding (3 étapes)
Écran d'accueil présentant l'association en 3 slides interactives :
- **Nos Activités** : Présentation des événements, ateliers, conférences et networking
- **Nos Valeurs** : Entraide, excellence, innovation et intégrité
- **Vos Avantages** : Opportunités professionnelles, mentorat, ressources exclusives

L'onboarding s'affiche uniquement au premier lancement de l'application. Il peut être passé à tout moment via le bouton "Passer".

### Écran de Login
L'utilisateur peut se connecter de 4 façons différentes :
- **Email + Mot de passe** : Connexion classique avec email et mot de passe
- **Téléphone + OTP** : Connexion via numéro de téléphone avec code OTP envoyé sur WhatsApp
- **Google OAuth** : Connexion via compte Google
- **LinkedIn OAuth** : Connexion via compte LinkedIn

### Écran d'Inscription (Sign-Up)
L'utilisateur peut s'inscrire de 3 façons :
- **Google OAuth** : Inscription rapide via Google
- **LinkedIn OAuth** : Inscription rapide via LinkedIn
- **Formulaire complet** avec les champs suivants :
  - Nom et Prénoms (requis)
  - Photo de profil (optionnel)
  - Numéro de téléphone (requis)
  - Âge (requis, minimum 18 ans)
  - Situation professionnelle (optionnel)
  - Domaines de compétence (optionnel, avec possibilité d'ajouter plusieurs compétences)
  - Email et mot de passe (optionnel)

## Structure du projet

```
CCJA/
├── src/
│   ├── screens/
│   │   ├── OnboardingScreen.tsx  # Écran d'onboarding (3 slides)
│   │   ├── LoginScreen.tsx       # Écran de connexion
│   │   ├── SignUpScreen.tsx      # Écran d'inscription
│   │   ├── HomeScreen.tsx        # Page d'accueil avec dashboard
│   │   ├── EventsScreen.tsx      # Page des événements (placeholder)
│   │   ├── PeopleScreen.tsx      # Page des membres (placeholder)
│   │   ├── ProfileScreen.tsx     # Page de profil (placeholder)
│   │   └── AdminScreen.tsx       # Page admin (placeholder)
│   ├── components/
│   │   └── BottomNavigation.tsx  # Barre de navigation inférieure
│   ├── navigation/
│   │   ├── SimpleNavigator.tsx   # Navigation simple basée sur Context
│   │   └── MainApp.tsx           # Application principale avec navigation
│   ├── services/
│   │   └── authService.ts        # Service d'authentification
│   ├── utils/
│   │   └── onboarding.ts         # Utilitaires pour gérer l'onboarding
│   └── types/
│       ├── auth.types.ts         # Types TypeScript pour l'authentification
│       └── home.types.ts         # Types TypeScript pour la page d'accueil
├── App.tsx                       # Point d'entrée de l'application
└── package.json
```

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer l'application :
```bash
npm start
```

## Test de l'application

Pour accéder à la page d'accueil :
1. Au premier lancement, vous verrez l'onboarding (3 slides)
2. Cliquez sur "Commencer" ou "Passer"
3. Vous arriverez sur l'écran de Login
4. Entrez n'importe quel email et mot de passe (la validation n'est pas encore implémentée)
5. Cliquez sur "Se connecter"
6. Vous accéderez à la page d'accueil avec la bottom navigation

**Note** : Pour l'instant, seule la page Home est complètement implémentée. Les autres pages (Events, People, Profile, Admin) affichent des écrans placeholder.

## Réinitialiser l'onboarding (Développement)

Pour tester l'onboarding après l'avoir déjà vu, vous pouvez le réinitialiser :

1. **Via le code** : Importez et appelez la fonction `resetOnboarding`
```typescript
import { resetOnboarding } from './src/utils/onboarding';

// Dans votre composant ou au démarrage
await resetOnboarding();
```

2. **Via Expo Dev Tools** :
   - Ouvrez le menu développeur (secouer l'appareil ou Cmd+D/Ctrl+D)
   - Sélectionnez "Clear AsyncStorage"
   - Rechargez l'application

## Dépendances principales

- **expo** : Framework pour React Native
- **@react-native-async-storage/async-storage** : Stockage local persistant
- **expo-image-picker** : Sélection de photos
- **expo-auth-session** : Authentification OAuth
- **expo-web-browser** : Navigateur web pour OAuth

## Prochaines étapes à implémenter

### 1. Backend / API
- [ ] Créer une API REST ou GraphQL pour gérer l'authentification
- [ ] Implémenter l'inscription et la connexion par email/password
- [ ] Configurer l'envoi d'OTP via WhatsApp Business API
- [ ] Configurer les OAuth providers (Google, LinkedIn)

### 2. Configuration OAuth
Dans `src/services/authService.ts`, remplacer les placeholders :
```typescript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const LINKEDIN_CLIENT_ID = 'YOUR_LINKEDIN_CLIENT_ID';
```

Pour obtenir les Client IDs :
- **Google** : [Google Cloud Console](https://console.cloud.google.com/)
- **LinkedIn** : [LinkedIn Developers](https://www.linkedin.com/developers/)

### 3. Configuration app.json
Ajouter les schemes pour OAuth dans `app.json` :
```json
{
  "expo": {
    "scheme": "associationapp",
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

### 4. Upload de photos
- [ ] Configurer un service de stockage (AWS S3, Cloudinary, Firebase Storage)
- [ ] Implémenter l'upload dans `authService.uploadProfilePhoto()`

### 5. Gestion d'état
- [ ] Ajouter un système de gestion d'état (Context API ou Redux)
- [ ] Stocker les tokens d'authentification de manière sécurisée (AsyncStorage ou SecureStore)
- [ ] Implémenter la persistance de session

### 6. Validation et sécurité
- [ ] Ajouter une validation de formulaire robuste
- [ ] Implémenter la gestion des erreurs
- [ ] Ajouter des indicateurs de chargement
- [ ] Sécuriser les appels API

### 7. Design et UX
- [ ] Ajouter des animations de transition
- [ ] Améliorer l'accessibilité
- [ ] Ajouter un thème cohérent avec les couleurs de l'association
- [ ] Tester sur différentes tailles d'écran

## Notes importantes

### WhatsApp OTP
Pour envoyer des OTP via WhatsApp, vous aurez besoin de :
- Un compte WhatsApp Business API
- Un fournisseur comme Twilio, MessageBird, ou directement via Meta

### Sécurité
- Ne jamais stocker les mots de passe en clair
- Utiliser HTTPS pour toutes les communications API
- Implémenter une limite de tentatives de connexion
- Valider tous les inputs côté serveur

## Support

Pour toute question ou problème, contactez l'équipe de développement.
