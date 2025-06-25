import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/hydra.js',
    format: 'iife',
    name: 'Hydra', // Global biến: window.Hydra
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
};
