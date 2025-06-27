import vue from "@vitejs/plugin-vue"

import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite"

import autoprefixer from "autoprefixer"

import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

import path from "path"

const pathSrc = path.resolve(__dirname, "src");
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: { alias: { "@": pathSrc, "types": path.resolve(__dirname, "types") } },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      },
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "@vueuse/core"],
        dirs: ["src/composable"],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
        },
        vueTemplate: true,
        dts: 'types/auto-imports.d.ts'
      })
    ],
    optimizeDeps: {
      include: ["vue", "@vueuse/core"]
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
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
          exports: 'named',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'index.css';
            }
            if (assetInfo.name?.endsWith('.d.ts')) {
              return 'types/[name][extname]';
            }
            return 'assets/[name][extname]';
          }
        },
      },
      emptyOutDir: true,
      outDir: 'dist',
      target: 'esnext',
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      manifest: false
    }
  }
})
