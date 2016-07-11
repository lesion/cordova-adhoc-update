module.exports = {
  entry: './appupdate.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    library: 'apploader',
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
