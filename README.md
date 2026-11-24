# 然.SHIKARU — personal homepage (Vue 3 SPA)

Minimalist rebuild of the personal homepage: white/gray base, Vue green (#42b883)
and orange (#ff6700) as the two accents. Built with Vue 3 + Vite + Vue Router.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build locally
```

## Pages

- `/` — Self-introduction (the landing page): profile, research focus, tech stack,
  publications, projects, research labs and "Beyond Work". On desktop the timeline sits
  in a side column that stays in view while you scroll; on phones a floating
  "Timeline" button opens it as a bottom sheet.
- `/project/:slug` — The Mandarin speech report (opened from Projects).
- `/map` — World map. Hover (or tap) a country to highlight it; countries with photos
  are green and clickable. Drag to pan, wheel / pinch / `+ −` to zoom.
- `/map/:code` — One country's photos, random sizes, floating freely. Each photo has a
  small expand badge; tapping opens it with a title and a text introduction below.
- `/blog`, `/blog/:slug` — Text-only blog.

Photos live only on the map pages (plus the figures of the Mandarin speech report).
The nav has a light / dark switch and an EN / 中 / 日 language menu; both are remembered.

## Structure

```
src/
  i18n/             # index.js (t, tr, L, countryName) + messages.js (UI strings, en/zh/ja)
  theme.js          # light / dark state
  data/
    profile.js      # profile, timeline, tags, hobbies, publications, projects, labs
    travel.js       # travel photos per country  <-- add your trips here
    world.js        # generated country outlines (do not edit by hand)
    posts.js        # blog posts
    projectReports.js
  components/       # WorldMap, FloatingGallery, PhotoLightbox, BottomSheet, TopNav, ...
  views/            # Intro, Map, Country, ProjectDetail, Blog, BlogPost
public/static/img/  # put real photos here (e.g. public/static/img/travel/kyoto-1.jpg)
```

## Adding travel photos

Photos live in `public/static/img/travel/<country>/` (full size) and
`public/static/img/travel/<country>/thumb/` (small, used for the floating tiles).
Then describe them in `src/data/travel.js` — each country is keyed by its lowercase
ISO code (`jp`, `th`, `kh`, ...) and turns green on the map automatically:

```js
...g('fr', 'paris', 'paris', '2027.05', [['paris-1', 1.5], ['paris-2', 0.75]]),
```

with `P.paris` (title) and `S.paris` (your note) defined in the same file using
`L('English', '中文', '日本語')`. `ratio` is width / height. Sizes and positions of the
floating tiles are randomised (and stay the same for each country).
A video works too: add `video: '/static/img/travel/<cc>/video/x.mp4'` — the photo becomes its poster.
The map data is Natural Earth 110m, so very small countries (e.g. Singapore) are not on it.

## Languages

UI text lives in `src/i18n/messages.js`. For your own content, write
`L('English', '中文', '日本語')` anywhere a string is shown (bio, captions, posts...).
Publication titles and the Mandarin-speech report are intentionally left in English.

## Adding a blog post

Add an entry to the `posts` array in `src/data/posts.js`:

```js
{
  slug: 'my-post-slug',
  title: L('Post title', '标题', 'タイトル'),   // or a plain string
  date: '2026.07.19',
  category: 'travel',
  tags: ['Travel'],
  excerpt: 'One or two sentences shown in the list.',
  blocks: [
    { type: 'paragraph', text: '...' },
    { type: 'heading', text: '...' },
    { type: 'list', ordered: false, items: ['...', '...'] }
  ]
}
```

It appears at `/blog` and at `/blog/my-post-slug`. Posts are text-only.

## Deploying

`npm run build` outputs a static `dist/` folder — it can be hosted anywhere
static files are served (GitHub Pages, Netlify, Vercel, etc.). Because this is
an SPA with client-side routes (`/blog/...`, `/project/...`), the host needs to
fall back to `index.html` for unknown paths (GitHub Pages: add a `404.html`
that's a copy of `index.html`; Netlify/Vercel: this is usually automatic or a
one-line config).
