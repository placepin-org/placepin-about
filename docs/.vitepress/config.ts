import { defineConfig } from 'vitepress';

import {
  APP,
  BETA_FORM,
  EMAIL,
  REPO_ABOUT,
  REPO_JS,
  REPO_SPEC,
  VECTORS,
} from './theme/links.js';

export default defineConfig({
  title: 'about.placepin.org',
  description:
    'placepin gives any point on Earth a nine-character address. What the protocol is, and the specification in full.',
  lang: 'en',
  cleanUrls: true,
  // The spec is one long normative document. A dead internal anchor in it is a
  // spec bug worth failing the build over, not a warning to scroll past.
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#f2f5f7', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#0d1620', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // Same two faces as placepin.org, from the same place, so a visitor
    // arriving from the app already has them cached. Share Tech Mono carries
    // the codes, IBM Plex Mono the labels; Share Tech Mono ships one weight.
    //
    // Deliberately the CDN here and not self-hosted — see CLAUDE.md. This is a
    // documentation site with no service worker; placepin.org is the offline
    // artifact, and it is the one that vendors its own faces.
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Share+Tech+Mono&display=swap',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'about.placepin.org' }],
  ],

  markdown: {
    /**
     * Give a placepin code the code face — and only a placepin code.
     *
     * Share Tech Mono means "this is an address". A CSS rule on `.vp-doc code`
     * cannot tell the difference between `PYY-ZT7-WMR` and `placepin-spec`, so
     * it painted repo names, `decode()` and `FACTOR` in the address face too,
     * which spends the signal on things that are not addresses.
     *
     * markdown-it can tell, because it sees the content. Anything matching the
     * canonical shape — 3, 6 or 9 characters from the alphabet, optionally
     * hyphenated — gets tagged and tier-coloured; everything else stays in IBM
     * Plex Mono. This runs over the synced specification too, which is the
     * point: those are the codes a reader most needs to recognise, and that
     * file cannot be edited to use a component.
     */
    config(md) {
      const BLOCK = '[0-9BCDFGHJKMNPQRSTVWXYZ]{3}';
      /**
       * Two blocks or three — never a bare one.
       *
       * A lone three-character string is the single most argued-over input in
       * the specification: normatively it decodes as a region (§01), but the
       * prose around it is usually discussing it *as a local block* to explain
       * why that is not an address. Painting it pale slate while the sentence
       * calls it a local block contradicts the sentence on screen. So bare
       * three-character strings stay in the plain face and take no side; the
       * authored pages use <PinCode> where the tier is actually meant.
       */
      const CODE = new RegExp(`^${BLOCK}(-${BLOCK}){1,2}$`);
      // Finest-first, so the last block is always the region and a short code
      // is the coarse tail. §01 — never the other way round.
      const TIERS = ['local', 'area', 'region'];

      const fallback = md.renderer.rules.code_inline;
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const content = tokens[idx].content.trim();
        if (!CODE.test(content)) {
          return fallback
            ? fallback(tokens, idx, options, env, self)
            : `<code>${md.utils.escapeHtml(content)}</code>`;
        }
        const blocks = content.split('-');
        const offset = 3 - blocks.length;
        const inner = blocks
          .map((b, i) => `<span class="${TIERS[i + offset]}">${b}</span>`)
          .join('<span class="sep">-</span>');
        return `<code class="pp-inline-code">${inner}</code>`;
      };
    },

    /**
     * SPEC.md is written with meaningful line breaks — the header block, and
     * every normative blockquote, put the label and the rule on separate
     * lines. Collapsing those into a run turns "**Core principle** The code
     * does not need to be a word" into one sentence that reads as neither.
     *
     * This is why docs/index.md's prose is written unwrapped: with `breaks`
     * on, a wrapped line there would become a <br>.
     */
    breaks: true,
  },

  themeConfig: {
    // No logo image — §07: the identity is the lowercase wordmark, no pin icon.
    // The site title is rendered by the theme's own nav-bar-title override so
    // the full stop can carry its terracotta.
    // v-html, so the full stop can carry the leaf terracotta the way the
    // placepin.org wordmark does.
    siteTitle: 'about.placepin<span class="pp-stop">.</span>org',

    // Seven items plus the sidebar offset overflowed the bar at 1280px — a
    // very ordinary laptop — pushing the theme toggle and the GitHub link off
    // the right edge where nothing could reach them. There is no "Overview"
    // entry because the wordmark is already the link home, which is the
    // convention everywhere else.
    nav: [
      { text: 'Why placepin', link: '/why', activeMatch: '^/why' },
      { text: 'Specification', link: '/spec/spec', activeMatch: '^/spec/' },
      { text: "What's next", link: '/next', activeMatch: '^/next' },
      {
        text: 'Source',
        items: [
          { text: 'placepin-spec · the protocol', link: REPO_SPEC },
          { text: 'placepin-js · @placepin/core-js', link: REPO_JS },
          { text: 'placepin-about · this site', link: REPO_ABOUT },
          { text: 'vectors.json · conformance fixtures', link: VECTORS },
        ],
      },
      { text: 'Join the beta', link: BETA_FORM },
      { text: 'Open the app', link: APP },
    ],

    sidebar: {
      '/spec/': [
        {
          text: 'Specification · v5 draft',
          items: [
            { text: 'Read the whole thing', link: '/spec/spec' },
            { text: '00 · Summary', link: '/spec/spec#_00-·-summary' },
            { text: '01 · Anatomy of a code', link: '/spec/spec#_01-·-anatomy-of-a-code' },
            { text: '02 · Alphabet', link: '/spec/spec#_02-·-alphabet' },
            { text: '03 · The grid', link: '/spec/spec#_03-·-the-grid' },
            { text: '04 · Encoding', link: '/spec/spec#_04-·-encoding' },
            { text: '05 · Precision', link: '/spec/spec#_05-·-precision' },
            { text: '06 · Errors & usability', link: '/spec/spec#_06-·-errors-usability' },
            { text: '07 · Share card', link: '/spec/spec#_07-·-share-card' },
            { text: '08 · Sharing & handoff', link: '/spec/spec#_08-·-sharing-handoff' },
            { text: '09 · Try it', link: '/spec/spec#_09-·-try-it' },
            {
              text: '10 · Versioning & open questions',
              link: '/spec/spec#_10-·-versioning-prior-art-open-questions',
            },
            {
              text: 'Appendix A · Vectors',
              link: '/spec/spec#appendix-a-·-canonical-conformance-vectors',
            },
          ],
        },
        {
          text: 'Source',
          items: [
            { text: 'vectors.json', link: VECTORS },
            { text: 'placepin-spec', link: REPO_SPEC },
            { text: 'placepin-js', link: REPO_JS },
          ],
        },
        {
          text: 'Elsewhere',
          items: [
            { text: 'Why placepin', link: '/why' },
            { text: "What's next", link: '/next' },
            { text: 'Join the beta', link: BETA_FORM },
          ],
        },
      ],
      '/next': [
        {
          text: 'The road to 1.0',
          items: [
            { text: 'Every version is a 0.x', link: '/next#every-version-is-a-0-x-on-purpose' },
            { text: 'What the beta tests', link: '/next#what-the-beta-is-actually-testing' },
            { text: 'Non-Latin codes', link: '/next#non-latin-codes' },
            { text: 'Other languages', link: '/next#implementations-in-other-languages' },
            { text: 'An open-source organisation', link: '/next#an-open-source-organisation' },
            { text: 'Contact', link: '/next#contact' },
          ],
        },
        {
          text: 'Elsewhere',
          items: [
            { text: 'Why placepin', link: '/why' },
            { text: 'The specification', link: '/spec/spec' },
            { text: 'Join the beta', link: BETA_FORM },
          ],
        },
      ],
      '/why': [
        {
          text: 'Why another protocol',
          items: [
            { text: 'The problem', link: '/why#the-problem-a-place-with-no-address' },
            { text: 'What already exists', link: '/why#what-already-exists' },
            { text: 'The claim', link: '/why#what-placepin-claims' },
            { text: 'The honest costs', link: '/why#the-honest-costs' },
            { text: 'Why it has to be open', link: '/why#why-it-has-to-be-open' },
          ],
        },
        {
          text: 'Elsewhere',
          items: [
            { text: 'The specification', link: '/spec/spec' },
            { text: "What's next", link: '/next' },
            { text: 'Join the beta', link: BETA_FORM },
          ],
        },
      ],
    },

    outline: { level: [2, 3], label: 'On this page' },

    socialLinks: [{ icon: 'github', link: 'https://github.com/placepin-org' }],

    // Authored pages only. The specification page turns this off in its own
    // frontmatter and carries a note pointing at placepin-spec instead —
    // editing the rendered copy would be editing a build artifact.
    editLink: {
      pattern: 'https://github.com/placepin-org/placepin-about/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: [
        'Specification text CC BY 4.0 · reference code Apache-2.0.',
        'v5 is a draft: no code emitted before v5-final is durable.',
        `<a href="${REPO_SPEC}">placepin-spec</a> ·`,
        `<a href="${REPO_JS}">placepin-js</a> ·`,
        `<a href="mailto:${EMAIL}">${EMAIL}</a>`,
      ].join(' '),
      copyright: 'placepin.org',
    },

    search: { provider: 'local' },

    darkModeSwitchLabel: 'Theme',
    returnToTopLabel: 'Back to top',
  },

  sitemap: { hostname: 'https://about.placepin.org' },
});
