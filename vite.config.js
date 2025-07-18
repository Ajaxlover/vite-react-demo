import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@pages': resolve(__dirname, 'src/page'),
      '@store': resolve(__dirname, 'src/store'),
    },
  },
  css: {
    // CSS 预处理器配置
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    // 开启 CSS 模块化
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    // 使用 esbuild 压缩，减小生产包体积
    minify: 'esbuild',
    // 其他构建选项
    
    // 代码分割策略
    rollupOptions: {
      output: {
        // 按照类型分块
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'state-vendor': ['react-redux', '@reduxjs/toolkit', 'zustand'],
        },
        // 静态资源分类打包
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // 启用 gzip 压缩
    // 需要安装 vite-plugin-compression: npm i vite-plugin-compression -D
    // 如需使用，请先安装依赖并取消下方注释
    // brotliSize: true,
    // 设置 chunk 大小警告阈值
    chunkSizeWarningLimit: 1500,
    // 禁用 CSS 代码分割
    cssCodeSplit: true,
    // 启用源码映射，方便调试
    sourcemap: false,
  },
  server: {
    // 开发服务器配置
    port: 3000,
    open: true,
    cors: true,
    // 代理配置
    proxy: {
      // 示例：如果需要代理 API 请求
      // '/api': {
      //   target: 'http://your-api-server.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    },
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux', 'zustand'],
  },
  // esbuild 配置
  esbuild: {
    jsxInject: `import React from 'react'`, // 自动注入 React
    drop: ['console', 'debugger'], // 生产环境去除 console 和 debugger
  },
})
