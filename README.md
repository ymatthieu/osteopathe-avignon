# osteopatheavignon.com — Next.js 15 + Framer Motion + Aceternity UI

Site complet de remplacement pour le cabinet d'ostéopathie de Matthieu Yeghiazarian.

**Stack**
- **Next.js 15** (App Router, React 19, Server Components, Turbopack)
- **Tailwind CSS 3.4** (palette olive/cream sur-mesure)
- **Framer Motion 11** (toutes les animations, respect de `prefers-reduced-motion`)
- **Aceternity UI** (Aurora, Spotlight, 3D card, Hover border gradient, Text generate, Sparkles, Background beams) — composants inline
- **next-intl 3** (FR / EN bilingue avec routing `as-needed`)
- **Lucide React** (icônes)
- **Doctolib widget officiel** intégré + boutons CTA partout

**SEO + Référencement IA baked-in**
- JSON-LD `LocalBusiness` + `MedicalBusiness` + `Person` + `FAQPage` (générés depuis les traductions)
- Métadonnées Next.js avec OG / Twitter / hreflang complet (fr, fr-FR, en, en-GB, en-US, x-default)
- `app/sitemap.ts` (sitemap multilingue avec hreflang)
- `app/robots.ts` (allow-list explicite des crawlers IA : GPTBot, ClaudeBot, PerplexityBot, Gemini, Apple, Meta, Bing)
- `/llms.txt` (standard llmstxt.org)
- `/page.md` (version Markdown du contenu)
- Redirections 301 héritées de l'ancien site Wix : `/contact-5` → `/contact`, `/about-matthieu` → `/about`

---

## 🚀 Lancer en local

Prérequis : Node.js ≥ 20, npm ≥ 10 (ou pnpm / yarn).

```bash
cd osteo-next
npm install
npm run dev
```

Ouvre http://localhost:3000 — tu devrais voir l'accueil FR. Pour la version EN : http://localhost:3000/en

```bash
npm run build      # build de production
npm start          # servir le build
npm run type-check # vérifier les types TypeScript
```

---

## 🌍 Déployer sur Vercel (recommandé, gratuit)

1. Crée un dépôt GitHub vide, ex. `osteopathe-avignon`.
2. Pousse ce dossier dedans :
   ```bash
   cd osteo-next
   git init
   git add .
   git commit -m "Initial commit — Next.js + Framer Motion + Aceternity"
   git branch -M main
   git remote add origin git@github.com:TON_USER/osteopathe-avignon.git
   git push -u origin main
   ```
3. Va sur https://vercel.com → *Import Git Repository* → sélectionne le repo.
4. Garde tous les paramètres par défaut (Vercel détecte Next.js automatiquement).
5. *Deploy*. ~90 secondes plus tard, tu as une URL `https://osteopathe-avignon.vercel.app`.

### Brancher ton domaine (osteopatheavignon.com)

Deux options :

#### Option A — En parallèle (recommandé pour comparer sans risque)
- Achète/utilise un sous-domaine, ex. `nouveau.osteopatheavignon.com`.
- Dans Vercel → Settings → Domains, ajoute `nouveau.osteopatheavignon.com`.
- Vercel te donne un enregistrement `CNAME` à ajouter chez ton registrar.
- Tu peux comparer pendant des semaines, puis basculer le domaine principal quand tu es prêt.

#### Option B — Remplacement total du Wix
- Dans Wix : déconnecte le domaine de ton site Wix actuel (Wix → Paramètres → Domaines → Déconnecter).
- Dans Vercel → Settings → Domains : ajoute `osteopatheavignon.com` ET `www.osteopatheavignon.com`.
- Vercel te guidera pour configurer les `A` / `AAAA` / `CNAME` chez ton registrar de domaine.
- Propagation DNS : compte 1 à 24h.
- Une fois propagé, tu peux **annuler ton abonnement Wix Premium** (économie ≈ 10–25 €/mois).

---

## ✅ Checklist de personnalisation (à faire avant la mise en prod)

### Images à ajouter dans `public/images/`

| Fichier                         | Dimensions cibles | Où c'est utilisé                                  |
|---------------------------------|-------------------|----------------------------------------------------|
| `matthieu-portrait.jpg`         | 800×1000 (4:5)    | Section À propos                                   |
| `og.jpg`                        | 1200×630          | Open Graph (partage WhatsApp, FB, LinkedIn, iMessage) |
| `og-en.jpg`                     | 1200×630          | OG version anglaise (optionnel)                    |
| `cabinet-1.jpg` à `cabinet-3.jpg` | 1200×800        | Galerie cabinet (à ajouter en option)              |
| `favicon.ico`                   | 32×32             | Favicon navigateur (mets-le directement à la racine de `public/`) |
| `apple-touch-icon.png`          | 180×180           | iOS bookmark (racine de `public/`)                 |

> Une fois `matthieu-portrait.jpg` ajouté, modifie `components/sections/about.tsx` : remplace le placeholder par `<Image src="/images/matthieu-portrait.jpg" alt="Matthieu Yeghiazarian, Ostéopathe D.O." fill className="object-cover" priority />`.

### Données à vérifier dans `lib/utils.ts`

