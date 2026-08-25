<script setup lang="ts">
/**
 * The join-the-beta card.
 *
 * Copy discipline from §10: v5 is a draft, nothing emitted before v5-final is
 * durable, and the letter Y is still unresolved. So this says what the beta
 * actually is — help decide the open questions — rather than implying the
 * codes handed out during it will still mean the same places afterwards.
 */
import { APP, BETA_FORM } from '../links.js';
</script>

<template>
  <aside class="cta">
    <p class="tag">Beta</p>
    <h2>Help freeze the protocol</h2>
    <p class="body">
      The specification is a draft, and the questions still open are the human
      ones: whether <code>Y</code> survives transcription testing, whether the
      1/7, 2/Z, 5/S, 8/B and M/N pairs hold up when a code is spoken or
      handwritten, and whether writing the spot first is genuinely easier to
      use. Those get answered by people trying it, not by more argument in the
      document.
    </p>
    <p class="actions">
      <a class="primary" :href="BETA_FORM" target="_blank" rel="noopener noreferrer">
        Join the beta
      </a>
      <a class="secondary" :href="APP">Open the app</a>
    </p>
    <p class="fine">
      Codes are not durable yet. Anything saved during the beta may change
      meaning if the alphabet does (§10).
    </p>
  </aside>
</template>

<style scoped>
.cta {
  margin: 56px 0 8px;
  padding: 30px 30px 26px;
  background: var(--panel);
  border: 1px solid var(--rule);
  border-radius: var(--radius-lg);
}

.tag {
  display: inline-block;
  margin: 0 0 14px;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  font-family: var(--mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h2 {
  margin: 0 0 12px;
  padding: 0;
  border: none;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.012em;
  line-height: 1.25;
}

.body {
  margin: 0;
  max-width: 60ch;
  color: var(--ink-soft);
  line-height: 1.62;
}

.body code {
  font-family: var(--code-font);
  color: var(--code-local);
  font-size: 1.02em;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 22px 0 0;
}

.actions a {
  display: inline-flex;
  align-items: center;
  min-height: var(--tap);
  padding: 0 20px;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.primary {
  background: var(--accent);
  color: var(--panel);
  border: 1px solid transparent;
}

.dark .primary {
  color: #08131c;
}

.primary:hover {
  background: color-mix(in srgb, var(--accent) 84%, var(--ink));
}

.secondary {
  border: 1px solid var(--rule);
  color: var(--ink);
}

.secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}

.fine {
  margin: 20px 0 0;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.5;
  color: var(--faint);
}
</style>
