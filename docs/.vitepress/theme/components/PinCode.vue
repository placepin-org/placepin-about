<script setup lang="ts">
/**
 * A code, rendered the way the app renders it.
 *
 * The reference is `placepin-web/src/lib/panel/CodeField.svelte`, the one
 * editable field and the code display a visitor actually recognises, not the
 * older `CodeDisplay.svelte`. That distinction matters, because the
 * two disagree and the field is the one that won:
 *
 *   All three blocks are the same size. The hierarchy is carried by colour
 *   alone. A code with one enormous block in it reads as a broken text field
 *   rather than a headline.
 *
 * So: one size, one weight, three colours. Share Tech Mono ships a single
 * weight (400), which is why colour has to carry it: there is no bold to
 * reach for even if reaching were right.
 *
 * Metrics below are `.code-metrics` from CodeField, character for character.
 */
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** A code string. Hyphens optional; 3, 6 or 9 characters. */
    code: string;
    /** Rendered inline-sized, for use inside a sentence or a list. */
    compact?: boolean;
  }>(),
  { compact: false },
);

const blocks = computed(
  () => props.code.replace(/[\s-]/g, '').toUpperCase().match(/.{1,3}/g) ?? [],
);

/**
 * Blocks are written finest-first and the last is always the region, so a
 * short code is the coarse tail: two blocks are [area, region], one is
 * [region]. Never the other way round; §01 is normative about it.
 */
const TIERS = ['local', 'area', 'region'] as const;
const tierOf = (i: number) => TIERS[i + (3 - blocks.value.length)] ?? 'region';
</script>

<template>
  <span class="pp-code" :class="{ compact }">
    <template v-for="(block, i) in blocks" :key="i">
      <span v-if="i > 0" class="sep">-</span>
      <span class="blk" :class="tierOf(i)">{{ block }}</span>
    </template>
  </span>
</template>

<style scoped>
/* CodeField.svelte, `.code-metrics`. One declaration governed both its layers
   there so they could not drift; the same set governs every code here so this
   site and the app cannot drift either. */
.pp-code {
  display: inline-block;
  font-family: var(--code-font);
  font-size: var(--code-size);
  letter-spacing: 0.05em;
  line-height: 1.35;
  /* A code is nine characters and two hyphens, always. Never let it wrap. */
  white-space: pre;
}

.local {
  color: var(--code-local);
}
.area {
  color: var(--code-area);
}
.region {
  color: var(--code-region);
}

.sep {
  color: var(--code-sep);
}

.compact {
  --code-size: var(--code-size-compact);
}
</style>
