import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Set the base path to the repository name so built assets load correctly
  // when deployed to GitHub Pages at: https://<user>.github.io/RootCodeX/
  base: '/RootCodeX/',
  plugins: [react()],
  server: {
    // Ignore Visual Studio and other common editor/OS folders to avoid EBUSY file lock errors
    watch: {
      ignored: ['**/.vs/**', '**/.git/**', '**/node_modules/**']
    }
  }
})
