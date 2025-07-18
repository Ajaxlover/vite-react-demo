import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { splitVendorChunkPlugin } from 'vite'
// 注意：使用此插件需要安装依赖：npm i vite-plugin-image-optimizer -D
// 以及 npm i sharp svgo -D
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    // ViteImageOptimizer({
    //   png: {
    //     quality: 80,
    //   },
    //   jpeg: {
    //     quality: 80,
    //   },
    //   jpg: {
    //     quality: 80,
    //   },
    //   webp: {
    //     lossless: false,
    //     quality: 80,
    //   },
    //   avif: {
    //     lossless: false,
    //     quality: 80,
    //   },
    //   cache: true,
    // })
  ],
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
    
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    
    // 代码分割策略
    rollupOptions: {
      output: {
        // 按照类型分块
        manualChunks: (id) => {
          // 基础库分包
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('redux') || id.includes('zustand')) {
              return 'state-vendor';
            }
            // 其他第三方库分包
            return 'vendor';
          }
          // 根据路由页面进行分包
          if (id.includes('/src/page/')) {
            const pageName = id.split('/src/page/')[1].split('/')[0];
            return `page-${pageName}`;
          }
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
    exclude: [], // 排除预构建的依赖
  },
  
  // 懒加载说明：
  // 在React组件中使用React.lazy和Suspense实现组件懒加载
  // 示例：
  // const LazyComponent = React.lazy(() => import('./LazyComponent'));
  // function App() {
  //   return (
  //     <React.Suspense fallback={<div>Loading...</div>}>
  //       <LazyComponent />
  //     </React.Suspense>
  //   );
  // }
  
  // 预加载选项
  experimental: {
    // 启用渐进式水合
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
      }
      return filename
    },
  },
  
  // 预加载选项
  preload: {
    // 预加载关键资源
    polyfill: true,
  },
  // esbuild 配置
  esbuild: {
    jsxInject: `import React from 'react'`, // 自动注入 React
    drop: mode === 'production' ? ['console', 'debugger'] : [], // 仅在生产环境去除 console 和 debugger
  },
}))
