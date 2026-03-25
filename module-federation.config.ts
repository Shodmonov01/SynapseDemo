import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'synapse',
  exposes: {
    './providers': './src/app/providers/ShellProviders.tsx',
    './theme': './src/shared/theme/index.ts',
    './ui': './src/shared/ui/index.ts',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
