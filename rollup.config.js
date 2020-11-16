import { createDefaultConfig } from '@open-wc/building-rollup';

import merge from 'deepmerge';
import copy from 'rollup-plugin-copy';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const baseConfig = createDefaultConfig();

export default merge(baseConfig, {
  input: './src/index.html',
  plugins: [
    copy({
      targets: [{ src: './src/favicon.ico', dest: 'dist' }],
    }),
  ],
});
