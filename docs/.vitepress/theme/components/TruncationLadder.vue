<script setup lang="ts">
/**
 * The one thing implementers get wrong, shown rather than asserted.
 *
 * §01 is normative: a bare three-character string is a region, never a local
 * block. The failure mode if that is missed is silent — the code still decodes,
 * to somewhere else entirely, and §06 ships no checksum to catch it. So the
 * invalid rung is on the ladder deliberately: leaving it off would let a reader
 * infer the symmetric rule that does not exist.
 */
import PinCode from './PinCode.vue';

const RUNGS = [
  { code: 'PYY-ZT7-WMR', size: '≈5 m', note: 'the leaf cell, full precision', ok: true },
  { code: 'ZT7-WMR', size: '≈840 m', note: 'the area that leaf sits inside', ok: true },
  { code: 'WMR', size: '≈137 km', note: 'the region containing both', ok: true },
  { code: 'PYY', size: '—', note: 'not an address but a search input (§01)', ok: false },
] as const;
</script>

<template>
  <ul class="ladder">
    <li v-for="rung in RUNGS" :key="rung.code" :class="{ invalid: !rung.ok }">
      <PinCode :code="rung.code" compact />
      <span class="size">{{ rung.size }}</span>
      <span class="note">{{ rung.note }}</span>
    </li>
  </ul>
</template>

<style scoped>
.ladder {
  list-style: none;
  margin: 22px 0;
  padding: 0;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  overflow: hidden;
}

li {
  display: grid;
  grid-template-columns: 132px 74px 1fr;
  align-items: baseline;
  gap: 14px;
  padding: 13px 16px;
  background: var(--panel);
}

li + li {
  border-top: 1px solid var(--rule-soft);
}

.size {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
}

.note {
  font-size: 14px;
  color: var(--ink-soft);
}

/* Struck through, not merely greyed: greyed reads as "less important" and this
   rung is not less important, it is wrong. */
.invalid {
  background: var(--panel-sunk);
}

.invalid :deep(.pp-code) {
  text-decoration: line-through;
  text-decoration-color: var(--leaf);
  opacity: 0.75;
}

.invalid .note {
  color: var(--leaf);
}

@media (max-width: 640px) {
  li {
    grid-template-columns: 1fr auto;
  }
  .note {
    grid-column: 1 / -1;
    font-size: 13px;
  }
}
</style>
