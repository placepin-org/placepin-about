/**
 * The placepin theme: VitePress's default, re-pointed at placepin's tokens.
 *
 * Deliberately an extension rather than a fork. The default theme already
 * solves the parts of a documentation site that are tedious and easy to get
 * wrong: the mobile sidebar, the outline, local search, anchor links, the
 * appearance toggle. None of those are where placepin's identity lives.
 * The identity is the palette, the two faces, and how a code is drawn, and all
 * three of those are reachable from CSS variables and a couple of components.
 */
import type { Theme } from 'vitepress';
// `theme-without-fonts` rather than `theme`: the default bundles and
// self-hosts Inter and a punctuation variable font, and this site uses
// neither. The two faces it does use, Share Tech Mono for codes and IBM Plex
// Mono for labels, come from the same Google Fonts link placepin.org uses,
// so a visitor arriving from the app already has them cached.
import DefaultTheme from 'vitepress/theme-without-fonts';

import './tokens.css';
import './vitepress.css';
import './home.css';

import PinCode from './components/PinCode.vue';
import HeroCode from './components/HeroCode.vue';
import TruncationLadder from './components/TruncationLadder.vue';
import Milestones from './components/Milestones.vue';
import SourceLinks from './components/SourceLinks.vue';
import BetaCta from './components/BetaCta.vue';
import Layout from './Layout.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Registered globally so the markdown pages can use them without imports;
    // the home page is prose first and a component gallery second.
    app.component('PinCode', PinCode);
    app.component('HeroCode', HeroCode);
    app.component('TruncationLadder', TruncationLadder);
    app.component('Milestones', Milestones);
    app.component('SourceLinks', SourceLinks);
    app.component('BetaCta', BetaCta);
  },
} satisfies Theme;
