//set module.exports to be object that hold all necessary config for webpack to properly access into bundle
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    //set the mode to be production
    //will create minified/uglified production bundle
    // mode: process.env.NODE_ENV, //does this need to be single quotes?
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './public/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname, 'build'),
          publicPath: '/'
        },
        proxy: {
            '/api': 'http://localhost:4000'
        }
      },
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
      },

};