const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': resolve('src/components')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下： 所有的都能访问 通过ip或者通过localhost
    compress: true, // 启用gzip压缩一切服务
    port: 8080,
    hot: true, // 启动热更新模块 或者在命令行中带参数开启
    overlay: { // 在编译的时候出现任何错误 就会在网页上面显示黑色的背景和错误的信息
      warnings: false, // 警告信息一般不开启
      errors: true // 错误信息
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin({
      root: 'dist',
      verbose: true,
      dry: false
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.GenerateSW({
      cacheId: 'webpack-pwa', // 设置前缀
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      // swDest: 'service-worker.js', // 输出 Service worker 文件
      // globDirectory: './',
      globPatterns: ['dist/*.{js,png,html,css,json}', 'dist/static/*.{js,png,html,css,json}'], // 匹配的文件
      globIgnores: ['service-worker.js'], // 忽略的文件
      runtimeCaching: [
        // 跨域请求
        // {
        //   urlPattern: new RegExp('^https://localhost/'), // 匹配文件
        //   handler: 'staleWhileRevalidate', // 缓存优先
        //   options: {
        //     cacheableResponse: {
        //       statuses: [0, 200]
        //     }
        //   }
        // },
        // 配置路由请求缓存 (这些都是同源的)
        {
          urlPattern: /cacheFirst/, // 匹配文件
          handler: 'CacheFirst' // 缓存优先
        },
        {
          urlPattern: /networkOnly/, // 匹配文件
          handler: 'NetworkOnly' // 缓存优先
        }
      ]
   }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: resolve('dist/static'),
      ignore: ['.*']
    }])
  ]
};
