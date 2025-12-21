import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    // Otimizações de build para performance máxima
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    // Tree shaking agressivo
    treeshake: {
      moduleSideEffects: false,
    },
    // Otimizações de chunk
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separa vendors
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        },
        // Otimizar nomes de chunks para cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets pequenos (< 4KB)
    // Source maps apenas em dev
    sourcemap: false,
  },
  // Otimizações de dependências
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [],
  },
})

