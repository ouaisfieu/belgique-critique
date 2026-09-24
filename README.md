# Belgique critique

**Autopsie documentée d'un État en tension** — site statique de critique analytique et sourcée de la Belgique : institutions, particratie, finances publiques, État social, État de droit, régions, enseignement, démocratie, médias, climat, crises, confédéralisme et scénarios de l'automne 2026.

- En ligne (après activation de GitHub Pages) : <https://ouaisfieu.github.io/belgique-critique/>
- Données arrêtées au **24 septembre 2026**.

## Contenu

| Chemin | Contenu |
|---|---|
| `index.html` | Accueil : thèse, agenda de l'automne, chiffres, dossiers, FAQ |
| `dossiers/` | 13 dossiers (constat, thèse, contre-arguments, pistes, sources numérotées) |
| `chiffres/` | Tableau de bord sourcé |
| `chronologie/` | Chronologie 1830 → 2026 |
| `glossaire/` | 28 notions (balisage `DefinedTermSet`) |
| `sources/` | Bibliographie complète par dossier |
| `a-propos/` | Méthode, corrections apportées au corpus, limites, transparence |
| `recherche/` | Recherche plein texte côté client (`search-index.json`) |
| `assets/` | CSS, JS, favicons, images Open Graph par dossier |

## Technique

- **HTML/CSS/JS purs, aucun build, aucune dépendance** : il suffit de servir le dossier.
- **Mode sombre par défaut** (vert tendre & lilas), mode clair mémorisé ; `prefers-reduced-motion`, `forced-colors` et impression pris en charge.
- **Aucun cookie, aucun traceur, aucune police externe.**
- **SEO & web sémantique** : balises canoniques, `hreflang="fr-BE"`, Open Graph et Twitter Cards avec image par dossier, JSON-LD schema.org (`WebSite` + `SearchAction`, `Article`/`AnalysisNewsArticle` avec `citation`, `about`, `spatialCoverage`, `BreadcrumbList`, `FAQPage`, `DefinedTermSet`, `ItemList`, `CollectionPage`, `AboutPage`), `sitemap.xml`, `robots.txt`, flux Atom `feed.xml`, `manifest.webmanifest`, HTML sémantique (`header`, `nav`, `main`, `article`, `aside`, `figure`, `time`, `dl`…), fil d'Ariane, sommaire par dossier.
- **Accessibilité** : lien d'évitement, palette de graphiques validée (daltonisme, contraste) en sombre et en clair, graphiques SVG avec `title`/`desc`, infobulles au clavier et **tableau de données** sous chaque graphique.

## Mise en ligne sur GitHub Pages

1. Copier le contenu de ce dossier à la racine du dépôt `belgique-critique` (conserver le fichier caché `.nojekyll`).
2. *Settings → Pages → Build and deployment* : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le site sera servi à `https://ouaisfieu.github.io/belgique-critique/`.

Pour une autre adresse (domaine personnalisé), remplacer globalement `https://ouaisfieu.github.io/belgique-critique/` (balises `canonical`, `og:*`, JSON-LD, `sitemap.xml`, `robots.txt`, `feed.xml`, `404.html`).

## Contribuer, corriger

Signalez une erreur factuelle ou une source manquante via les *issues*. Les corrections substantielles sont datées dans la page Méthode.

## Licence

Textes et données : [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.fr). Merci de citer les sources primaires indiquées dans chaque dossier.
