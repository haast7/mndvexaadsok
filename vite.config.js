import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    // Otimizações de build para melhor performance
    // Usa esbuild (padrão do Vite) que é mais rápido que terser
    minify: 'esbuild',
    // Code splitting otimizado
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets < 4KB
    chunkSizeWarningLimit: 1000,
    // Source maps desabilitados em produção para menor tamanho
    sourcemap: false,
  },
  // Otimizações de dependências
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})

