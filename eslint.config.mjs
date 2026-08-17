import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * eslint-config-next 16 ships native flat configs, so these are spread in
 * directly. Do not wrap them in FlatCompat: the compat layer cannot serialise
 * the plugin graph and fails with a circular structure error.
 */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'] },
  ...coreWebVitals,
  ...typescript,
  {
    /*
     * server.js is the production startup file for Passenger-based hosts, which
     * execute it directly. The package has no "type": "module", so it is
     * CommonJS by definition and require() is the correct form here, not a
     * lapse. Scoped to this one file rather than disabled globally.
     */
    files: ['server.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default eslintConfig;
