<script setup lang="ts">
/**
 * The default layout, with the hero image slot filled by a real code.
 *
 * VitePress's `hero.image` takes a picture. A screenshot of a map would be the
 * obvious thing to put there and would be exactly wrong: §07 is explicit that
 * the code is the hero and the map is not the identity. So the slot gets the
 * code itself, drawn in the same three tier colours the app uses.
 */
import DefaultTheme from 'vitepress/theme-without-fonts';
import HeroCode from './components/HeroCode.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HeroCode />
    </template>
  </Layout>
</template>
