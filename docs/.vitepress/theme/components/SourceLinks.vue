<script setup lang="ts">
/**
 * The repositories, as a set rather than a sentence.
 *
 * Three artifacts and a fixtures file is more than a reader will retain from
 * prose, and the split between them is the point: the protocol, an
 * implementation of it, and the fixtures that decide whether the second one
 * got the first one right. §03 makes that third thing normative — conformance
 * is the vectors, not the prose — so it is listed as a peer, not a footnote,
 * and it links to the file in `placepin-spec` rather than to any copy this
 * site might serve.
 */
import { REPO_ABOUT, REPO_JS, REPO_SPEC } from '../links.js';

const REPOS = [
  {
    key: 'spec',
    name: 'placepin-spec',
    href: REPO_SPEC,
    what: 'The specification and the conformance fixtures. Normative: this is the one that decides what a code means.',
    meta: 'SPEC.md · vectors.json · CC BY 4.0 / Apache-2.0',
  },
  {
    key: 'js',
    name: 'placepin-js',
    href: REPO_JS,
    what: 'The reference implementation. Zero dependencies, no lookup table, every Appendix A vector exact.',
    meta: '@placepin/core-js · ~2.7 KB gzipped · Apache-2.0',
  },
  {
    key: 'about',
    name: 'placepin-about',
    href: REPO_ABOUT,
    what: 'This site. It renders the specification from placepin-spec; it does not own a word of it.',
    meta: 'about.placepin.org',
  },
] as const;
</script>

<template>
  <ul class="repos">
    <li v-for="repo in REPOS" :key="repo.key" :class="repo.key">
      <a :href="repo.href" target="_blank" rel="noopener noreferrer">
        <span class="rule" aria-hidden="true"></span>
        <span class="name">{{ repo.name }}</span>
        <span class="what">{{ repo.what }}</span>
        <span class="meta">{{ repo.meta }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.repos {
  list-style: none;
  margin: 24px 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

a {
  display: grid;
  gap: 5px;
  padding: 16px 18px;
  background: var(--panel);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease;
}

a:hover {
  border-color: var(--accent);
}

/* The same 14x3 mark the hero legend and the map lattice use, so a repository
   card reads as part of the same system. Terracotta for the normative one. */
.rule {
  width: 14px;
  height: 3px;
  border-radius: 2px;
  background: var(--region);
}

.spec .rule {
  background: var(--leaf);
}

.js .rule {
  background: var(--area);
}

.name {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--accent);
  letter-spacing: 0.01em;
}

.what {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--ink-soft);
  max-width: 62ch;
}

.meta {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.05em;
  color: var(--faint);
}
</style>
