module.exports = {
  entry: "./app/components/Main.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /^.*\/node_modules\/((?!react\-pivot).)*$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /^.*\/node_modules\/((?!react\-pivot).)*$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
