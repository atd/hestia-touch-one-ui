const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        MQTT_SERVER: JSON.stringify(process.env.MQTT_SERVER || 'localhost'),
        ANAVI_MQTT_PREFIX: JSON.stringify(process.env.ANAVI_MQTT_PREFIX || '')
      })
    ]
  },
  css: {
    sourceMap: true
  },
  publicPath: './'
}
