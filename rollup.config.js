import { createSpaConfig } from '@open-wc/building-rollup';

import merge from 'deepmerge';
import copy from 'rollup-plugin-copy';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  input: './src/index.html',
  plugins: [
    copy({
      targets: [{ src: './src/favicon.ico', dest: 'dist' }],
    }),
  ],
});