Toutes les infos du cabinet sont centralisées là — modifie une fois, propage partout :
- `SITE.email`
- `SITE.phone` (actuellement `null` — ajoute pour activer le `tel:` dans le footer)
- `SITE.address.*` (street, postalCode, city, latitude, longitude — ajuste les coords GPS pour la carte)
- `SITE.doctolib.url` (lien Doctolib)
- `SITE.experienceYears`, `SITE.pricing`, `SITE.sessionMinutes`

### Contenu rédactionnel

Toutes les chaînes de texte sont dans `messages/fr.json` et `messages/en.json`. Modifie-les sans toucher au code.

### Photo du cabinet pour la section À propos

Le composant `about.tsx` contient un placeholder visuel élégant. Pour le remplacer :
1. Ajoute la photo en `public/images/matthieu-portrait.jpg`.
2. Dans `components/sections/about.tsx`, remplace le `<div>` placeholder par :
   ```tsx
   import Image from "next/image";

   <Image
     src="/images/matthieu-portrait.jpg"
     alt="Matthieu Yeghiazarian, Ostéopathe D.O."
     fill
     priority
     className="object-cover"
     sizes="(max-width: 768px) 100vw, 50vw"
   />
   ```

---

## 🎨 Personnaliser la palette / le design

`tailwind.config.ts` → section `colors` :
- `olive.*` (palette principale, dérivée de #5a6b3a)
- `cream.*` (fonds chauds)
- `ink.*` (textes)

Polices : `app/layout.tsx` charge **Cormorant Garamond** (titres serif) et **Inter** (texte). Pour les changer, swap les imports `next/font/google`.

---

## 🤖 Référencement IA (llms.txt + page.md)

Ces deux fichiers sont **statiques** dans `public/` — servis tels quels à `https://osteopatheavignon.com/llms.txt` et `https://osteopatheavignon.com/page.md`.

Quand tu modifies `messages/fr.json`, pense à **synchroniser** `public/llms.txt` et `public/page.md` pour que les LLM aient toujours les infos à jour. Optionnel : génère-les automatiquement avec un script `scripts/build-llms.ts` (non inclus, simple à ajouter).

---

## 📊 Brancher Google Search Console + Bing Webmaster Tools

1. **Google Search Console** : https://search.google.com/search-console → ajoute `https://osteopatheavignon.com` → vérifie via balise meta (à coller dans `app/layout.tsx`) ou DNS TXT chez ton registrar.
2. **Soumets le sitemap** : `https://osteopatheavignon.com/sitemap.xml`.
3. **Bing Webmaster Tools** : https://www.bing.com/webmasters → "Import from Google Search Console" (un clic).

---

## 🐛 Dépannage

- **`npm install` échoue sur React 19** : le projet utilise React 19 + Next 15. Si tu as Node 18, mets à jour : `nvm install 20 && nvm use 20`.
- **Le widget Doctolib ne s'affiche pas en local** : c'est normal en `localhost` — Doctolib bloque parfois localhost. Teste en preview Vercel ou en prod.
- **Build error sur `framer-motion`** : assure-toi que `framer-motion@^11.18` est installé (compatible React 19).

---

## 📂 Architecture

```
osteo-next/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Layout par locale + JSON-LD LocalBusiness/Person
│   │   └── page.tsx         # Home (assemble toutes les sections + JSON-LD FAQPage)
│   ├── globals.css          # Tailwind + tokens
│   ├── layout.tsx           # Root layout + fonts
│   ├── robots.ts            # Génère /robots.txt avec allow-list IA
│   └── sitemap.ts           # Génère /sitemap.xml multilingue
├── components/
│   ├── aceternity/          # Aurora, Spotlight, 3D card, etc.
│   ├── marketing/           # Doctolib button/widget, sticky CTA, scroll progress, lang switch
│   ├── sections/            # Nav, Hero, Principles, Services, About, Pricing, FAQ, Contact, Footer
│   └── ui/                  # Reveal, Counter (utilities)
├── lib/
│   ├── i18n.ts              # Config next-intl
│   └── utils.ts             # cn() + SITE constants
├── messages/
│   ├── fr.json              # Traductions FR
│   └── en.json              # Traductions EN
├── public/
│   ├── llms.txt             # Standard llmstxt.org pour les crawlers IA
│   ├── page.md              # Version Markdown du contenu
│   └── images/              # ← TES PHOTOS ICI
├── middleware.ts            # Routing locale FR/EN
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚖️ À ne JAMAIS faire

- **Ne publie pas de faux témoignages.** Illégal en France pour un site de santé (DGCCRF, Code de la consommation L121-2, sanctions jusqu'à 300 000 €). La section Testimonials affiche des cartes neutres en attendant des vrais avis Google. Voir `components/sections/testimonials.tsx`.
- **Ne mets pas tes identifiants Wix / Doctolib / banque** dans le code ou dans Vercel env. Tout ce qui est privé reste hors du repo.

---

## Performance attendue

Sur ce stack avec un build prod sur Vercel :
- **Lighthouse Mobile** : 95–100 / 95+ accessibilité / 100 SEO
- **LCP** : < 1.8s sur 4G simulé
- **CLS** : ~0
- **JS shipped** : ~90 KB gzipped (Framer Motion + i18n + Aceternity inlined)

---

Bon lancement.
