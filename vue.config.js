const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// 打包时去除打印信息
const UglifyPlugin = require('uglifyjs-webpack-plugin')
// let { version } = require('./package.json')
// version = version.replace(/\./g, '_')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: './',
  outputDir: process.env.outputDir,
  lintOnSave: false,
  productionSourceMap: false,
  // transpileDependencies:['js-base64'], // 使webpack处理mode_modules中的ES6的语法插件
  devServer: {
    host: '0.0.0.0',
    port: 18080,
    open: true
    // proxy: {
    //   // 这里的'/api'指向了127.0.0.1:3000
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     // secure: false,  // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       '^/api': '/' // 重写接口
    //     }
    //   }
    // }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_ass', resolve('src/assets'))
      .set('_img', resolve('src/assets/images'))
      .set('_api', resolve('src/api'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },

  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
      let optimization = {
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true, // console
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })
        ]
        // splitChunks拆分打包
        // runtimeChunk: 'single',
        // splitChunks: {
        //   chunks: 'all',
        //   maxInitialRequests: Infinity,
        //   minSize: 20000, // 依赖包超过20000bit将被单独打包
        //   cacheGroups: {
        //     vendor: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name (module) {
        //         // get the name. E.g. node_modules/packageName/not/this/part.js
        //         // or node_modules/packageName
        //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
        //         // npm package names are URL-safe, but some servers don't like @ symbols
        //         return `npm.${packageName.replace('@', '')}`
        //       }
        //     }
        //   }
        // }
      }
      Object.assign(config, {
        // output: {
        //   ...config.output,
        //   filename: `js/[name].[chunkhash].${version}.js`,
        //   chunkFilename: `js/[name].[chunkhash].${version}.js`
        // },
        optimization
      })
    } else {
      config.devtool = 'source-map'
    }
    // 优化，采用外部cdn
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'echarts': 'echarts',
      'moment': 'moment',
      'element-ui': 'ELEMENT'
      // 'vuedraggable': 'vuedraggable',
      // 'vant': 'vant'
    }
  },
  css: {
    extract: false // build-bundle的时候将css和js打包在一个文件中
  }
}

function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/css/font.less')]
    })
}
