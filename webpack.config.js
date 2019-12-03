const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssnano = require('cssnano')

const path = require('path')

const PATH_SOURCE = path.join(__dirname, './src')
const PATH_PUBLIC = path.join(__dirname, './public')

module.exports = {
  entry: PATH_SOURCE,
  output: { path: PATH_PUBLIC, },

  //mode: 'production',
  mode: 'development',

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                cssnano({
                  preset: ['default', {
                    discardComments: {
                      removeAll: true,
                    },
                    // how to find index of all available options?
                  }]
                })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: [".scss"],
  },
};
