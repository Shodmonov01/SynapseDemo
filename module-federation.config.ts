import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'synapse',
  exposes: {
    './providers': './src/app/providers/ShellProviders.tsx',
    // './theme': './src/theme/index.ts',
    './ui': './src/ui/index.ts',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
});
