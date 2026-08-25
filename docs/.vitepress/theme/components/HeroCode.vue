<script setup lang="ts">
/**
 * The hero object: one code, and what each of its three blocks claims.
 *
 * This is the README's ASCII diagram drawn properly — and it is the single
 * most important thing to get in front of someone in the first five seconds,
 * because the reading order is the one thing about v5 that surprises everyone.
 * The blocks run finest-to-coarsest, left to right, which is backwards from
 * every prefix-truncating system a reader has met before.
 */
import PinCode from './PinCode.vue';

const TIERS = [
  {
    key: 'local',
    block: 'PYY',
    label: 'local',
    size: '≈5 m',
    note: 'the spot — the part a person is actually told',
  },
  {
    key: 'area',
    block: 'ZT7',
    label: 'area',
    size: '≈840 m',
    note: 'the neighbourhood that spot sits in',
  },
  {
    key: 'region',
    block: 'WMR',
    label: 'region',
    size: '≈137 km',
    note: 'the only block that means anything on its own',
  },
] as const;
</script>

<template>
  <figure class="hero-code">
    <PinCode code="PYY-ZT7-WMR" />

    <dl class="tiers">
      <div v-for="tier in TIERS" :key="tier.key" class="tier" :class="tier.key">
        <dt>
          <span class="swatch" aria-hidden="true"></span>
          <span class="block">{{ tier.block }}</span>
          <span class="label">{{ tier.label }}</span>
          <span class="size">{{ tier.size }}</span>
        </dt>
        <dd>{{ tier.note }}</dd>
      </div>
    </dl>

    <figcaption>
      Finest to coarsest, left to right. Drop characters from the
      <em>left</em> and what is left is still a real address; drop them from the
      right and nothing is.
    </figcaption>
  </figure>
</template>

<style scoped>
.hero-code {
  margin: 0;
  text-align: left;
  /* The one place the code is scaled past the field's own ceiling — a landing
     hero sitting beside a 58px wordmark needs the presence. Uniform across all
     three blocks, same face, same letter-spacing: it is the field's code, set
     larger, not a different treatment. */
  --code-size: clamp(28px, 6.5vw, 38px);
  padding: 26px 26px 22px;
  background: var(--panel);
  border: 1px solid var(--rule);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  max-width: 460px;
}

.tiers {
  margin: 22px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tier {
  display: grid;
  gap: 2px;
}

dt {
  display: flex;
  align-items: baseline;
  gap: 9px;
  font-family: var(--mono);
}

/* Two-pixel-ish rules rather than dots: the same shape the lattice draws on
   the map, so the legend and the map are visibly the same system. */
.swatch {
  width: 14px;
  height: 3px;
  border-radius: 2px;
  align-self: center;
  flex: none;
}

.local .swatch {
  background: var(--leaf);
}
.area .swatch {
  background: var(--area);
}
.region .swatch {
  background: var(--region);
}

.block {
  font-family: var(--code-font);
  font-size: 15px;
  letter-spacing: 0.06em;
}

.local .block {
  color: var(--code-local);
}
.area .block {
  color: var(--code-area);
}
.region .block {
  color: var(--code-region);
}

.label {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.size {
  margin-left: auto;
  font-size: 11.5px;
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
}

dd {
  margin: 0 0 0 23px;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ink-soft);
}

figcaption {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--rule-soft);
  font-size: 13px;
  line-height: 1.5;
  color: var(--faint);
}

figcaption em {
  color: var(--leaf);
  font-style: normal;
}

@media (max-width: 960px) {
  .hero-code {
    max-width: none;
  }
}
</style>
