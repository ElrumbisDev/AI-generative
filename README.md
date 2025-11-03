# Chapter AI ✨

Une application web moderne qui transforme vos plus beaux souvenirs de mariage ou de naissance en vidéos magiques grâce à l'intelligence artificielle.

![Chapter AI](https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=Chapter+AI)

## 🌟 Fonctionnalités

- 📸 **Upload intelligent** : Jusqu'à 10 photos avec preview en temps réel
- 🎭 **Événements spécialisés** : Mariages et naissances avec styles adaptés
- 🎨 **Styles variés** : Romantique, Joyeux, Élégant, Ludique
- 🤖 **IA de pointe** : Intégration avec RunwayML, Luma Dream Machine, Synthesia
- 📱 **Responsive design** : Optimisé pour mobile et desktop
- ✨ **Animations fluides** : Interface moderne avec Framer Motion
- 🎥 **Export HD** : Vidéos en qualité 1080p format MP4

## 🚀 Démarrage rapide

### Installation

```bash
# Cloner le repository
git clone https://github.com/ElrumbisDev/AI-generative.git
cd ai-generative

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
```

### Configuration des APIs

Éditez le fichier `.env.local` et ajoutez vos clés API :

```env
# Choisissez votre fournisseur principal
VIDEO_AI_PROVIDER=runway

# RunwayML (Recommandé)
RUNWAY_API_KEY=your_runway_api_key_here

# Luma Dream Machine
LUMA_API_KEY=your_luma_api_key_here

# Synthesia
SYNTHESIA_API_KEY=your_synthesia_api_key_here
```

### Lancement

```bash
# Développement
npm run dev

# Production
npm run build
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎯 APIs supportées

### RunwayML (Recommandé)
- **Avantages** : Excellente qualité, transitions fluides
- **Inscription** : [runway.com](https://runway.com)
- **Tarif** : Crédits par génération

### Luma Dream Machine
- **Avantages** : Bon rapport qualité/prix
- **Inscription** : [lumalabs.ai](https://lumalabs.ai)
- **Tarif** : Abonnement mensuel

### Synthesia
- **Avantages** : Spécialisé dans les avatars parlants
- **Inscription** : [synthesia.io](https://synthesia.io)
- **Tarif** : Abonnement professionnel

## 📱 Utilisation

1. **📸 Upload photos** : Glissez-déposez jusqu'à 10 photos de votre événement
2. **🎨 Personnalisation** : Choisissez le type d'événement (mariage/naissance) et le style
3. **✍️ Message** : Ajoutez votre message personnel qui apparaîtra dans la vidéo
4. **🎬 Génération** : L'IA crée votre vidéo personnalisée
5. **📥 Téléchargement** : Récupérez votre vidéo en HD

## 🛠️ Technologies

- **Framework** : Next.js 16 avec App Router
- **Styling** : Tailwind CSS 4
- **Animations** : Framer Motion
- **Upload** : React Dropzone
- **Icons** : Lucide React
- **Deployment** : Vercel Ready

## 🚀 Déploiement sur Vercel

### Déploiement automatique

1. **Connectez votre repository** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub

2. **Configuration des variables d'environnement** :
   ```
   VIDEO_AI_PROVIDER=runway
   RUNWAY_API_KEY=your_key_here
   LUMA_API_KEY=your_key_here
   SYNTHESIA_API_KEY=your_key_here
   ```

3. **Déploiement** : Vercel détecte automatiquement Next.js et déploie

### Déploiement manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

## 🎨 Personnalisation

### Ajouter un nouveau style

```typescript
// src/components/EventForm.tsx
const styles = [
  // ... styles existants
  {
    id: 'mystique',
    label: 'Mystique',
    description: 'Ambiance mystérieuse et envoûtante',
    emoji: '🌙'
  }
];
```

### Ajouter un nouveau fournisseur d'IA

```typescript
// src/app/api/generate-video/route.ts
const API_PROVIDERS = {
  // ... fournisseurs existants
  nouveau_fournisseur: {
    name: 'Nouveau Fournisseur',
    endpoint: 'https://api.nouveau-fournisseur.com/v1/generate',
    headers: {
      'Authorization': `Bearer ${process.env.NOUVEAU_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
};
```

## 🐛 Troubleshooting

### Problèmes courants

**Upload des photos ne fonctionne pas**
```bash
# Vérifiez les types MIME supportés
# Augmentez la limite de taille si nécessaire
```

**API timeout**
```bash
# Vérifiez vos clés API
# Assurez-vous d'avoir des crédits suffisants
```

**Erreur de build**
```bash
# Nettoyez le cache
rm -rf .next
npm run build
```

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour plus d'informations.

## 📞 Support

- 📧 Email : support@chapter-ai.com
- 🐛 Issues : [GitHub Issues](https://github.com/ElrumbisDev/AI-generative/issues)
- 💬 Discord : [Communauté Chapter AI](https://discord.gg/chapterai)

---

**Créé avec ❤️ pour immortaliser vos plus beaux moments**
