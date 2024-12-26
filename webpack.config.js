const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/, // Transpile JavaScript and JSX files using Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Load CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(webp|png|jpg|jpeg|gif)$/i, // Add this rule to handle image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Preserve file name and path
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Use 'static' instead of 'contentBase'
    compress: true,
    port: 3000, // Development server will run on port 3000
    open: true, // Open the browser automatically
  },
};
