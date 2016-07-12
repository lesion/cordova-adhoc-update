module.exports = {
  entry: './cordova-app-uploader.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    library: 'cordova-app-uploader',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
