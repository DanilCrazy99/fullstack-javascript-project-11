/* eslint-disable import/no-extraneous-dependencies */
import path, { resolve } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const moduleDirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: {
    style: './src/js/style.js',
    index: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(moduleDirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: path.resolve(moduleDirname, 'dist'),
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  module: {
    rules: [{
      test: /\.(scss)$/,
      use: [{
        // inject CSS to page
        loader: 'style-loader',
      }, {
        // translates CSS into CommonJS modules
        loader: 'css-loader',
      }, {
        // Run postcss actions
        loader: 'postcss-loader',
        options: {
          // `postcssOptions` is needed for postcss 8.x;
          // if you use postcss 7.x skip the key
          postcssOptions: {
            // postcss plugins, can be exported to postcss.config.js
            plugins() {
              return [
                autoprefixer,
              ];
            },
          },
        },
      }, {
        // compiles Sass to CSS
        loader: 'sass-loader',
      }],
    }],
  },
};
