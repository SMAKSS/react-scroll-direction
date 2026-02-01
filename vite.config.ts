import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJson from './package.json' assert { type: 'json' };

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        ...Object.keys(packageJson.peerDependencies || {}),
        'react/jsx-runtime'
      ]
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist'
    })
  ]
});
