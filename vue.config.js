const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// 打包时去除打印信息
const UglifyPlugin = require('uglifyjs-webpack-plugin')

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
      }
      Object.assign(config, {
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
