import moduleFederationConfig from './module-federation.config';

import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  resolve: {
    alias: {
      '@synapse/theme': './src/lib/theme',
      '@synapse/ui': './src/ui',
      app: './src/app',
      lib: './src/lib',
      ui: './src/ui',
      styles: './src/styles',
    },
  },
  server: {
    port: 3001,
  },
});
