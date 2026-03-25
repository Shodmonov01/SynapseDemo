import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
    pluginModuleFederation(moduleFederationConfig),
  ],
  resolve: {
    alias: {
      '@synapse/theme': './src/shared/theme',
      '@synapse/ui': './src/shared/ui',
    },
  },
  server: {
    port: 3001,
  },
});
