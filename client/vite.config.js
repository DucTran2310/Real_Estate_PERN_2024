import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@actions': '/src/actions',
      '@assets': '/src/assets',
      '@apis': '/src/apis',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@layout': '/src/layout',
      '@pages': '/src/pages',
      '@reducers': '/src/reducers',
      '@sagas': '/src/sagas',
      '@services': '/src/services',
      '@store': '/src/store',
      '@utils': '/src/utils'
    }
  }
})
