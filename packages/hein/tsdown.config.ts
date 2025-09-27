import { defineConfig } from 'tsdown';

export default defineConfig([{
    entry: ['src/index.ts', 'src/expect.types.ts', 'src/assert.ts'],
    platform: 'node',
    format: ['esm', 'cjs'],
    sourcemap: true,
    dts: true,
    outputOptions: {
        preserveModules: true
    }
}]);
