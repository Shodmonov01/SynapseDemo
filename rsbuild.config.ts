import moduleFederationConfig from './module-federation.config';

import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  tools: {
    rspack: (config) => {
      config.watchOptions ??= {};
      const { ignored } = config.watchOptions;
      const mfPattern = '**/.mf/**';
      if (Array.isArray(ignored)) {
        config.watchOptions.ignored = [...ignored, mfPattern];
      } else if (ignored) {
        config.watchOptions.ignored = [ignored, mfPattern];
      } else {
        config.watchOptions.ignored = [mfPattern];
      }
      return config;
    },
  },
  resolve: {
    alias: {
      // '@synapse/theme': './src/theme.ts',
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
