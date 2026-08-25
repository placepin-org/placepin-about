/**
 * Every address this site points outside itself.
 *
 * Shared between `config.ts` and the components so the nav, the footer and the
 * cards cannot disagree. Two places still hold literals and cannot import
 * from here — markdown frontmatter, and `docs/public/_redirects` — so they are
 * named in CLAUDE.md rather than left to be discovered.
 *
 * `VECTORS` points into `placepin-spec` deliberately. §03 makes the fixtures
 * the definition of conformance, so an implementer must test against the file
 * every implementation consumes, not against a copy this site serves.
 */
export const ORG = 'https://github.com/placepin-org';
export const REPO_SPEC = `${ORG}/placepin-spec`;
export const REPO_JS = `${ORG}/placepin-js`;
export const REPO_ABOUT = `${ORG}/placepin-about`;
export const VECTORS = `${REPO_SPEC}/blob/main/vectors.json`;
export const SPEC_MD = `${REPO_SPEC}/blob/main/SPEC.md`;

/** Kept equal to placepin-web's `src/lib/app/AppShell.svelte`. */
export const BETA_FORM = 'https://forms.gle/RbxSy673MNBGybju5';
export const APP = 'https://placepin.org';
export const EMAIL = 'hello@placepin.org';
