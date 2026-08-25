# @placepin/about

[about.placepin.org](https://about.placepin.org) — what the protocol is, and the
specification in full.

```
placepin/
├── placepin-spec/    SPEC.md — the source of truth this site renders
├── placepin-js/      @placepin/core-js
├── placepin-web/     placepin.org — the app
└── placepin-about/   about.placepin.org — you are here
```

VitePress, built to static HTML, deployed to Cloudflare Pages. No backend, and
no runtime dependency on the other packages — but a **build-time** one: the
specification is copied in from the sibling `placepin-spec` checkout rather
than transcribed.

## Run

```sh
git clone https://github.com/placepin-org/placepin-spec   # sibling, required
cd placepin-about && npm install && npm run dev
```

`dev` and `build` both run `npm run sync` first. It copies
`../placepin-spec/SPEC.md` into `docs/spec/spec.md` and then runs two checks,
both of which fail the build rather than rotting quietly:

- **every deep link into the spec still lands on a heading that exists** — the
  spec is owned by another repo, and VitePress's own dead-link check validates
  the page but not the anchor;
- **no authored page has a hard-wrapped paragraph** — `markdown.breaks` is on
  for the spec's sake, which turns a wrapped line into a `<br>` mid-sentence.

Both walk `AUTHORED_PAGES` in that script. A new page joins them by being added
to that array once.

`vectors.json` is **not** copied in or served from here. It links to the file in
`placepin-spec` — an implementer testing against a copy this site happens to be
serving is testing against the wrong artifact.

`docs/spec/spec.md` is generated and gitignored. **Do not edit it** — the spec
lives in `placepin-spec`.

## Layout

| Path | Responsibility |
|---|---|
| `scripts/sync-spec.mjs` | Pulls SPEC.md and `vectors.json` in; validates every anchor |
| `docs/index.md` | The home page — what the protocol is and where the draft stands |
| `docs/why.md` | Why another protocol — the alternatives, the claim, the honest costs |
| `docs/next.md` | What's next — the road from 0.x to the freeze, non-Latin codes, governance |
| `docs/spec/spec.md` | **Generated.** The specification, rendered |
| `docs/.vitepress/config.ts` | Nav, sidebar, the inline-code rule |
| `docs/.vitepress/theme/links.ts` | Every URL the site points at outside itself |
| `docs/.vitepress/theme/tokens.css` | The Harbour palette, mirrored from `placepin-web` |
| `docs/.vitepress/theme/vitepress.css` | The bridge — `--vp-*` re-pointed at placepin tokens |
| `docs/.vitepress/theme/home.css` | The landing page |
| `docs/.vitepress/theme/components/` | `PinCode`, `HeroCode`, `TruncationLadder`, `Milestones`, `SourceLinks`, `BetaCta` |
| `docs/public/_headers`, `_redirects` | Cloudflare Pages |

## Deploy

Cloudflare Pages:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `docs/.vitepress/dist` |
| Node version | 20 or later |

The sibling `placepin-spec` checkout has to be present at build time. On a CI
runner that means either a monorepo checkout or a submodule — a build that
cannot find `SPEC.md` fails loudly rather than shipping a site with a missing
specification.

## Contact

**hello@placepin.org** — governance, implementations in other languages, script
mappings. Anything technical belongs in the repository it concerns.

## Licence

Specification text: **CC BY 4.0**. Site code: **Apache-2.0**.
