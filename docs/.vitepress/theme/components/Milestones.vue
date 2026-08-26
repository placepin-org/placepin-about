<script setup lang="ts">
/**
 * The road to the freeze, as a track rather than a table.
 *
 * The ordering is the content here. 1.0 is not "the next release", it is the
 * point after which the meaning of a code can never change again, and that is
 * only legible if you can see what has to happen first. The three tier colours
 * carry it: leaf for where we are, area for the work in flight, region for the
 * far end.
 */
defineProps<{
  stages: {
    version: string;
    title: string;
    state: 'now' | 'next' | 'later';
    body: string;
  }[];
}>();

const STATE_LABEL = { now: 'here now', next: 'in flight', later: 'the freeze' } as const;
</script>

<template>
  <ol class="track">
    <li v-for="stage in stages" :key="stage.version" :class="stage.state">
      <div class="marker" aria-hidden="true"></div>
      <div class="body">
        <p class="head">
          <span class="version">{{ stage.version }}</span>
          <span class="state">{{ STATE_LABEL[stage.state] }}</span>
        </p>
        <h3>{{ stage.title }}</h3>
        <p class="detail">{{ stage.body }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.track {
  list-style: none;
  margin: 28px 0;
  padding: 0;
}

li {
  position: relative;
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 4px;
  padding-bottom: 26px;
}

/* The connecting rule, drawn behind the markers. Stops at the last stage:
   there is nothing after the freeze, which is the point of a freeze. */
li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 16px;
  bottom: 0;
  width: 1px;
  background: var(--rule);
}

.marker {
  width: 11px;
  height: 11px;
  margin-top: 5px;
  border-radius: 50%;
  border: 2px solid var(--bg);
  box-shadow: 0 0 0 1px currentColor;
  background: currentColor;
}

.now {
  color: var(--leaf);
}
.next {
  color: var(--area);
}
.later {
  color: var(--region);
}

/* Hollow, because it has not happened. */
.later .marker {
  background: var(--bg);
}

.head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 4px;
  font-family: var(--mono);
}

.version {
  font-size: 13px;
  color: currentColor;
  letter-spacing: 0.02em;
}

.state {
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--faint);
}

h3 {
  margin: 0 0 6px;
  padding: 0;
  border: none;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: var(--ink);
}

.detail {
  margin: 0;
  max-width: 62ch;
  font-size: 15px;
  line-height: 1.62;
  color: var(--ink-soft);
}
</style>
