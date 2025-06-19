import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

const __dirname = resolve()

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    dts({
      outDir: 'types',
      staticImport: true,
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      compilerOptions: {
        declaration: true,
        emitDeclarationOnly: true,
        noEmit: false
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FormKit',
      fileName: (format: string) => `formkit.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'lodash'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          lodash: '_'
        },
        exports: 'named'
      },
    },
    emptyOutDir: true,
    outDir: 'dist',
    target: 'esnext',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    manifest: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});