import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        exports: 'named',
        sourcemap: 'inline'
      }
    ],
    plugins: [resolve(), typescript()],
    external: [
      ...Object.keys(packageJson.devDependencies || {}),
      ...Object.keys(packageJson.peerDependencies || {})
    ]
  }
];
