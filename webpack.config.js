module.exports = {
  entry: [
    './client/index.tsx'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      // Js, Jsx, Ts, Tsx files
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  }
}
